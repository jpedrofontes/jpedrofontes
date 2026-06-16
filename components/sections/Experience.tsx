"use client";

import { motion } from "framer-motion";
import { RiMapPinLine } from "react-icons/ri";
import SectionHeader from "@/components/SectionHeader";
import LogoBadge from "@/components/LogoBadge";
import type { CVData } from "@/lib/cv-data";

const groupVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

function companyDateRange(roles: CVData["experiences"][0]["roles"]) {
  const start = roles[roles.length - 1].start;
  const end   = roles[0].end;
  return `${start} – ${end ?? "Present"}`;
}

export default function Experience({ experiences }: { experiences: CVData["experiences"] }) {
  return (
    <section id="experience" className="py-14 border-b border-edge">
      <SectionHeader label="Career" title="Experience" />

      <div className="relative pl-5">
        {/* Main timeline spine */}
        <div className="absolute left-1 top-2 bottom-2 w-px bg-edge" />

        {experiences.map((group, gi) => {
          const multiRole = group.roles.length > 1;

          return (
            <motion.div
              key={gi}
              custom={gi}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={groupVariant}
              className="relative mb-8 last:mb-0"
            >
              {/* Company dot on spine */}
              <div
                className="absolute -left-5 top-5 w-2.5 h-2.5 rounded-full bg-bg"
                style={{ border: "2px solid var(--accent)" }}
              />

              <div className="ml-4">
                {/* ── Company header ─────────────────────────────── */}
                <div className="flex items-center gap-3 mb-3">
                  <LogoBadge src={group.logo} alt={group.company} size="md" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-ink leading-tight">{group.company}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-quiet">
                        <RiMapPinLine className="shrink-0 text-[11px]" />
                        {group.location}
                      </span>
                      <span className="text-xs text-quiet opacity-60">·</span>
                      <span className="text-xs text-quiet">{companyDateRange(group.roles)}</span>
                    </div>
                  </div>
                </div>

                {/* ── Roles ──────────────────────────────────────── */}
                {multiRole ? (
                  /* Multiple roles: nested sub-thread */
                  <div className="relative pl-5 border-l border-edge ml-2">
                    {group.roles.map((role, ri) => (
                      <div key={ri} className="relative mb-4 last:mb-0">
                        {/* Role dot on sub-spine */}
                        <div
                          className="absolute -left-[25px] top-[22px] w-2 h-2 rounded-full bg-bg"
                          style={{ border: "1.5px solid var(--text-quiet)" }}
                        />

                        <div className="rounded-xl p-4 bg-card border border-edge hover:border-accent-ring transition-colors duration-200">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <p className="font-semibold text-sm text-ink">{role.title}</p>
                            <span className="text-xs px-2.5 py-1 rounded-full text-quiet bg-bg border border-edge shrink-0">
                              {role.start} – {role.end ?? "Present"}
                            </span>
                          </div>
                          <p className="text-xs text-quiet leading-relaxed">{role.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Single role: inline card */
                  <div className="rounded-xl p-4 bg-card border border-edge hover:border-accent-ring transition-colors duration-200">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <p className="font-semibold text-sm text-ink">{group.roles[0].title}</p>
                      <span className="text-xs px-2.5 py-1 rounded-full text-quiet bg-bg border border-edge shrink-0">
                        {group.roles[0].start} – {group.roles[0].end ?? "Present"}
                      </span>
                    </div>
                    <p className="text-xs text-quiet leading-relaxed">{group.roles[0].description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
