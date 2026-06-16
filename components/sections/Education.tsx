"use client";

import { motion } from "framer-motion";
import { RiMapPinLine } from "react-icons/ri";
import SectionHeader from "@/components/SectionHeader";
import LogoBadge from "@/components/LogoBadge";
import type { CVData } from "@/lib/cv-data";

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function Education({ education }: { education: CVData["education"] }) {
  return (
    <section id="education" className="py-14 border-b border-edge">
      <SectionHeader label="Academic Background" title="Education" />

      <div className="relative pl-5">
        <div className="absolute left-1 top-2 bottom-2 w-px bg-edge" />

        {education.map((edu, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={item}
            className="relative mb-6 last:mb-0"
          >
            <div
              className="absolute -left-5 top-5 w-2.5 h-2.5 rounded-full bg-bg"
              style={{ border: "2px solid var(--accent)" }}
            />

            <div className="ml-4 rounded-xl p-5 bg-card border border-edge transition-colors duration-200 hover:border-accent-ring">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div className="flex items-start gap-3">
                  <LogoBadge src={edu.logo} alt={edu.institution} size="md" />
                  <div>
                    <h3 className="font-semibold text-sm text-ink">{edu.degree}</h3>
                    <p className="text-sm font-medium mt-0.5 text-accent">{edu.institution}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full text-quiet bg-bg border border-edge shrink-0">
                  {edu.start} – {edu.end ?? "Present"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-quiet mb-3">
                <RiMapPinLine className="shrink-0" />
                {edu.location}
              </div>

              <p className="text-sm text-quiet leading-relaxed">{edu.description}</p>

              {edu.thesis && (
                <p
                  className="text-xs mt-3 italic text-quiet leading-relaxed pl-3"
                  style={{ borderLeft: "2px solid var(--accent-ring)" }}
                >
                  Thesis: {edu.thesis}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
