'use client';

import { motion } from 'motion/react';
import { FaGithub, FaLinkedinIn, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function SocialNavBar() {
  const socialLinks = [
    {
      href: 'https://www.github.com/GabrielNBS',
      icon: FaGithub,
      label: 'GitHub'
    },
    {
      href: 'https://www.linkedin.com/in/gabrielnascimento-dev/',
      icon: FaLinkedinIn,
      label: 'LinkedIn'
    },
    {
      href: 'https://wa.me/+5532984286600?text=Olá!%20Gostaria%20de%20entrar%20em%20contato.',
      icon: FaWhatsapp,
      label: 'WhatsApp'
    }
  ];

  return (
    <>
      {/* Left Side - Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed left-6 lg:left-10 bottom-0 z-40 hidden md:flex flex-col items-center gap-6"
      >
        <ul className="flex flex-col gap-5 items-center list-none p-0 m-0">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/60 hover:text-accent hover:-translate-y-1 transition-all duration-300 block p-1"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            </li>
          ))}
        </ul>
        <div className="w-[1px] h-24 bg-foreground/30" />
      </motion.div>

      {/* Right Side - Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed right-6 lg:right-10 bottom-0 z-40 hidden md:flex flex-col items-center gap-6"
      ></motion.div>
    </>
  );
}
