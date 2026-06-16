"use client";

import { motion } from "framer-motion";
import { RiExternalLinkLine } from "react-icons/ri";
import SectionHeader from "@/components/SectionHeader";
import type { CVData } from "@/lib/cv-data";

export default function Certifications({ certifications }: { certifications: CVData["certifications"] }) {
  return (
    <section id="certifications" className="py-14 border-b border-edge">
      <SectionHeader label="Credentials" title="Certifications" />

      <div className="space-y-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rounded-xl p-5 bg-card border border-edge hover:border-accent-ring transition-colors duration-200 flex items-start gap-4"
          >
            <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center mt-0.5">
              {cert.badgeUrl ? (
                <img src={cert.badgeUrl} alt={cert.name} className="w-12 h-12 object-contain" />
              ) : (
                <span className="text-xs font-bold text-accent">CERT</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-ink">{cert.name}</h3>
                  <p className="text-xs mt-0.5 text-accent">{cert.issuer}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full text-quiet bg-bg border border-edge shrink-0">
                  {cert.date}
                </span>
              </div>

              <p className="text-xs mt-2.5 text-quiet leading-relaxed">{cert.description}</p>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs mt-2 font-medium text-accent hover:underline"
                >
                  Verify credential
                  <RiExternalLinkLine className="text-xs" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
