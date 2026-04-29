export default function PulsePointer() {
  return (
    <div className="relative w-4 h-4">
      <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-accent opacity-60 animate-[pulse-pointer_1.8s_ease-out_infinite]" />
      <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)]" />
    </div>
  );
}
