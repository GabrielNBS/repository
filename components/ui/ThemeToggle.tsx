"use client";

import { useTheme } from "@/components/layout/ThemeProvider";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <div className="relative">
      <label
        className="switch relative inline-block w-[3.5em] h-[2em] text-[17px]"
        style={{
          transformStyle: "preserve-3d",
          perspective: "500px",
          animation: "toggle-float 3s infinite",
        }}
      >
        {/* Blur glow behind the toggle */}
        <span
          className="absolute w-full h-full left-0 top-0 rounded-[50px] -z-1"
          style={{
            filter: "blur(20px)",
            backgroundColor: "var(--color-background-secondary)",
            backgroundImage: `
              radial-gradient(at 21% 46%, var(--color-accent) 0px, transparent 50%),
              radial-gradient(at 23% 25%, var(--color-foreground) 0px, transparent 50%),
              radial-gradient(at 20% 1%, var(--color-accent) 0px, transparent 50%),
              radial-gradient(at 86% 87%, var(--color-foreground) 0px, transparent 50%),
              radial-gradient(at 99% 41%, var(--color-accent) 0px, transparent 50%),
              radial-gradient(at 55% 24%, var(--color-foreground) 0px, transparent 50%)
            `,
          }}
        />

        <input
          type="checkbox"
          className="opacity-0 w-0 h-0 peer"
          onChange={toggleTheme}
          aria-label="Alternar tema"
        />

        {/* Slider track */}
        <span
          className="absolute cursor-pointer inset-0 bg-background transition-all duration-400 rounded-[30px]
          peer-checked:bg-background-secondary
          peer-checked:[&::before]:translate-x-[1.5em]"
          style={{}}
        >
          {/* Slider ball rendered as a child div for complex gradients */}
        </span>

        {/* Slider ball with radial gradients */}
        <span
          className="absolute h-[1.4em] w-[1.4em] left-[0.3em] bottom-[0.35em]
          transition-all duration-400 rounded-full pointer-events-none
          peer-checked:translate-x-[1.5em]"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -10px 10px 0px inset, rgba(0, 0, 0, 0.09) 0px -1px 15px -8px",
            backgroundColor: "var(--color-accent)",
            backgroundImage: `
              radial-gradient(at 81% 39%, var(--color-accent) 0px, transparent 50%),
              radial-gradient(at 11% 72%, var(--color-foreground) 0px, transparent 50%),
              radial-gradient(at 23% 20%, var(--color-accent) 0px, transparent 50%)
            `,
          }}
        />
      </label>
    </div>
  );
}
