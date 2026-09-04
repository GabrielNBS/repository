import gsap from 'gsap';

type SplitTextLike = {
  masks: Element[];
};

export const SPLIT_TEXT_MASK_INSET = {
  padding: '0.08em 0.04em',
  margin: '-0.08em -0.04em'
} as const;

export const SPLIT_TEXT_CHAR_INSET = {
  paddingBlock: '0.04em',
  marginBlock: '-0.04em'
} as const;

/** Keeps diacritics, tight tracking and rotated text inside SplitText masks. */
export function protectSplitTextMasks(splits: SplitTextLike | SplitTextLike[]) {
  const splitList = Array.isArray(splits) ? splits : [splits];
  const masks = splitList.flatMap((split) => split.masks);

  if (masks.length) {
    // Ajuste de segurança visual: a máscara recebe uma pequena folga para que
    // acentos, tracking e rotações não sejam cortados durante a animação.
    // Não altere este valor sem testar títulos com caracteres como ã, ç e é.
    gsap.set(masks, SPLIT_TEXT_MASK_INSET);
  }
}
