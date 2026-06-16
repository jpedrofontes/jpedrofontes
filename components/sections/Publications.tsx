"use client";

import { motion } from "framer-motion";
import { RiExternalLinkLine } from "react-icons/ri";
import SectionHeader from "@/components/SectionHeader";
import LogoBadge from "@/components/LogoBadge";
import type { CVData } from "@/lib/cv-data";

export default function Publications({ publications }: { publications: CVData["publications"] }) {
  return (
    <section id="publications" className="py-14 border-b border-edge">
      <SectionHeader label="Research" title="Publications" />

      <div className="space-y-3">
        {publications.map((pub, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-xl p-5 bg-card border border-edge hover:border-accent-ring transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <LogoBadge src={pub.publisherLogo} alt={pub.publisher} size="sm" />
                  <span className="text-xs font-bold px-2 py-0.5 rounded text-accent bg-accent-wash">
                    {pub.year}
                  </span>
                  {pub.status && (
                    <span className="text-xs px-2 py-0.5 rounded text-quiet bg-edge">
                      {pub.status}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-ink leading-snug mb-1.5">
                  {pub.title}
                </h3>
                <p className="text-xs text-quiet leading-relaxed">{pub.venue}</p>
              </div>

              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 p-1.5 rounded-md text-quiet hover:text-accent transition-colors"
                  aria-label="Open publication"
                >
                  <RiExternalLinkLine className="text-sm" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
