"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import type { CVData } from "@/lib/cv-data";

const LEVEL_WIDTH: Record<string, string> = {
  Native:      "100%",
  Fluent:      "82%",
  Elementary:  "22%",
  Basic:       "38%",
};

export default function AdditionalInfo({
  languages,
  licenses,
}: {
  languages: CVData["languages"];
  licenses: CVData["licenses"];
}) {
  return (
    <section id="info" className="py-14 pb-24">
      <SectionHeader label="About" title="Additional Info" />

      {/* Languages */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-quiet mb-5">
          Languages
        </p>
        <div className="space-y-4">
          {languages.map((lang, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1.5 text-sm">
                <span className="font-medium text-ink">{lang.name}</span>
                <span className="text-xs text-quiet">{lang.level}</span>
              </div>
              <div className="h-1 rounded-full bg-edge overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: LEVEL_WIDTH[lang.level] ?? "50%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Licenses */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-quiet mb-4">
          Licenses
        </p>
        <div className="flex flex-wrap gap-2">
          {licenses.map((lic, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="text-xs px-3 py-1.5 rounded-full text-quiet bg-card border border-edge"
            >
              {lic}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
