"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiBriefcaseLine,
  RiBookOpenLine,
  RiCodeSSlashLine,
  RiLayoutMasonryLine,
  RiArticleLine,
  RiAwardLine,
  RiInformationLine,
  RiMailLine,
  RiGithubLine,
  RiGlobalLine,
  RiMenuLine,
  RiCloseLine,
  RiDownload2Line,
} from "react-icons/ri";
import type { CVData } from "@/lib/cv-data";

const NAV_ITEMS = [
  { id: "experience",     label: "Experience",      Icon: RiBriefcaseLine      },
  { id: "education",      label: "Education",       Icon: RiBookOpenLine       },
  { id: "skills",         label: "Skills",          Icon: RiCodeSSlashLine     },
  { id: "portfolio",      label: "Portfolio",       Icon: RiLayoutMasonryLine  },
  { id: "certifications", label: "Certifications",  Icon: RiAwardLine          },
  { id: "publications",   label: "Publications",    Icon: RiArticleLine        },
  { id: "info",           label: "Additional Info", Icon: RiInformationLine    },
] as const;

export default function Sidebar({ cv }: { cv: CVData }) {
  const [active, setActive] = useState("experience");
  const [open, setOpen] = useState(false);

  const updateActive = useCallback(() => {
    const ids = NAV_ITEMS.map((i) => i.id) as string[];
    let found = ids[0];
    for (const id of [...ids].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 130) {
        found = id;
        break;
      }
    }
    setActive(found);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  const inner = (
    <>
      {/* ── Profile ──────────────────────────────────────────── */}
      <div className="flex flex-col items-center text-center px-6 pt-8 pb-6">
        <div className="relative mb-5">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-20"
            style={{ backgroundColor: "var(--accent)", transform: "scale(1.4)" }}
          />
          <Image
            src="/profile.jpg"
            alt={cv.name}
            width={108}
            height={108}
            className="relative rounded-full object-cover"
            style={{ border: "2px solid var(--accent-ring)" }}
            priority
          />
        </div>
        <h1 className="text-sm font-bold text-ink leading-tight">{cv.name}</h1>
        <p className="text-xs mt-1.5 font-medium text-accent">{cv.title}</p>
      </div>

      <div className="mx-6 h-px bg-edge" />

      {/* ── Contact ──────────────────────────────────────────── */}
      <div className="px-6 py-5 space-y-2.5">
        <a
          href={`mailto:${cv.email}`}
          className="flex items-center gap-2.5 text-xs text-quiet hover:text-accent transition-colors truncate"
        >
          <RiMailLine className="text-sm shrink-0" />
          {cv.email}
        </a>
        <a
          href={`https://github.com/${cv.github}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 text-xs text-quiet hover:text-accent transition-colors"
        >
          <RiGithubLine className="text-sm shrink-0" />
          github.com/{cv.github}
        </a>
        <a
          href={`https://${cv.website}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 text-xs text-quiet hover:text-accent transition-colors"
        >
          <RiGlobalLine className="text-sm shrink-0" />
          {cv.website}
        </a>
      </div>

      <div className="mx-6 h-px bg-edge" />

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="px-3 py-4 flex-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-xs font-medium transition-all duration-150 cursor-pointer text-left border ${
                isActive
                  ? "text-accent bg-accent-wash border-accent-ring"
                  : "text-quiet border-transparent hover:text-ink hover:bg-white/5"
              }`}
            >
              <Icon className="text-sm shrink-0" />
              {label}
              {isActive && (
                <motion.span
                  layoutId="navDot"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Download CV ──────────────────────────────────────── */}
      <div className="px-5 pb-8">
        <a
          href="/Curriculum_Vitae.pdf"
          download
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium text-accent border border-accent-ring hover:bg-accent-wash transition-colors"
        >
          <RiDownload2Line className="text-sm" />
          Download CV
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-72 bg-panel border-r border-edge overflow-y-auto z-30">
        {inner}
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-panel border-b border-edge flex items-center justify-between px-5 z-40">
        <span className="font-bold text-sm text-ink">{cv.name}</span>
        <button
          onClick={() => setOpen(true)}
          className="p-1.5 text-quiet hover:text-ink transition-colors"
          aria-label="Open navigation"
        >
          <RiMenuLine className="text-xl" />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="lg:hidden fixed top-0 left-0 h-screen w-72 bg-panel border-r border-edge overflow-y-auto z-50 flex flex-col"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-quiet hover:text-ink"
                aria-label="Close navigation"
              >
                <RiCloseLine className="text-xl" />
              </button>
              {inner}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
