import type {
  ComponentType,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes
} from 'react';

export interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: string;
  children?: ReactNode;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card: ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

declare const CardSwap: ComponentType<CardSwapProps>;

export default CardSwap;
