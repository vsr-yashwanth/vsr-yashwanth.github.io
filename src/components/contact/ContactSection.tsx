"use client";

import React, { useState } from "react";
import { socialConfig } from "@/data/social";
import { useSystem } from "@/context/SystemContext";
import {
  Mail,
  Phone,
  Download,
  Copy,
  Check,
  Send,
  Radio,
  Terminal,
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/Icons";

export default function ContactSection() {
  const { playSound, setCursorText, setCoreMode } = useSystem();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Transmission Message Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transmissionReceipt, setTransmissionReceipt] = useState<string | null>(null);

  const handleCopyEmail = () => {
    playSound("click");
    navigator.clipboard.writeText(socialConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    playSound("click");
    navigator.clipboard.writeText(socialConfig.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmitTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    playSound("boot");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const receiptId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransmissionReceipt(
        `TRANSMISSION DISPATCHED [ACK // ${receiptId}]. A direct mailto dispatch has been generated.`
      );
      // Construct mailto link
      window.location.href = `mailto:${socialConfig.email}?subject=Transmission from ${encodeURIComponent(
        formName
      )}&body=${encodeURIComponent(
        `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`
      )}`;
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    }, 700);
  };

  return (
    <section
      id="contact"
      className="py-24 relative bg-[#06080e] border-t border-white/10"
      aria-label="Contact and Transmission End Section"
      onMouseEnter={() => setCoreMode("contact")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 font-semibold tracking-widest uppercase mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>08 // TRANSMISSION END</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              END OF <span className="text-orange-400">TRANSMISSION</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-mono max-w-xl">
              &ldquo;If you&apos;ve made it this far, we should probably talk.&rdquo; Open for systems engineering, AI/ML
              research, and collaborative ventures.
            </p>
          </div>

          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
            SECURE DIRECT CHANNELS // NO TRACKERS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Intentional Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0c1018] p-6 sm:p-7 space-y-6">
              <span className="text-xs font-mono text-zinc-400 font-semibold uppercase tracking-wider block border-b border-white/10 pb-3">
                DIRECT CONTACT CHANNELS
              </span>

              {/* Email Box */}
              <div className="space-y-1.5 font-mono text-xs">
                <span className="text-zinc-500 uppercase text-[10px]">ELECTRONIC MAIL:</span>
                <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-black/40">
                  <span className="text-white font-medium text-xs sm:text-sm truncate select-all">
                    {socialConfig.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Intentional Phone Display (Specified solely in Contact section) */}
              <div className="space-y-1.5 font-mono text-xs">
                <span className="text-zinc-500 uppercase text-[10px]">TELEPHONE / SECURE LINE:</span>
                <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-black/40">
                  <span className="text-white font-medium text-xs sm:text-sm select-all">
                    {socialConfig.phone}
                  </span>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
                    title="Copy Telephone Number"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Social Channels Matrix */}
              <div className="space-y-2 pt-2 border-t border-white/5 font-mono text-xs">
                <span className="text-zinc-500 uppercase text-[10px] block">EXTERNAL IDENTITIES:</span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={socialConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 hover:border-white/25 bg-black/30 hover:bg-white/[0.04] text-zinc-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-white" />
                    <span>GITHUB</span>
                  </a>

                  <a
                    href={socialConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 hover:border-white/25 bg-black/30 hover:bg-white/[0.04] text-zinc-300 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LINKEDIN</span>
                  </a>

                  <a
                    href={socialConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 hover:border-white/25 bg-black/30 hover:bg-white/[0.04] text-zinc-300 hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>INSTAGRAM</span>
                  </a>

                  <a
                    href={socialConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 hover:border-emerald-500/40 bg-emerald-500/[0.04] text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>RESUME.PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Dispatch Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#0c1018] p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-semibold">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  <span>TRANSMISSION DISPATCH // DIRECT TO QUILL</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">ENCRYPTION: TLS 1.3</span>
              </div>

              {transmissionReceipt && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{transmissionReceipt}</span>
                </div>
              )}

              <form onSubmit={handleSubmitTransmission} className="space-y-4 font-mono text-xs">
                <div>
                  <label htmlFor="formName" className="block text-zinc-400 mb-1.5">IDENTIFIER / YOUR NAME:</label>
                  <input
                    id="formName"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe / Engineer"
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
                  />
                </div>

                <div>
                  <label htmlFor="formEmail" className="block text-zinc-400 mb-1.5">RETURN ADDRESS / YOUR EMAIL:</label>
                  <input
                    id="formEmail"
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60"
                  />
                </div>

                <div>
                  <label htmlFor="formMessage" className="block text-zinc-400 mb-1.5">TRANSMISSION CONTENT / MESSAGE:</label>
                  <textarea
                    id="formMessage"
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Discuss research, systems engineering, or prospective opportunities..."
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-black/50 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 leading-relaxed resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500">DISPATCHES DIRECTLY VIA ENCRYPTED PIPELINE</span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setCursorText("SEND")}
                    onMouseLeave={() => setCursorText("")}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,140,55,0.3)] disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "DISPATCHING..." : "SEND TRANSMISSION"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
