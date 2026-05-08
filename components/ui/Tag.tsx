export default function Tag() {
  return (
    <div
      className="bg-accent -translate-y-5 rounded-md px-3 py-1.5 inline-flex items-center justify-center
      shadow-[0_4px_10px_var(--color-shadow-primary)] transition-[transform,box-shadow] duration-200
      animate-pulse relative
      hover:shadow-[0_6px_14px_var(--color-shadow-secondary)]
      after:content-['★'] after:absolute after:-top-2.5 after:-right-1 after:text-[#ffd700] after:text-base after:drop-shadow-sm"
    >
      <span className="text-xs font-bold uppercase tracking-wider text-tertiary">Novidade</span>
    </div>
  );
}
