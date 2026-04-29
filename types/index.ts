import { IconType } from "react-icons";

// Props for project cards
export type CardProps = {
  id: number;
  name: string;
  mockups: string[];
  title: string;
  description: string;
  techs: string[];
  deploy: string;
  github: string;
  isNew?: boolean;
};

// Props for skill cards
export type CardSkillsProps = {
  icon: IconType;
  title: string;
  description: string;
  delay: string;
};

// Props for buttons
export type ButtonProps =
  | {
      children: React.ReactNode;
      as?: "a";
      href: string;
      target?: string;
      rel?: string;
      onClick?: never;
      type?: never;
      download?: boolean;
      className?: string;
      "aria-label"?: string;
    }
  | {
      children: React.ReactNode;
      as?: "button";
      onClick?: () => void;
      type?: "button" | "submit";
      href?: never;
      target?: never;
      rel?: never;
      download?: never;
      className?: string;
      "aria-label"?: string;
    };

// Props for theme toggle
export interface ThemeToggleProps {
  toggleTheme: () => void;
}

// Props for anchor navigation
export interface AnchorProps {
  activeSection: number;
}
