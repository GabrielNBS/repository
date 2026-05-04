import { cn } from "@/lib/utils";

export default function TechSpan({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <li
      className={cn(
        "flex items-center justify-center bg-background px-8 py-4 text-foreground rounded-2xl text-base",
        "border border-background font-bold",
        "shadow-[6px_6px_12px_var(--color-shadow-primary),-6px_-6px_12px_var(--color-shadow-secondary)]",
        "transition-all duration-400 gap-2 cursor-pointer hover:contrast-110",
        className
      )}
    >
      {children}
    </li>
  );
}
