/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { apiUrl } from "../services/apiClient";
import {
  Database,
  X,
  Upload,
  Check,
  RefreshCw,
  ShieldAlert,
  Lock,
  Key,
  Layers,
  FileText,
  Search,
} from "lucide-react";

interface DocumentSummary {
  document: string;
  source: string;
  sections: string[];
  chunkCount: number;
}

export const AdminKnowledgeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // Ingestion form state
  const [docTitle, setDocTitle] = useState("");
  const [docSource, setDocSource] = useState("Admin Ingestion");
  const [docSection, setDocSection] = useState("");
  const [docContentType, setDocContentType] = useState<
    | "profile"
    | "experience"
    | "skills"
    | "projects"
    | "education"
    | "certifications"
  >("projects");
  const [docText, setDocText] = useState("");
  const [docTags, setDocTags] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [indexedDocuments, setIndexedDocuments] = useState<DocumentSummary[]>(
    [],
  );
  const [totalChunks, setTotalChunks] = useState(14);

  useEffect(() => {
    if (isOpen) {
      fetchDocuments();
    }
  }, [isOpen]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(apiUrl("/api/documents"));
      if (res.ok) {
        const data = await res.json();
        setIndexedDocuments(data.documents || []);
        setTotalChunks(data.totalChunks || 14);
      }
    } catch (e) {
      console.warn("Failed to fetch documents", e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAuthError(null);
      } else {
        setAuthError(data.error || "Invalid administrator password.");
      }
    } catch (err) {
      setAuthError("Connection error verifying password.");
    }
  };

  const handleIngestDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle || !docText || !docSection) {
      alert("Please fill out Title, Section, and Content.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch(apiUrl("/api/documents/ingest"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: docTitle,
          source: docSource,
          section: docSection,
          contentType: docContentType,
          text: docText,
          tags: docTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage(data.message);
        setDocTitle("");
        setDocSection("");
        setDocText("");
        setDocTags("");
        fetchDocuments();
      } else {
        setStatusMessage(data.error || "Failed to ingest document.");
      }
    } catch (err) {
      setStatusMessage("Network error during ingestion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-neutral-950/75 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                RAG Document Ingestion & Knowledge Management
              </h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                {totalChunks} Active Searchable Chunks in Vector Store
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Check */}
        {!isAuthenticated ? (
          <div className="p-8 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-1">
              Admin Access Protected
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              Enter administrator password to ingest documents, inspect vector
              chunks, or update RAG knowledge embeddings.
            </p>

            <form onSubmit={handleLogin} className="space-y-3">
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password (default: shivank2026)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {authError && (
                <div className="text-[11px] text-red-500 text-left font-mono">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 font-semibold text-xs transition-colors"
              >
                Authenticate Session
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Ingestion View */
          <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
            {statusMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Ingestion Form */}
            <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono mb-3">
                Ingest New Document / Resume Chunk
              </h4>

              <form onSubmit={handleIngestDocument} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Document Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      placeholder="e.g. updated-resume-2026.pdf"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Section Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={docSection}
                      onChange={(e) => setDocSection(e.target.value)}
                      placeholder="e.g. Cloud Architecture Skills"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Content Category
                    </label>
                    <select
                      value={docContentType}
                      onChange={(e) => setDocContentType(e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                    >
                      <option value="projects">Projects</option>
                      <option value="experience">Experience</option>
                      <option value="skills">Skills</option>
                      <option value="profile">Profile</option>
                      <option value="certifications">Certifications</option>
                      <option value="education">Education</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Keywords / Search Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={docTags}
                      onChange={(e) => setDocTags(e.target.value)}
                      placeholder="spring boot, microservices, java, aws"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Text Content (Markdown, Raw Text, or Notes) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={docText}
                    onChange={(e) => setDocText(e.target.value)}
                    placeholder="Paste verified factual text to be cleaned, chunked, and indexed..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-neutral-400">
                    Chunking pipeline automatically splits at sentence
                    boundaries
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 rounded-lg bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-700 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>
                      {isSubmitting ? "Ingesting..." : "Ingest & Index Chunk"}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Currently Indexed Documents */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider font-mono">
                  Currently Indexed Documents in Knowledge Base
                </h4>
                <button
                  onClick={fetchDocuments}
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh Index</span>
                </button>
              </div>

              <div className="space-y-2">
                {indexedDocuments.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-cyan-500 shrink-0" />
                      <div>
                        <span className="font-bold text-neutral-900 dark:text-white">
                          {doc.document}
                        </span>
                        <div className="text-[11px] text-neutral-500 font-mono">
                          Source: {doc.source} · Sections:{" "}
                          {doc.sections.slice(0, 3).join(", ")}
                          {doc.sections.length > 3
                            ? ` (+${doc.sections.length - 3})`
                            : ""}
                        </div>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      {doc.chunkCount} Chunks
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
