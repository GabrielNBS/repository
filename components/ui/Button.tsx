import { cn } from '@/lib/utils';

type ButtonComponentProps = {
  children: React.ReactNode;
  as?: 'a' | 'button';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  download?: boolean;
  className?: string;
  'aria-label'?: string;
  title?: string;
  variant?: 'default' | 'underline';
};

const GlassOrbEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 dark:mix-blend-screen mix-blend-multiply">
    <div className="absolute top-1/2 -right-[15%] w-[45%] h-[160%] bg-gradient-to-l from-indigo-400 via-purple-400 to-rose-400 dark:from-indigo-500 dark:via-purple-500 dark:to-rose-500 blur-[24px] -translate-y-1/2 rounded-full" />
  </div>
);

export default function Button({
  children,
  as = 'button',
  href,
  target,
  rel,
  onClick,
  type = 'button',
  download,
  className,
  title,
  variant = 'default',
  'aria-label': ariaLabel
}: ButtonComponentProps) {
  const isUnderline = variant === 'underline';

  const baseClasses = isUnderline
    ? cn(
        'relative inline-flex items-center justify-center cursor-pointer border-none bg-transparent',
        'text-[18px] text-zinc-700 dark:text-[#e1e1e1] font-[800] uppercase',
        'transition-colors duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)]',
        'hover:text-zinc-950 dark:hover:text-white focus:text-zinc-950 dark:focus:text-white focus:outline-none',
        'after:content-[""] after:pointer-events-none after:absolute after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[2px] after:bg-zinc-950 dark:after:bg-white',
        'after:transition-all after:duration-400 after:ease-[cubic-bezier(0.25,0.8,0.25,1)]',
        'hover:after:w-full hover:after:left-0 focus:after:w-full focus:after:left-0',
        className
      )
    : cn(
        'group inline-flex items-center justify-center relative overflow-hidden px-[1.7rem] py-[0.7rem]',
        'text-fluid-sm font-bold rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'cursor-pointer z-[1] select-none active:scale-[0.98]',
        // Fill + Stroke
        'bg-foreground border-zinc-200/80 dark:border-white/10',
        // Glass + Shadows
        'backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]',
        'text-tertiary',
        className
      );

  const InnerContent = isUnderline ? (
    <span className="flex items-center gap-2">{children}</span>
  ) : (
    <>
      <GlassOrbEffect />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (as === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={baseClasses}
        aria-label={ariaLabel}
        title={title}
      >
        {InnerContent}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses} aria-label={ariaLabel}>
      {InnerContent}
    </button>
  );
}
