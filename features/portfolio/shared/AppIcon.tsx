import {
  PiArrowDown, PiArrowLeft, PiArrowRight, PiArrowUp, PiArrowUpRight,
  PiBookOpen, PiCaretDown, PiDownloadSimple, PiEnvelopeSimple,
  PiGithubLogo, PiHouse, PiLinkedinLogo, PiMinus, PiPlus,
  PiSlidersHorizontal, PiSquaresFour, PiUser, PiX
} from 'react-icons/pi';
import styles from './AppIcon.module.css';

const icons = {
  arrowDown: PiArrowDown,
  arrowLeft: PiArrowLeft,
  arrowRight: PiArrowRight,
  arrowUp: PiArrowUp,
  arrowUpRight: PiArrowUpRight,
  book: PiBookOpen,
  caretDown: PiCaretDown,
  close: PiX,
  download: PiDownloadSimple,
  email: PiEnvelopeSimple,
  github: PiGithubLogo,
  home: PiHouse,
  linkedin: PiLinkedinLogo,
  minus: PiMinus,
  plus: PiPlus,
  skills: PiSlidersHorizontal,
  projects: PiSquaresFour,
  user: PiUser
};

export type AppIconName = keyof typeof icons;

/** Decorative Phosphor Regular icons; the containing control supplies its label. */
export default function AppIcon({ name, size = 'action', className = '' }: {
  name: AppIconName;
  size?: 'action' | 'compact';
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={`${styles.icon} ${styles[size]} ${className}`} aria-hidden="true" focusable="false" />;
}
