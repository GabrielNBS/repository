import type { DrawingMap } from '../shared/motion/RasterDrawing';
import { getImageProps } from 'next/image';
import regula from '../../../public/illustrations/project-concepts/regula.draw.json';
import eFood from '../../../public/illustrations/project-concepts/e-food.draw.json';
import ePlay from '../../../public/illustrations/project-concepts/e-play.draw.json';
import toDo from '../../../public/illustrations/project-concepts/to-do.draw.json';
import spiderVerse from '../../../public/illustrations/project-concepts/spider-verse.draw.json';
import cloneDisney from '../../../public/illustrations/project-concepts/clone-disney.draw.json';
import hojeTaDoce from '../../../public/illustrations/project-concepts/hoje-ta-doce.draw.json';
import whatsappSender from '../../../public/illustrations/project-concepts/whatsapp-sender.draw.json';

interface ProjectIllustration {
  drawing: DrawingMap;
  alt: string;
}

const illustrations: Record<string, ProjectIllustration | undefined> = {
  regula: { drawing: regula, alt: 'Desenho de caixa registradora, recibo e caixas de estoque' },
  'e-food': { drawing: eFood, alt: 'Desenho de sacola de delivery, embalagem de comida e comanda' },
  'e-play': { drawing: ePlay, alt: 'Desenho de controle de videogame e cartões de jogos' },
  'to-do': { drawing: toDo, alt: 'Desenho de bloco de tarefas com checks e lápis' },
  'spider-verse': { drawing: spiderVerse, alt: 'Desenho de megafone, quadrinhos e teia' },
  'clone-disney': {
    drawing: cloneDisney,
    alt: 'Desenho de tela com símbolo de play e tira de filme'
  },
  'hoje-ta-doce': {
    drawing: hojeTaDoce,
    alt: 'Desenho de fatia de bolo na boleira e cartão de encomenda'
  },
  'whatsapp-sender': {
    drawing: whatsappSender,
    alt: 'Desenho de avião de papel, envelopes e calendário'
  }
};

export function getProjectIllustration(slug: string) {
  const illustration = illustrations[slug];
  if (!illustration) return undefined;
  const { props } = getImageProps({
    src: `/illustrations/project-concepts/${slug}.png`,
    alt: illustration.alt,
    width: 360,
    height: Math.round((360 * illustration.drawing.height) / illustration.drawing.width)
  });
  return { ...illustration, src: props.src };
}
