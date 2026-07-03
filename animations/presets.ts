export const EASES = {
  power2Out: 'power2.out',
  power3Out: 'power3.out',
  expoOut: 'expo.out'
} as const;

export const DURATIONS = {
  default: 0.8,
  slow: 1.2,
  fast: 0.4
} as const;

export const SCROLL_PRESETS = {
  reveal: {
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  },
  scrubReveal: {
    start: 'top 85%',
    toggleActions: 'play reverse play reverse',
    scrub: true
  }
} as const;
