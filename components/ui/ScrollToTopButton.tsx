"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-4 right-4 z-[1000] p-4 rounded-full bg-black/70 text-white
      backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.2)] border-none cursor-pointer
      transition-[opacity,transform] duration-300 min-[768px]:hidden
      ${isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}`}
      aria-label="Voltar ao topo"
    >
      <FaArrowUp size={16} />
    </button>
  );
}
