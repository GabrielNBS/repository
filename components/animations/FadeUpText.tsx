"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeUpTextProps {
  text: string;
  className?: string;
}

export default function FadeUpText({ text, className }: FadeUpTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(" ");
    textRef.current.innerHTML = words
      .map((word) => `<span class="inline-block overflow-hidden"><span class="split-word inline-block">${word}</span></span>`)
      .join(" ");

    const wordElements = textRef.current.querySelectorAll(".split-word");

    const animation = gsap.from(wordElements, {
      y: 100,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [text]);

  return (
    <span
      ref={textRef}
      className={`overflow-hidden leading-[1.5] ${className ?? ""}`}
      aria-label={text}
    >
      {text}
    </span>
  );
}
