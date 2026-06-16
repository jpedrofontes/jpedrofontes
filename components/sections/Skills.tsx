"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import type { CVData } from "@/lib/cv-data";

export default function Skills({ skills }: { skills: CVData["skills"] }) {
  return (
    <section id="skills" className="py-14 border-b border-edge">
      <SectionHeader label="Expertise" title="Skills" />

      <div className="space-y-8">
        {skills.map((group, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: gi * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-quiet mb-3">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, si) => (
                <motion.span
                  key={si}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: gi * 0.07 + si * 0.04 }}
                  className="text-xs px-3 py-1.5 rounded-full font-medium text-accent bg-accent-wash border border-accent-ring"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
