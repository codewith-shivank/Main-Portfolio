import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';

export interface UserProfileData {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  company?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedProjectData {
  id: string;
  userId: string;
  projectTitle: string;
  projectCategory?: string;
  recruiterNotes?: string;
  savedAt: string;
}

export interface RecruiterInquiryData {
  id: string;
  userId: string;
  senderName: string;
  senderEmail: string;
  company?: string;
  position: string;
  message: string;
  status: 'submitted' | 'in_review' | 'interview_scheduled' | 'closed';
  autoReplySent?: boolean;
  autoReplyAt?: string;
  createdAt: string;
}

export interface SkillEndorsementData {
  id: string;
  userId: string;
  endorserName: string;
  skillName: string;
  relationship?: string;
  note?: string;
  createdAt: string;
}

export interface SavedChatData {
  id: string;
  userId: string;
  query: string;
  answer: string;
  createdAt: string;
}

// ----------------- USER PROFILE -----------------

export async function upsertUserProfile(profile: Partial<UserProfileData> & { userId: string; email: string; displayName: string }) {
  const path = `users/${profile.userId}`;
  const now = new Date().toISOString();
  try {
    const docRef = doc(db, 'users', profile.userId);
    const existingSnap = await getDoc(docRef);

    const payload: UserProfileData = {
      userId: profile.userId,
      email: profile.email.substring(0, 150),
      displayName: (profile.displayName || 'Visitor').substring(0, 100),
      photoURL: profile.photoURL ? profile.photoURL.substring(0, 500) : '',
      company: profile.company ? profile.company.substring(0, 100) : '',
      role: profile.role ? profile.role.substring(0, 100) : '',
      createdAt: existingSnap.exists() ? existingSnap.data()?.createdAt : now,
      updatedAt: now,
    };

    await setDoc(docRef, payload, { merge: true });
    return payload;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function getUserProfile(userId: string): Promise<UserProfileData | null> {
  const path = `users/${userId}`;
  try {
    const snap = await getDoc(doc(db, 'users', userId));
    return snap.exists() ? (snap.data() as UserProfileData) : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

export function subscribeUserProfile(userId: string, onUpdate: (profile: UserProfileData | null) => void) {
  const path = `users/${userId}`;
  return onSnapshot(
    doc(db, 'users', userId),
    (snap) => {
      onUpdate(snap.exists() ? (snap.data() as UserProfileData) : null);
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    }
  );
}

// ----------------- SAVED PROJECTS -----------------

export async function saveProjectForUser(userId: string, project: { id: string; projectTitle: string; projectCategory?: string; recruiterNotes?: string }) {
  const safeId = project.id.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 64);
  const path = `users/${userId}/savedProjects/${safeId}`;
  try {
    const payload: SavedProjectData = {
      id: safeId,
      userId,
      projectTitle: project.projectTitle.substring(0, 150),
      projectCategory: project.projectCategory ? project.projectCategory.substring(0, 50) : '',
      recruiterNotes: project.recruiterNotes ? project.recruiterNotes.substring(0, 500) : '',
      savedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId, 'savedProjects', safeId), payload);
    return payload;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function removeSavedProject(userId: string, projectId: string) {
  const safeId = projectId.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 64);
  const path = `users/${userId}/savedProjects/${safeId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'savedProjects', safeId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export function subscribeSavedProjects(userId: string, onUpdate: (projects: SavedProjectData[]) => void) {
  const path = `users/${userId}/savedProjects`;
  const q = collection(db, 'users', userId, 'savedProjects');
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => d.data() as SavedProjectData);
      onUpdate(list);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

// ----------------- RECRUITER INQUIRIES -----------------

export async function submitRecruiterInquiry(inquiry: {
  userId: string;
  senderName: string;
  senderEmail: string;
  company?: string;
  position: string;
  message: string;
  autoReplySent?: boolean;
  autoReplyAt?: string;
}) {
  const id = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `inquiries/${id}`;
  try {
    const payload: RecruiterInquiryData = {
      id,
      userId: inquiry.userId,
      senderName: inquiry.senderName.substring(0, 100),
      senderEmail: inquiry.senderEmail.substring(0, 150),
      company: inquiry.company ? inquiry.company.substring(0, 100) : '',
      position: inquiry.position.substring(0, 100),
      message: inquiry.message.substring(0, 2000),
      status: 'submitted',
      ...(inquiry.autoReplySent ? { autoReplySent: true, autoReplyAt: inquiry.autoReplyAt || new Date().toISOString() } : {}),
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'inquiries', id), payload);
    return payload;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export function subscribeUserInquiries(userId: string, onUpdate: (inquiries: RecruiterInquiryData[]) => void) {
  const path = `inquiries`;
  const q = query(collection(db, 'inquiries'), where('userId', '==', userId));
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => d.data() as RecruiterInquiryData);
      onUpdate(list);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

export function subscribeAllInquiries(onUpdate: (inquiries: RecruiterInquiryData[]) => void) {
  const path = `inquiries`;
  const q = collection(db, 'inquiries');
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => d.data() as RecruiterInquiryData);
      onUpdate(list);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

export async function updateInquiryStatus(inquiryId: string, status: RecruiterInquiryData['status']) {
  const path = `inquiries/${inquiryId}`;
  try {
    await updateDoc(doc(db, 'inquiries', inquiryId), { status });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

// ----------------- SKILL ENDORSEMENTS -----------------

export async function submitSkillEndorsement(endorsement: {
  userId: string;
  endorserName: string;
  skillName: string;
  relationship?: string;
  note?: string;
}) {
  const id = `end_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `endorsements/${id}`;
  try {
    const payload: SkillEndorsementData = {
      id,
      userId: endorsement.userId,
      endorserName: endorsement.endorserName.substring(0, 100),
      skillName: endorsement.skillName.substring(0, 60),
      relationship: endorsement.relationship ? endorsement.relationship.substring(0, 60) : 'Visitor',
      note: endorsement.note ? endorsement.note.substring(0, 500) : '',
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'endorsements', id), payload);
    return payload;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export function subscribeEndorsements(onUpdate: (endorsements: SkillEndorsementData[]) => void) {
  const path = `endorsements`;
  return onSnapshot(
    collection(db, 'endorsements'),
    (snap) => {
      const list = snap.docs.map((d) => d.data() as SkillEndorsementData);
      onUpdate(list);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

export async function deleteSkillEndorsement(endorsementId: string) {
  const path = `endorsements/${endorsementId}`;
  try {
    await deleteDoc(doc(db, 'endorsements', endorsementId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// ----------------- SAVED RAG CHATS -----------------

export async function saveRagChat(userId: string, queryText: string, answerText: string) {
  const id = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `users/${userId}/savedChats/${id}`;
  try {
    const payload: SavedChatData = {
      id,
      userId,
      query: queryText.substring(0, 500),
      answer: answerText.substring(0, 3000),
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId, 'savedChats', id), payload);
    return payload;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export function subscribeSavedChats(userId: string, onUpdate: (chats: SavedChatData[]) => void) {
  const path = `users/${userId}/savedChats`;
  return onSnapshot(
    collection(db, 'users', userId, 'savedChats'),
    (snap) => {
      const list = snap.docs.map((d) => d.data() as SavedChatData);
      onUpdate(list);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

export async function removeSavedChat(userId: string, chatId: string) {
  const path = `users/${userId}/savedChats/${chatId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'savedChats', chatId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}
