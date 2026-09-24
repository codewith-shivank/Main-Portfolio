/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ShieldCheck, 
  Trash2,
  ExternalLink,
  MessageSquare,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Source {
  document: string;
  section: string;
  source: string;
  textSnippet: string;
  relevanceScore: number;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  grounded?: boolean;
}

const RECRUITER_QUICK_QUESTIONS = [
  "What backend technologies does Shivank know?",
  "Tell me about his Swiggy support experience",
  "Which projects demonstrate full-stack skills?",
  "What are his verified certifications?",
  "How can I contact Shivank?"
];

export const AskShivankAiDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: "Hello! I am **Ask Shivank AI**, a strictly grounded knowledge assistant for Shivank Maurya's portfolio. I answer questions directly using facts from his verified resume, employment records at Niftel (supporting Swiggy), and technical case studies.",
      grounded: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<{ [msgId: string]: boolean }>({});
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [savedChatMsgId, setSavedChatMsgId] = useState<string | null>(null);
  const { bookmarkChat } = useAuth();

  const handleSaveChat = async (msg: Message) => {
    const msgIndex = messages.findIndex(m => m.id === msg.id);
    const lastUserMsg = msgIndex > 0 ? messages.slice(0, msgIndex).reverse().find(m => m.role === 'user') : null;
    const queryText = lastUserMsg ? lastUserMsg.content : 'Portfolio Inquiry';
    try {
      await bookmarkChat(queryText, msg.content);
      setSavedChatMsgId(msg.id);
      setTimeout(() => setSavedChatMsgId(null), 2500);
    } catch (err) {
      console.error('Failed to bookmark chat:', err);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newHistory.slice(-5).map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.answer || "I don't have verified information about that in Shivank's portfolio knowledge base.",
        sources: data.sources || [],
        grounded: data.grounded ?? true
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: "Something went wrong while connecting to the RAG knowledge system. Please ensure the server is running or try again.",
          grounded: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSource = (msgId: string) => {
    setExpandedSources(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const copyAnswer = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `msg-cleared-${Date.now()}`,
        role: 'assistant',
        content: "Conversation history cleared. How can I help you evaluate Shivank's background today?",
        grounded: true
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Docked Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-900 text-white dark:bg-cyan-500 dark:text-neutral-950 font-medium text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all border border-neutral-700/60 dark:border-cyan-400 no-print group"
          aria-label="Open Ask Shivank AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-cyan-400 dark:text-neutral-950 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="font-semibold tracking-tight">Ask Shivank AI</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 dark:bg-cyan-600/30 text-cyan-300 dark:text-neutral-900">
            RAG
          </span>
        </button>
      )}

      {/* Slide-over / Modal Drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-4 no-print"
          role="dialog"
          aria-modal="true"
          aria-label="Ask Shivank AI RAG Assistant"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-full sm:max-w-md h-[88vh] sm:h-[650px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom sm:slide-in-from-right duration-200 overflow-hidden">
            
            {/* Header */}
            <div className="px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                      Ask Shivank AI
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.2 text-[10px] font-mono rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Grounded
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Retrieval-Augmented Personal Knowledge System
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-md transition-colors"
                  title="Clear conversation history"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors"
                  aria-label="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              
              {/* Recruiter Quick Prompts */}
              {messages.length <= 2 && (
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2">
                  <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-500" />
                    Recruiter Quick Inquiries:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {RECRUITER_QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSendMessage(q)}
                        className="text-[11px] text-left px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message List */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] p-3 rounded-xl leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-neutral-900 text-white dark:bg-cyan-500 dark:text-neutral-950 rounded-br-none font-medium'
                        : 'bg-neutral-100 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 rounded-bl-none border border-neutral-200/60 dark:border-neutral-700/60'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Assistant Footer with Sources & Copy */}
                  {msg.role === 'assistant' && msg.id !== 'msg-welcome' && (
                    <div className="mt-1.5 flex flex-col gap-1 w-full max-w-[88%]">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        {msg.sources && msg.sources.length > 0 ? (
                          <button
                            onClick={() => toggleSource(msg.id)}
                            className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-mono"
                          >
                            <FileText className="w-2.5 h-2.5" />
                            <span>{msg.sources.length} Verified Sources</span>
                            {expandedSources[msg.id] ? (
                              <ChevronUp className="w-2.5 h-2.5" />
                            ) : (
                              <ChevronDown className="w-2.5 h-2.5" />
                            )}
                          </button>
                        ) : (
                          <span className="font-mono text-neutral-400">Direct knowledge match</span>
                        )}

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveChat(msg)}
                            className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                            title="Save answer to your profile (Firestore)"
                          >
                            <Bookmark className={`w-2.5 h-2.5 ${savedChatMsgId === msg.id ? 'fill-cyan-500 text-cyan-500' : ''}`} />
                            <span className={savedChatMsgId === msg.id ? 'text-cyan-500' : ''}>
                              {savedChatMsgId === msg.id ? 'Saved!' : 'Save'}
                            </span>
                          </button>

                          <button
                            onClick={() => copyAnswer(msg.id, msg.content)}
                            className="flex items-center gap-1 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                            title="Copy answer"
                          >
                            {copiedMsgId === msg.id ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-emerald-500" />
                                <span className="text-emerald-500">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Source Drawer */}
                      {expandedSources[msg.id] && msg.sources && (
                        <div className="p-2 mt-1 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-[11px]">
                          {msg.sources.map((src, idx) => (
                            <div key={idx} className="border-b border-neutral-100 dark:border-neutral-800/80 last:border-0 pb-1 last:pb-0">
                              <div className="font-mono font-semibold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                                <span>{src.document} → {src.section}</span>
                                <span className="text-neutral-400 font-normal">Relevance: {src.relevanceScore}</span>
                              </div>
                              <p className="text-neutral-500 dark:text-neutral-400 text-[10px] line-clamp-2 mt-0.5">
                                "{src.textSnippet}"
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 max-w-[70%]">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.15s]" />
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.3s]" />
                  <span className="text-[11px] text-neutral-400 font-mono ml-1">Searching knowledge base...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Shivank's stack, projects, or background..."
                disabled={isLoading}
                maxLength={400}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-xl bg-neutral-900 dark:bg-cyan-500 hover:bg-neutral-800 dark:hover:bg-cyan-400 text-white dark:text-neutral-950 disabled:opacity-40 transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Footer privacy guarantee */}
            <div className="px-4 py-1.5 bg-neutral-100 dark:bg-neutral-950/80 border-t border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500 dark:text-neutral-400 text-center font-mono">
              Strictly grounded on verified resume records · Anti-hallucination guardrails active
            </div>

          </div>
        </div>
      )}
    </>
  );
};
