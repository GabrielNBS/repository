import React, { type ComponentProps, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export type ButtonVariant = "filled" | "outlined" | "text";
export type ButtonIntent = "primary" | "secondary";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  intent?: ButtonIntent;
  disabled?: boolean;
}

const getButtonStyles = ({ variant = "filled", intent = "primary", disabled }: ButtonBaseProps) => {
  return cn(
    // Base styles: font, weight, transition, layout alignment
    "font-ui text-ui transition-all duration-180 inline-flex items-center justify-center gap-action-gap max-sm:w-full select-none relative overflow-hidden",
    
    // Filled variant
    variant === "filled" && [
      "min-h-touch px-button-x py-button-y rounded-sm border border-transparent shadow-sm",
      intent === "primary" && !disabled && "bg-ink text-paper hover:bg-accent-dark",
      intent === "secondary" && !disabled && "bg-paper text-ink border-line/50 hover:bg-soft",
      disabled && "bg-soft text-muted/60 cursor-not-allowed opacity-60"
    ],
    
    // Outlined variant
    variant === "outlined" && [
      "min-h-touch px-button-x py-button-y rounded-sm border",
      intent === "primary" && !disabled && "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper",
      intent === "secondary" && !disabled && "bg-transparent text-muted border-line hover:border-ink hover:text-ink",
      disabled && "bg-transparent text-muted/40 border-line/40 cursor-not-allowed"
    ],
    
    // Text variant
    variant === "text" && [
      "bg-transparent px-0.5 pt-1 pb-0.5 border-b rounded-none",
      intent === "primary" && !disabled && "text-ink border-ink hover:text-accent hover:border-accent",
      intent === "secondary" && !disabled && "text-muted border-line hover:text-ink hover:border-ink",
      disabled && "text-muted/40 border-line/40 cursor-not-allowed"
    ]
  );
};

const renderChildren = (children: React.ReactNode) => {
  return React.Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return <span className="btn-text inline-block">{child}</span>;
    }
    if (React.isValidElement(child)) {
      const childProps = child.props as { className?: string };
      if (childProps?.className?.includes("btn-text") || childProps?.className?.includes("btn-icon")) {
        return child;
      }
      return <span className="btn-icon inline-flex shrink-0">{child}</span>;
    }
    return child;
  });
};

function useButtonAnimation(disabled?: boolean) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const textEl = el.querySelector(".btn-text");
    const iconEl = el.querySelector(".btn-icon");

    if (!textEl || !iconEl) return;

    const handleMouseEnter = () => {
      const textWidth = (textEl as HTMLElement).offsetWidth;
      const iconWidth = (iconEl as HTMLElement).offsetWidth;
      const computedGap = parseFloat(window.getComputedStyle(el).gap) || 8;

      gsap.killTweensOf([textEl, iconEl]);
      
      // Animação elástica e fluida para alternar posições (seta vai para a esquerda, texto para a direita)
      gsap.to(textEl, {
        x: iconWidth + computedGap,
        duration: 0.55,
        ease: "back.out(1.4)"
      });
      gsap.to(iconEl, {
        x: -(textWidth + computedGap),
        duration: 0.55,
        ease: "back.out(1.4)"
      });
    };

    const handleMouseLeave = () => {
      gsap.killTweensOf([textEl, iconEl]);
      
      gsap.to([textEl, iconEl], {
        x: 0,
        duration: 0.45,
        ease: "power2.out"
      });
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef, dependencies: [disabled] });

  return containerRef;
}

export interface ButtonLinkProps extends ComponentProps<typeof Link>, ButtonBaseProps {}

export function ButtonLink({
  className,
  variant = "filled",
  intent = "primary",
  disabled,
  href,
  children,
  ...props
}: ButtonLinkProps) {
  const styles = getButtonStyles({ variant, intent, disabled });
  const containerRef = useButtonAnimation(disabled);
  
  if (disabled) {
    return (
      <span
        ref={containerRef}
        className={cn(styles, className)}
        {...props}
      >
        {renderChildren(children)}
      </span>
    );
  }

  return (
    <Link
      ref={containerRef}
      href={href}
      className={cn(styles, className)}
      {...props}
    >
      {renderChildren(children)}
    </Link>
  );
}

export interface ButtonProps extends ComponentProps<"button">, ButtonBaseProps {}

export function Button({
  className,
  variant = "filled",
  intent = "primary",
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const containerRef = useButtonAnimation(disabled);
  
  return (
    <button
      ref={containerRef}
      type={type}
      disabled={disabled}
      className={cn(getButtonStyles({ variant, intent, disabled }), className)}
      {...props}
    >
      {renderChildren(children)}
    </button>
  );
}