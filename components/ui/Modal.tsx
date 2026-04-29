"use client";

import { useState } from "react";
import Button from "./Button";

type ModalProps = {
  title: string;
  description: string;
  techs: string[];
  deploy?: string;
  github?: string;
  onClose: () => void;
};

export default function Modal({
  title,
  description,
  techs,
  deploy,
  github,
  onClose,
}: ModalProps) {
  const handleOverlayClick = () => onClose();
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-[4px] flex justify-center items-center z-[9999] p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-background text-foreground p-8 rounded-xl max-w-[500px] w-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] relative"
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 bg-transparent border-none text-foreground cursor-pointer text-lg font-bold"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <h2
          id="modal-title"
          className="text-accent text-2xl font-bold mb-4 text-center"
        >
          {title}
        </h2>

        <p className="mb-4 leading-relaxed opacity-70">{description}</p>

        <ul className="flex flex-wrap gap-2 mb-8 justify-center">
          {techs.map((tech, index) => (
            <li
              key={index}
              className="flex items-center justify-center bg-background px-4 py-2 rounded-2xl text-sm font-bold
              border border-background shadow-[6px_6px_12px_var(--color-shadow-primary),-6px_-6px_12px_var(--color-shadow-secondary)]
              transition-all duration-400 gap-2"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex gap-4 mb-4 justify-center">
          {deploy && (
            <Button
              as="a"
              href={deploy}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver deploy do projeto"
              className="!bg-accent !text-tertiary"
            >
              Deploy
            </Button>
          )}
          {github && (
            <Button
              as="a"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver código no GitHub"
              className="!bg-accent !text-tertiary"
            >
              Código
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
