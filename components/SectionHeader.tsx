export default function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent mb-2">
        {label}
      </p>
      <h2 className="text-2xl font-bold text-ink">{title}</h2>
    </div>
  );
}
