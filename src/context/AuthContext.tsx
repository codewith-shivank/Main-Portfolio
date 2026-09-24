import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import {
  UserProfileData,
  SavedProjectData,
  RecruiterInquiryData,
  SkillEndorsementData,
  SavedChatData,
  upsertUserProfile,
  subscribeUserProfile,
  subscribeSavedProjects,
  saveProjectForUser,
  removeSavedProject,
  subscribeUserInquiries,
  subscribeAllInquiries,
  subscribeEndorsements,
  subscribeSavedChats,
  saveRagChat,
  removeSavedChat
} from '../firebase/firestoreService';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfileData | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  savedProjects: SavedProjectData[];
  isProjectSaved: (projectId: string) => boolean;
  toggleSaveProject: (project: { id: string; title: string; category?: string; notes?: string }) => Promise<void>;
  userInquiries: RecruiterInquiryData[];
  allInquiries: RecruiterInquiryData[];
  endorsements: SkillEndorsementData[];
  savedChats: SavedChatData[];
  bookmarkChat: (query: string, answer: string) => Promise<void>;
  deleteBookmarkedChat: (chatId: string) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ADMIN_EMAIL = 'codewithshivank@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedProjects, setSavedProjects] = useState<SavedProjectData[]>([]);
  const [userInquiries, setUserInquiries] = useState<RecruiterInquiryData[]>([]);
  const [allInquiries, setAllInquiries] = useState<RecruiterInquiryData[]>([]);
  const [endorsements, setEndorsements] = useState<SkillEndorsementData[]>([]);
  const [savedChats, setSavedChats] = useState<SavedChatData[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);

  const isAdmin = Boolean(user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          await upsertUserProfile({
            userId: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Visitor',
            photoURL: currentUser.photoURL || '',
          });
        } catch (err) {
          console.error('Failed to sync user profile:', err);
        }
      } else {
        setUserProfile(null);
        setSavedProjects([]);
        setUserInquiries([]);
        setSavedChats([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to User Profile & Personal Data when authenticated
  useEffect(() => {
    if (!user) return;

    const unsubProfile = subscribeUserProfile(user.uid, (p) => setUserProfile(p));
    const unsubSaved = subscribeSavedProjects(user.uid, (p) => setSavedProjects(p));
    const unsubInquiries = subscribeUserInquiries(user.uid, (i) => setUserInquiries(i));
    const unsubChats = subscribeSavedChats(user.uid, (c) => setSavedChats(c));

    return () => {
      unsubProfile();
      unsubSaved();
      unsubInquiries();
      unsubChats();
    };
  }, [user]);

  // Listen to Admin inquiries if user is admin
  useEffect(() => {
    if (!isAdmin || !user) {
      setAllInquiries([]);
      return;
    }

    const unsubAll = subscribeAllInquiries((list) => setAllInquiries(list));
    return () => unsubAll();
  }, [isAdmin, user]);

  // Listen to Public Community Endorsements (all visitors can see)
  useEffect(() => {
    const unsub = subscribeEndorsements((list) => setEndorsements(list));
    return () => unsub();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setAuthError(err.message || 'Failed to sign in with Google');
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.error('Sign-Out Error:', err);
    }
  };

  const isProjectSaved = (projectId: string) => {
    const safeId = projectId.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 64);
    return savedProjects.some((p) => p.id === safeId);
  };

  const toggleSaveProject = async (project: { id: string; title: string; category?: string; notes?: string }) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    const safeId = project.id.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 64);
    if (isProjectSaved(project.id)) {
      await removeSavedProject(user.uid, safeId);
    } else {
      await saveProjectForUser(user.uid, {
        id: safeId,
        projectTitle: project.title,
        projectCategory: project.category,
        recruiterNotes: project.notes,
      });
    }
  };

  const bookmarkChat = async (queryText: string, answerText: string) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    await saveRagChat(user.uid, queryText, answerText);
  };

  const deleteBookmarkedChat = async (chatId: string) => {
    if (!user) return;
    await removeSavedChat(user.uid, chatId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAdmin,
        signInWithGoogle,
        signOut,
        savedProjects,
        isProjectSaved,
        toggleSaveProject,
        userInquiries,
        allInquiries,
        endorsements,
        savedChats,
        bookmarkChat,
        deleteBookmarkedChat,
        authError,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
