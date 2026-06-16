"use client";

import { motion } from "framer-motion";
import { RiMapPinLine, RiMailLine, RiGithubLine } from "react-icons/ri";

export default function Hero() {
  return (
    <section className="py-16 lg:py-20 border-b border-edge relative overflow-hidden">
      {/* Ambient glow behind name */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--accent)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-4">
          Hello, I'm
        </p>

        <h1 className="text-4xl lg:text-5xl font-bold text-ink mb-3 leading-tight">
          João Pedro Fontes
        </h1>

        <p className="text-base font-medium text-quiet mb-7">
          Backend Engineer · Python · AWS / GCP
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm leading-[1.85] text-quiet max-w-xl mb-8"
        >
          I specialise in building{" "}
          <span className="text-ink font-medium">scalable backend systems</span>{" "}
          and robust{" "}
          <span className="text-ink font-medium">RESTful APIs</span>.
          Currently at{" "}
          <a href="https://github.com/LokaHQ" target="_blank" rel="noopener noreferrer" className="text-ink font-medium hover:text-accent transition-colors">@LokaHQ</a> designing robust RESTful APIs
          and cloud-native infrastructure with{" "}
          <span className="text-ink font-medium">FastAPI</span>,{" "}
          <span className="text-ink font-medium">AWS</span>, and{" "}
          <span className="text-ink font-medium">GCP</span>.
          My background in AI research at the{" "}
          <span className="text-ink font-medium">University of Minho</span>{" "}
          gives me a strong foundation for data-intensive problems — with work published
          in <span className="text-ink font-medium">Computers in Biology and Medicine</span>{" "}
          and presented at the European Congress of Radiology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap gap-2.5"
        >
          <a
            href="mailto:mail@jpedrofontes.com"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-card border border-edge text-quiet hover:text-ink hover:border-accent-ring transition-colors"
          >
            <RiMailLine className="text-sm" />
            mail@jpedrofontes.com
          </a>
          <a
            href="https://github.com/jpedrofontes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-card border border-edge text-quiet hover:text-ink hover:border-accent-ring transition-colors"
          >
            <RiGithubLine className="text-sm" />
            jpedrofontes
          </a>
          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-card border border-edge text-quiet">
            <RiMapPinLine className="text-sm" />
            Braga, Portugal
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
