"use client";

interface AnchorProps {
  activeSection: number;
}

export default function Anchor({ activeSection }: AnchorProps) {
  const sections = [
    "Hero",
    "About",
    "Regula",
    "EFood",
    "EPlay",
    "ToDo",
    "Spider-Verse",
    "CloneDisney",
    "HojeTaDoce",
    "Contact",
  ];

  const scrollToSection = (index: number) => {
    const section = document.querySelectorAll("section, main")[index];
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex fixed flex-col gap-2.5 top-1/2 right-5 -translate-y-1/2 z-[100] max-[767px]:hidden">
      {sections.map((sectionName, index) => (
        <button
          key={index}
          className={`w-4 h-4 rounded-full cursor-pointer transition-[background-color,opacity] duration-300 border-none
          hover:bg-foreground hover:opacity-100
          ${activeSection === index
            ? "bg-accent opacity-100"
            : "bg-[rgba(70,70,70,0.5)] opacity-20"
          }`}
          aria-label={`Ir para a seção ${sectionName}`}
          onClick={() => scrollToSection(index)}
        />
      ))}
    </div>
  );
}
