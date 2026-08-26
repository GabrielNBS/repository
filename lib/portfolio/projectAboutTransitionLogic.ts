export type TransitionPixel = {
  delay: number;
  id: string;
};

export const projectsAboutTransitionGrid = { columns: 18, rows: 15 };

function createRandom(seed: number) {
  let value = seed % 2147483647;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createTransitionPixels() {
  const { columns, rows } = projectsAboutTransitionGrid;
  const random = createRandom(20260824);

  return Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const diagonal = (column + row * 0.72) / (columns + rows * 0.72);

    return {
      delay: Number((diagonal * 0.34 + random() * 0.13).toFixed(3)),
      id: `${row}-${column}`
    };
  });
}

export const projectsAboutTransitionPixels = createTransitionPixels();
