"use client";

import { motion } from "motion/react";
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";

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
  return (
    <>
      {/* Left Sidebar: Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        className="fixed bottom-0 left-6 xl:left-12 z-50 hidden lg:flex flex-col items-center gap-8"
      >
        <div className="flex flex-col gap-6">
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-foreground/40 hover:text-accent transition-all duration-300 block"
              whileHover={{ y: -4, color: "var(--color-accent)" }}
            >
              <social.icon size={22} />
            </motion.a>
          ))}
        </div>
        <div className="w-[1px] h-24 xl:h-32 bg-foreground/20" />
      </motion.div>

      {/* Right Sidebar: Email */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        className="fixed bottom-0 right-6 xl:right-12 z-50 hidden lg:flex flex-col items-center gap-8"
      >
        <a
          href="mailto:gabrielnbs.dev@gmail.com"
          className="text-foreground/40 hover:text-accent font-mono text-sm tracking-[0.2em] [writing-mode:vertical-rl] transition-all duration-300 hover:-translate-y-2 block"
        >
          gabrielnbs.dev@gmail.com
        </a>
        <div className="w-[1px] h-24 xl:h-32 bg-foreground/20" />
      </motion.div>
    </>
  );
}

