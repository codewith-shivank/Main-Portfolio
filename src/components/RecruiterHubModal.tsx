/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Send,
  Award,
  CheckCircle2,
  Clock,
  Briefcase,
  Trash2,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Building,
  UserCheck,
  Sparkles,
  LogIn,
  LogOut
} from 'lucide-react';
import { useAuth, ADMIN_EMAIL } from '../context/AuthContext';
import {
  submitRecruiterInquiry,
  submitSkillEndorsement,
  updateInquiryStatus,
  deleteSkillEndorsement,
  RecruiterInquiryData
} from '../firebase/firestoreService';
import { sendInquiry } from '../services/emailService';

interface RecruiterHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'saved' | 'inquiry' | 'endorse' | 'admin' | 'chats';
}

export const RecruiterHubModal: React.FC<RecruiterHubModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'saved',
}) => {
  const {
    user,
    userProfile,
    isAdmin,
    signInWithGoogle,
    signOut,
    savedProjects,
    toggleSaveProject,
    userInquiries,
    allInquiries,
    endorsements,
    savedChats,
    deleteBookmarkedChat,
    authError,
    clearAuthError,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'saved' | 'inquiry' | 'endorse' | 'admin' | 'chats'>(defaultTab);

  // Inquiry form states
  const [inqCompany, setInqCompany] = useState('');
  const [inqPosition, setInqPosition] = useState('FullStack MERN Developer');
  const [inqMessage, setInqMessage] = useState('');
  const [inqSubmitting, setInqSubmitting] = useState(false);
  const [inqSuccess, setInqSuccess] = useState(false);
  const [inqTicketId, setInqTicketId] = useState<string | null>(null);

  // Endorsement form states
  const [endSkill, setEndSkill] = useState('React.js / Next.js');
  const [endRelation, setEndRelation] = useState('Recruiter / Hiring Manager');
  const [endNote, setEndNote] = useState('');
  const [endSubmitting, setEndSubmitting] = useState(false);
  const [endSuccess, setEndSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setInqSubmitting(true);
    setInqSuccess(false);
    setInqTicketId(null);
    try {
      // 1. Dispatch through email service (EmailJS + automated SLA responder)
      const emailResult = await sendInquiry({
        name: user.displayName || 'Recruiter',
        email: user.email || '',
        subject: `Interview Proposal from ${inqCompany.trim() || 'Recruiter'} for ${inqPosition.trim()}`,
        message: inqMessage.trim(),
        company: inqCompany.trim(),
        position: inqPosition.trim(),
        type: 'recruiter_proposal'
      });

      // 2. Persist in Firestore
      await submitRecruiterInquiry({
        userId: user.uid,
        senderName: user.displayName || 'Recruiter',
        senderEmail: user.email || '',
        company: inqCompany.trim(),
        position: inqPosition.trim(),
        message: inqMessage.trim(),
        autoReplySent: true,
        autoReplyAt: new Date().toISOString()
      });

      setInqTicketId(emailResult.ticketId);
      setInqSuccess(true);
      setInqCompany('');
      setInqMessage('');
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    } finally {
      setInqSubmitting(false);
    }
  };

  const handleEndorsementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setEndSubmitting(true);
    setEndSuccess(false);
    try {
      await submitSkillEndorsement({
        userId: user.uid,
        endorserName: user.displayName || 'Verified Visitor',
        skillName: endSkill,
        relationship: endRelation,
        note: endNote.trim(),
      });
      setEndSuccess(true);
      setEndNote('');
    } catch (err) {
      console.error('Failed to submit endorsement:', err);
    } finally {
      setEndSubmitting(false);
    }
  };

  const handleStatusChange = async (inquiryId: string, status: RecruiterInquiryData['status']) => {
    try {
      await updateInquiryStatus(inquiryId, status);
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="recruiter-hub-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="recruiter-hub-title" className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                Recruiter & Visitor Hub
                {isAdmin && (
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    Admin
                  </span>
                )}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Persistent evaluation shortlisted projects, direct proposals, and endorsements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-7 h-7 rounded-full border border-neutral-300 dark:border-neutral-700"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-cyan-600 text-white font-semibold text-xs flex items-center justify-center">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <button
                  onClick={() => signOut()}
                  className="px-2 py-1 text-xs text-neutral-500 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 flex items-center gap-1.5 transition-all shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Google Sign In</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900/50 px-4 py-2 flex items-center justify-between text-xs text-red-600 dark:text-red-400">
            <span>{authError}</span>
            <button onClick={clearAuthError} className="underline text-red-700 dark:text-red-300">Dismiss</button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-4 gap-1 overflow-x-auto bg-neutral-50/20 dark:bg-neutral-950/20">
          <button
            onClick={() => setActiveTab('saved')}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'saved'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Shortlisted Projects ({savedProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiry')}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'inquiry'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Direct Recruiter Inquiry ({userInquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('endorse')}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'endorse'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Endorsements ({endorsements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'chats'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Saved Q&A ({savedChats.length})</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`py-2.5 px-3 text-xs font-medium border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                activeTab === 'admin'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-amber-600'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Proposals ({allInquiries.length})</span>
            </button>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Unauthenticated Prompt */}
          {!user && (
            <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Sign in with Google to sync your recruiter shortlist
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Data persists in Firestore across your devices and sessions.
                </p>
              </div>
              <button
                onClick={() => signInWithGoogle()}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Google</span>
              </button>
            </div>
          )}

          {/* TAB 1: SAVED PROJECTS */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Candidate Project Shortlist
                </h3>
                <span className="text-xs text-neutral-500">
                  {savedProjects.length} {savedProjects.length === 1 ? 'project' : 'projects'} saved
                </span>
              </div>

              {savedProjects.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                  <Bookmark className="w-8 h-8 mx-auto text-neutral-400" />
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    No shortlisted projects yet
                  </p>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Click the bookmark icon on any project card in the portfolio to save it here for team evaluation or interview prep.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5">
                  {savedProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex items-start justify-between gap-3 group hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                            {p.projectTitle}
                          </h4>
                          {p.projectCategory && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">
                              {p.projectCategory}
                            </span>
                          )}
                        </div>
                        {p.recruiterNotes && (
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 italic">
                            "{p.recruiterNotes}"
                          </p>
                        )}
                        <p className="text-[10px] text-neutral-400 font-mono">
                          Saved: {new Date(p.savedAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href="#projects"
                          onClick={onClose}
                          className="p-1.5 text-neutral-500 hover:text-cyan-600 dark:hover:text-cyan-400 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                          title="View on page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => toggleSaveProject({ id: p.id, title: p.projectTitle })}
                          className="p-1.5 text-neutral-400 hover:text-red-500 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DIRECT RECRUITER INQUIRY */}
          {activeTab === 'inquiry' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Submit Direct Interview Proposal or Technical Inquiry
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Sends a verified inquiry directly to Shivank's dashboard. Status updates are tracked in real-time.
                </p>
              </div>

              {inqSuccess && (
                <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      Proposal Submitted &amp; Auto-Reply Dispatched
                    </span>
                    {inqTicketId && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 font-bold">
                        #{inqTicketId}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 pl-5">
                    Your proposal has been registered into Shivank's priority review queue. An automated confirmation receipt was logged with guaranteed 24 business hour turnaround.
                  </p>
                </div>
              )}

              {user ? (
                <form onSubmit={handleInquirySubmit} className="space-y-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Company / Organization
                      </label>
                      <div className="relative">
                        <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={inqCompany}
                          onChange={(e) => setInqCompany(e.target.value)}
                          placeholder="e.g. Acme Technologies"
                          maxLength={100}
                          className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Target Role / Position
                      </label>
                      <div className="relative">
                        <Briefcase className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                        <input
                          type="text"
                          required
                          value={inqPosition}
                          onChange={(e) => setInqPosition(e.target.value)}
                          placeholder="e.g. Full Stack Developer"
                          maxLength={100}
                          className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Opportunity Details & Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={inqMessage}
                      onChange={(e) => setInqMessage(e.target.value)}
                      placeholder="Share details regarding the role, tech stack, location/remote preference, or interview timeline..."
                      maxLength={2000}
                      className="w-full p-3 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-neutral-400">
                      Posting as: <strong className="text-neutral-700 dark:text-neutral-300">{user.email}</strong>
                    </span>
                    <button
                      type="submit"
                      disabled={inqSubmitting}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{inqSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Past User Inquiries */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Your Submitted Inquiries ({userInquiries.length})
                </h4>

                {userInquiries.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic">
                    No submitted proposals found for this account.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {userInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-900 dark:text-white">
                              {inq.position}
                            </span>
                            {inq.company && (
                              <span className="text-xs text-neutral-500">at {inq.company}</span>
                            )}
                          </div>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-medium ${
                              inq.status === 'interview_scheduled'
                                ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                                : inq.status === 'in_review'
                                ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            {inq.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {inq.message}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(inq.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SKILL ENDORSEMENTS */}
          {activeTab === 'endorse' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Skill Endorsements & Peer Testimonials
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Endorse Shivank's verified full-stack skills or leave a brief recommendation.
                </p>
              </div>

              {endSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>Endorsement published to community board!</span>
                </div>
              )}

              {user ? (
                <form onSubmit={handleEndorsementSubmit} className="space-y-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Skill to Endorse
                      </label>
                      <select
                        value={endSkill}
                        onChange={(e) => setEndSkill(e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="React.js / Next.js">React.js / Next.js</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Node.js & Express">Node.js & Express</option>
                        <option value="PostgreSQL & MongoDB">PostgreSQL & MongoDB</option>
                        <option value="Spring Boot / Java">Spring Boot / Java</option>
                        <option value="RAG Knowledge Systems">RAG Knowledge Systems</option>
                        <option value="Technical Support & SLA">Technical Support & SLA</option>
                        <option value="REST APIs & Microservices">REST APIs & Microservices</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Your Relationship
                      </label>
                      <select
                        value={endRelation}
                        onChange={(e) => setEndRelation(e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="Recruiter / Hiring Manager">Recruiter / Hiring Manager</option>
                        <option value="Colleague / Engineer">Colleague / Engineer</option>
                        <option value="Tech Lead / Mentor">Tech Lead / Mentor</option>
                        <option value="Open Source Contributor">Open Source Contributor</option>
                        <option value="Visitor / Evaluator">Visitor / Evaluator</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Brief Note or Testimonial (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={endNote}
                      onChange={(e) => setEndNote(e.target.value)}
                      placeholder="e.g., Clean architecture and responsive full-stack implementation."
                      maxLength={500}
                      className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={endSubmitting}
                      className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{endSubmitting ? 'Endorsing...' : 'Publish Endorsement'}</span>
                    </button>
                  </div>
                </form>
              ) : null}

              {/* Endorsements List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                  Community Endorsements ({endorsements.length})
                </h4>

                {endorsements.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic">
                    No endorsements submitted yet. Be the first to endorse a skill!
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {endorsements.map((end) => (
                      <div
                        key={end.id}
                        className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                            {end.skillName}
                          </span>
                          {end.relationship && (
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {end.relationship}
                            </span>
                          )}
                        </div>
                        {end.note && (
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 italic">
                            "{end.note}"
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
                            — {end.endorserName}
                          </span>
                          {(user?.uid === end.userId || isAdmin) && (
                            <button
                              onClick={() => deleteSkillEndorsement(end.id)}
                              className="text-neutral-400 hover:text-red-500 p-1"
                              title="Delete endorsement"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED RAG Q&As */}
          {activeTab === 'chats' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Saved Knowledge Assistant Q&A Pairs
                </h3>
                <span className="text-xs text-neutral-500">
                  {savedChats.length} saved
                </span>
              </div>

              {savedChats.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                  <MessageSquare className="w-8 h-8 mx-auto text-neutral-400" />
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    No bookmarked questions yet
                  </p>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    When you query "Ask Shivank AI", click the bookmark icon on any answer to keep it saved in your Firestore profile.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedChats.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                          Q: {c.query}
                        </p>
                        <button
                          onClick={() => deleteBookmarkedChat(c.id)}
                          className="text-neutral-400 hover:text-red-500 p-1 shrink-0"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
                        {c.answer}
                      </p>
                      <p className="text-[10px] text-neutral-400 font-mono">
                        Saved: {new Date(c.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ADMIN PROPOSALS REVIEW */}
          {activeTab === 'admin' && isAdmin && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    Incoming Recruiter Proposals (Admin Stream)
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Real-time Firestore stream for {ADMIN_EMAIL}
                  </p>
                </div>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  {allInquiries.length} total
                </span>
              </div>

              {allInquiries.length === 0 ? (
                <p className="text-xs text-neutral-400 italic">No proposals received yet.</p>
              ) : (
                <div className="space-y-3">
                  {allInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                            {inq.position}
                          </h4>
                          <p className="text-xs text-neutral-500">
                            {inq.company ? inq.company + ' • ' : ''}
                            <a
                              href={`mailto:${inq.senderEmail}`}
                              className="text-cyan-600 dark:text-cyan-400 hover:underline"
                            >
                              {inq.senderName} ({inq.senderEmail})
                            </a>
                          </p>
                        </div>

                        {/* Status Selector */}
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleStatusChange(inq.id, e.target.value as RecruiterInquiryData['status'])
                          }
                          className="text-xs font-medium p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        >
                          <option value="submitted">Submitted</option>
                          <option value="in_review">In Review</option>
                          <option value="interview_scheduled">Interview Scheduled</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                        {inq.message}
                      </div>

                      <div className="text-[10px] text-neutral-400 font-mono">
                        Submitted: {new Date(inq.createdAt).toLocaleString()} • ID: {inq.id}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between text-xs text-neutral-500">
          <span>Powered by Firebase Auth & Cloud Firestore</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
