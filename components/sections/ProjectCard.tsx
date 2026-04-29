"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import PulsePointer from "@/components/ui/PulsePointer";
import SquishyText from "@/components/animations/SquishyText";
import CustomImage from "@/components/ui/CustomImage";
import LinkPreview from "@/components/ui/LinkPreview";
import Tag from "@/components/ui/Tag";
import { FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

type ProjectCardProps = {
  id: number;
  name: string;
  title: string;
  description: string;
  techs: string[];
  mockups: string[];
  deploy: string;
  github: string;
  isNew?: boolean;
  bgColor: string;
};

function useScreenType() {
  const [screenType, setScreenType] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenType("desktop");
      else if (width >= 768) setScreenType("tablet");
      else setScreenType("mobile");
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenType;
}

export default function ProjectCard({
  id,
  name,
  title,
  description,
  techs,
  mockups,
  deploy,
  github,
  isNew = false,
  bgColor,
}: ProjectCardProps) {
  const screenType = useScreenType();
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animar a entrada do mockup amarrado ao scroll (scrub) com efeito 3D estilo "abertura de tela"
    gsap.set(mockupRef.current, {
      transformPerspective: 1200,
      transformOrigin: "bottom center",
    });

    gsap.from(mockupRef.current, {
      y: 120,
      scale: 0.85,
      rotationX: -60, // Gira a imagem como se fosse a tampa de um notebook abrindo
      opacity: 0,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 20%",
        scrub: 1,
      },
    });
  }, { scope: sectionRef });

  const getMockupImage = () => {
    switch (screenType) {
      case "desktop": return mockups[2];
      case "tablet": return mockups[1];
      case "mobile": return mockups[0];
      default: return mockups[2];
    }
  };

  return (
    <section
      ref={sectionRef}
      data-number={id}
      data-bg-color={bgColor}
      id={name}
      className="grid h-dvh w-full grid-cols-[40%_60%] justify-center px-16 gap-8 relative overflow-hidden project-section
      before:content-[attr(data-number)] before:absolute before:bg-transparent before:top-4 before:right-4
      before:text-[8rem] before:font-bold before:[-webkit-text-stroke:2px_var(--color-shadow-secondary)] before:opacity-50
      max-[767px]:flex max-[767px]:px-0 max-[767px]:before:top-0 max-[767px]:before:text-[5rem]
      [&_h2]:mb-2 [&_h2]:flex [&_h2]:items-center [&_h2]:flex-wrap [&_h2]:gap-4"
    >
      {/* Description (hidden on mobile) */}
      {screenType !== "mobile" && (
        <div className="flex flex-col justify-center text-foreground w-full [&>p]:contrast-50 [&>p]:mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-bold">
              <PulsePointer />
              <SquishyText text={title} />
            </h2>
            {isNew && <Tag />}
          </div>

          <p className="text-[clamp(1rem,2.5vw,1.125rem)] leading-relaxed">
            {description}
          </p>

          <ul className="flex flex-wrap gap-4 mb-12">
            {techs.map((tech, index) => (
              <li key={index} className="flex items-center gap-2">
                <p className="text-[clamp(1rem,2.5vw,1.125rem)] font-bold">{tech}</p>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 overflow-visible">
            {github && (
              <LinkPreview type="github">
                <Button
                  as="a"
                  href={github}
                  aria-label={`Ver código de ${title} no GitHub`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub className="inline mr-1" /> Código
                </Button>
              </LinkPreview>
            )}
            {deploy && (
              <LinkPreview type="deploy" image={mockups[2]} url={deploy} title={title}>
                <Button
                  as="a"
                  href={deploy}
                  aria-label={`Ver site do projeto ${title}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaExternalLinkAlt className="inline mr-1" /> Site
                </Button>
              </LinkPreview>
            )}
          </div>
        </div>
      )}

      {/* Mockup image */}
      <div
        ref={mockupRef}
        className="flex justify-center items-center max-w-full h-auto
        max-[767px]:flex-col max-[767px]:gap-8 max-[767px]:max-w-[80%]"
      >
        <CustomImage
          src={getMockupImage()}
          alt={`Mockup ${screenType} do projeto ${title}`}
        />
        {screenType === "mobile" && (
          <Button
            as="button"
            onClick={() => setShowModal(true)}
            aria-label={`Abrir detalhes do projeto ${title}`}
            className="!bg-accent !text-tertiary"
          >
            Saiba +
          </Button>
        )}
      </div>

      {showModal && (
        <Modal
          title={title}
          description={description}
          techs={techs}
          deploy={deploy}
          github={github}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
