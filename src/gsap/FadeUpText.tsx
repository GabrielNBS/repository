import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface FadeUpTextProps {
  text: string;
  className?: string;
}

const FadeUpText: React.FC<FadeUpTextProps> = ({ text, className }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (textRef.current) {
      splitRef.current = new SplitText(textRef.current, { type: 'lines' });

      const animation = gsap.from(splitRef.current.lines, {
        y: 100,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse' // anima ao entrar, reverte ao sair
        }
      });

      return () => {
        splitRef.current?.revert(); // limpa SplitText
        animation.scrollTrigger?.kill(); // remove ScrollTrigger
        animation.kill(); // mata a timeline
      };
    }
  }, []);

  return (
    <span
      ref={textRef}
      className={`overflow-hidden leading-[1.5] ${className ?? ''}`}
      aria-label={text}
    >
      {text}
    </span>
  );
};

export default FadeUpText;
