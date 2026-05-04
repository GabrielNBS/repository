import { cn } from "@/lib/utils";

type ButtonComponentProps = {
  children: React.ReactNode;
  as?: "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  download?: boolean;
  className?: string;
  "aria-label"?: string;
};

export default function Button({
  children,
  as = "button",
  href,
  target,
  rel,
  onClick,
  type = "button",
  download,
  className,
  "aria-label": ariaLabel,
}: ButtonComponentProps) {
  const baseClasses = cn(
    "inline-block relative overflow-hidden px-[1.7rem] py-[0.7rem]",
    "text-fluid-sm font-bold rounded-[0.5em]",
    "border border-transparent cursor-pointer",
    "bg-background contrast-110 text-foreground",
    "shadow-[12px_12px_24px_var(--color-shadow-primary),-12px_-12px_24px_var(--color-shadow-secondary)]",
    "transition-all duration-300 ease-in-out z-[1]",
    "hover:text-tertiary hover:border-accent",
    "active:shadow-[inset_12px_12px_24px_var(--color-shadow-primary),inset_-12px_-12px_24px_var(--color-shadow-secondary)]",
    "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-[3px]",
    "before:content-[''] before:absolute before:rounded-full before:block before:z-[-1] before:transition-all before:duration-500 before:ease-[cubic-bezier(0.55,0,0.1,1)]",
    "before:left-1/2 before:top-full before:w-[140%] before:h-[180%] before:-translate-x-1/2 before:scale-y-100 before:scale-x-125 before:bg-black/5",
    "after:content-[''] after:absolute after:rounded-full after:block after:z-[-1] after:transition-all after:duration-500 after:ease-[cubic-bezier(0.55,0,0.1,1)]",
    "after:left-[55%] after:top-[180%] after:w-[160%] after:h-[190%] after:-translate-x-1/2 after:scale-y-100 after:scale-x-[1.45] after:bg-accent",
    "hover:before:top-[-35%] hover:before:-translate-x-1/2 hover:before:scale-y-[1.3] hover:before:scale-x-[0.8] hover:before:bg-accent",
    "hover:after:top-[-45%] hover:after:-translate-x-1/2 hover:after:scale-y-[1.3] hover:after:scale-x-[0.8]",
    "max-[480px]:px-[1.2rem] max-[480px]:py-[0.6rem] max-[480px]:text-sm max-[480px]:rounded-[0.4rem]",
    className
  );

  if (as === "a") {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={baseClasses}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
