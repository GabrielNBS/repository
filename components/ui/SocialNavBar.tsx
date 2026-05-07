"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaInstagram, FaTwitter, FaShareAlt, FaEnvelope } from "react-icons/fa";

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    href: "https://www.github.com/GabrielNBS",
    label: "GitHub",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaTwitter,
    href: "#",
    label: "Twitter",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/gabrielnascimento-dev/",
    label: "LinkedIn",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/+5532984286600",
    label: "WhatsApp",
  },
];

export default function SocialNavBar() {
  const [isCompact, setIsCompact] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  useEffect(() => {
    const sections = ['home', 'contact'];
    const visibilityMap = new Map<string, boolean>();

    const checkCompactState = () => {
      const isVisible = sections.some(id => visibilityMap.get(id));
      setIsCompact(!isVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          visibilityMap.set(entry.target.id, entry.isIntersecting);
        });
        checkCompactState();
      },
      // Lower threshold makes it trigger much faster when scrolling past the edges
      { threshold: 0.05, rootMargin: "-5% 0px" }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Left Sidebar: Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        className="fixed bottom-0 left-6 xl:left-12 z-40 hidden lg:flex flex-col items-center justify-end pb-4 px-2"
      >
        <AnimatePresence mode="popLayout">
          {isCompact ? (
            <motion.div
              key="compact-left"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-foreground/40 hover:text-accent cursor-pointer z-50 bg-background/50 backdrop-blur-sm shadow-sm"
              onMouseEnter={() => setHoverLeft(true)}
              onMouseLeave={() => setHoverLeft(false)}
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FaShareAlt size={18} className="relative z-10" />

              <AnimatePresence>
                {hoverLeft && (
                  <motion.div
                    className="absolute bottom-12 flex flex-col gap-6 items-center z-0"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {SOCIAL_LINKS.map((social, i) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/40 hover:text-accent bg-background/80 p-2 rounded-full shadow-sm backdrop-blur-sm"
                        variants={{
                          hidden: { opacity: 0, y: 20, scale: 0.5 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                              delay: (SOCIAL_LINKS.length - 1 - i) * 0.05
                            }
                          }
                        }}
                        whileHover={{ scale: 1.15, color: "var(--color-accent)" }}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="standard-left"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-foreground/40 hover:text-accent transition-colors duration-300 block"
                  whileHover={{ y: -4, color: "var(--color-accent)" }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-[1px] h-24 xl:h-32 bg-foreground/20 mt-6" />
      </motion.div>

      {/* Right Sidebar: Email */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        className="fixed bottom-0 right-6 xl:right-12 z-40 hidden lg:flex flex-col items-center justify-end pb-4 px-2"
      >
        <AnimatePresence mode="popLayout">
          {isCompact ? (
            <motion.div
              key="compact-right"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-foreground/40 hover:text-accent cursor-pointer z-50 bg-background/50 backdrop-blur-sm shadow-sm"
              onMouseEnter={() => setHoverRight(true)}
              onMouseLeave={() => setHoverRight(false)}
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FaEnvelope size={18} className="relative z-10" />

              <AnimatePresence>
                {hoverRight && (
                  <motion.a
                    href="mailto:gabrielnbs.dev@gmail.com"
                    className="absolute bottom-14 text-foreground/40 hover:text-accent font-mono text-sm tracking-[0.2em] [writing-mode:vertical-rl] whitespace-nowrap bg-background/80 py-4 px-2 rounded-full shadow-sm backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.05, color: "var(--color-accent)" }}
                  >
                    gabrielnbs.dev@gmail.com
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.a
              key="standard-right"
              href="mailto:gabrielnbs.dev@gmail.com"
              className="text-foreground/40 hover:text-accent font-mono text-sm tracking-[0.2em] [writing-mode:vertical-rl] transition-colors duration-300 block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              whileHover={{ y: -4, color: "var(--color-accent)" }}
            >
              gabrielnbs.dev@gmail.com
            </motion.a>
          )}
        </AnimatePresence>

        <div className="w-[1px] h-24 xl:h-32 bg-foreground/20 mt-6" />
      </motion.div>
    </>
  );
}



