"use client";

import { motion } from "framer-motion";
import { RiGithubLine, RiExternalLinkLine, RiLockLine } from "react-icons/ri";
import SectionHeader from "@/components/SectionHeader";
import type { CVData } from "@/lib/cv-data";

const TAG_COLORS: Record<string, string> = {
  "Next.js 16": "text-white bg-zinc-800 border-zinc-700",
  TypeScript: "text-blue-300 bg-blue-950 border-blue-800",
  PostgreSQL: "text-sky-300 bg-sky-950 border-sky-800",
  Python: "text-yellow-300 bg-yellow-950 border-yellow-800",
  TensorFlow: "text-orange-300 bg-orange-950 border-orange-800",
  Keras: "text-red-300 bg-red-950 border-red-800",
  R: "text-indigo-300 bg-indigo-950 border-indigo-800",
};

function getTagClass(tag: string) {
  return TAG_COLORS[tag] ?? "text-quiet bg-card border-edge";
}

export default function Portfolio({ portfolio }: { portfolio: CVData["portfolio"] }) {
  return (
    <section id="portfolio" className="py-14 border-b border-edge">
      <SectionHeader label="Work" title="Portfolio" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portfolio.map((item, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative flex flex-col rounded-xl bg-card border border-edge hover:border-accent-ring transition-colors duration-200 overflow-hidden"
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "var(--accent)" }}
            />

            <div className="flex flex-col flex-1 p-5">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-sm font-semibold text-ink leading-snug">{item.name}</h3>
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  {item.privateRepo && (
                    <span
                      className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border text-quiet"
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
                    >
                      <RiLockLine className="text-[10px]" />
                      private
                    </span>
                  )}
                  {item.repo && (
                    <a
                      href={item.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-md text-quiet hover:text-accent transition-colors"
                      aria-label={`GitHub: ${item.name}`}
                    >
                      <RiGithubLine className="text-sm" />
                    </a>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-md text-quiet hover:text-accent transition-colors"
                      aria-label={`Live: ${item.name}`}
                    >
                      <RiExternalLinkLine className="text-sm" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-quiet leading-relaxed flex-1 mb-4">
                {item.description}
              </p>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {item.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getTagClass(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
