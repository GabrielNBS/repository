# Rascunho — cenários pseudo-3D dos cards de skills

## Intenção

Cada card recebe uma pequena cena SVG que materializa a habilidade descrita. As seis artes pertencem à mesma “oficina de interfaces”: câmera isométrica, palco losangular, contorno `ink`, volumes planos e uma única peça flutuante por cena.

## Sistema visual

- Paleta: somente os tokens `paper`, `ink`, `peach`, `lilac`, `cream` e `rose`.
- Projeção: câmera ortográfica com o mesmo ângulo para todos os cenários.
- Construção: base comum, faces sólidas sem gradiente e linhas arredondadas.
- Composição: arte à direita do card; índice, título e descrição preservam o alinhamento existente à esquerda.
- Movimento: oscilação curta no eixo vertical e rotação de câmera de poucos graus; sem movimento para `prefers-reduced-motion`.

## Variações

1. **React & Next.js** — três superfícies de interface conectadas por uma rota.
2. **TypeScript em escala** — módulos sólidos ligados por contratos tipados.
3. **Performance Web** — trilha de entrega atravessada por um pacote leve.
4. **Design Systems** — bancada de componentes organizados por uma grade comum.
5. **Acessibilidade** — percurso de foco conectando controles e pontos de entrada.
6. **Frontend com IA** — estação humana coordenando uma constelação de possibilidades.

## Implementação

1. `SkillScene.tsx` expõe uma API única com seis variantes.
2. Primitivas compartilhadas definem palco, materiais, contornos e câmera.
3. Zdog calcula profundidade e ordenação, renderizando em um elemento SVG real.
4. GSAP anima apenas propriedades de transformação e respeita movimento reduzido.
5. A ilustração é decorativa; título e descrição continuam sendo a fonte acessível.
6. `skill-scenes-preview.html` e `skill-scenes-preview.css` são descartáveis e não entram no bundle.
