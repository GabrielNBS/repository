"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleToggleMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isClickInsideMenu = menuRef.current?.contains(target);
      const isClickOnMenuButton = document
        .querySelector('[aria-label="Menu mobile"]')
        ?.contains(target);
      if (!isClickInsideMenu && !isClickOnMenuButton) {
        setIsMobileMenuOpen(false);
      }
    }

    function handleScroll() {
      setIsScrolled(window.scrollY > 300);
      if (mobileMenuOpen) setIsMobileMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-20 px-4 flex rounded-2xl justify-between items-center z-10
        bg-transparent transition-all duration-300 will-change-transform
        before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-background
        before:contrast-110 before:opacity-0 before:scale-95 before:z-[-1] before:transition-all before:duration-300
        before:shadow-[15px_15px_30px_var(--color-shadow-primary)]
        max-[767px]:before:hidden
        ${isScrolled ? "!w-[24dvw] !top-[2%] !left-[2%] opacity-95 before:!opacity-100 before:!scale-100 max-[767px]:!w-full max-[767px]:!left-0 max-[767px]:!opacity-85" : ""}`}
      >
        <h1
          onClick={handleClick}
          aria-label="Logo"
          className="cursor-pointer max-[767px]:hidden"
        >
          <Logo />
        </h1>

        <div className="max-[767px]:hidden">
          <ThemeToggle />
        </div>

        <button
          onClick={handleToggleMenu}
          aria-label="Menu mobile"
          className="hidden max-[767px]:flex flex-col bg-transparent w-10 h-10 justify-center items-center border-none cursor-pointer relative z-[5]"
        >
          <motion.span
            className="absolute w-full h-[5px] rounded-sm bg-foreground top-2"
            animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute w-full h-[5px] rounded-sm bg-foreground top-[1.1rem]"
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute w-full h-[5px] rounded-sm bg-foreground bottom-2"
            animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            ref={menuRef}
            className="flex flex-col justify-around items-center fixed h-dvh w-4/5 max-w-[300px]
            top-0 left-0 bg-background contrast-110 rounded-r-2xl z-[3] p-8
            shadow-[2px_0_15px_rgba(0,0,0,0.3)] min-[1023px]:hidden"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Menu de navegação mobile"
          >
            <h1 className="text-2xl">
              <Logo />
            </h1>

            <nav>
              <ul>
                {[
                  {
                    href: "https://www.linkedin.com/in/gabrielnascimento-dev/",
                    label: "Linkedin",
                    icon: FaLinkedinIn,
                  },
                  {
                    href: "https://www.github.com/GabrielNBS",
                    label: "GitHub",
                    icon: FaGithub,
                  },
                  {
                    href: "https://wa.me/+5532984286600?text=Olá!%20Gostaria%20de%20entrar%20em%20contato.",
                    label: "Whatsapp",
                    icon: FaWhatsapp,
                  },
                ].map((link) => (
                  <li key={link.label} className="my-4">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      title={link.label}
                      className="flex items-center text-foreground text-xl no-underline [&>svg]:mx-2"
                    >
                      <link.icon />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ThemeToggle />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
