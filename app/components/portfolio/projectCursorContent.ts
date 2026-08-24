const projectCursorIcons: Record<string, string> = {
  regula: '✦',
  'e-food': '◒',
  'e-play': '▷',
  'to-do': '✓',
  'spider-verse': '✺',
  'clone-disney': '◌',
  'hoje-ta-doce': '☼'
};

export function getProjectCursorIcon(slug: string) {
  return projectCursorIcons[slug] ?? '↗';
}
