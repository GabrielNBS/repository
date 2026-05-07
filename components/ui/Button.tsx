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
    "group inline-flex items-center justify-center relative overflow-hidden px-[1.7rem] py-[0.7rem]",
    "text-fluid-sm font-bold rounded-[0.8em] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
    "cursor-pointer z-[1] select-none active:scale-[0.98]",
    // Reference 1: Dark Gradient & Stroke
    "bg-linear-to-b from-[#201E25] to-[#323137] border border-[#4B4951] border-b-[#313036]",
    "text-white/90 hover:text-white",
    // Reference 1: Layered Shadows
    "shadow-[0_2px_4px_rgba(0,0,0,0.1),0_0_0_1px_#0D0D0D]",
    // Reference 2: Glassmorphism base
    "backdrop-blur-sm",
    className
  );

  const SmokeEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-[-1]">
      {/* Smoke container fixed to the right */}
      <div className="absolute -right-[10%] top-[-20%] w-[70%] h-[140%] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        {/* Blob 1: Accent Purple */}
        <div className="absolute top-[10%] right-[10%] w-full h-full 
          bg-[radial-gradient(circle,rgba(119,67,219,0.4)_0%,transparent_70%)] 
          blur-2xl animate-[smoke-morph_8s_infinite_alternate] ease-in-out" 
        />
        {/* Blob 2: Cyan/Mint (Secondary Reference) */}
        <div className="absolute bottom-[10%] right-0 w-[80%] h-[80%] 
          bg-[radial-gradient(circle,rgba(0,196,154,0.3)_0%,transparent_70%)] 
          blur-2xl animate-[smoke-morph_6s_infinite_alternate-reverse] ease-in-out delay-1000" 
        />
        {/* Blob 3: White/Soft light for highlights */}
        <div className="absolute top-1/2 right-[20%] w-[50%] h-[50%] 
          bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] 
          blur-xl animate-[smoke-morph_10s_infinite_alternate] ease-in-out delay-500" 
        />
      </div>
    </div>
  );

  const InnerContent = (
    <>
      <SmokeEffect />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Reference 2: Subtle top highlight (Inner Shadow feel) */}
      <div className="absolute inset-px rounded-[inherit] border-t border-white/10 pointer-events-none" />
    </>
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
        {InnerContent}
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
      {InnerContent}
    </button>
  );
}
