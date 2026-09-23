# Convenção de estilo e movimento

Este projeto usa CSS Modules como padrão para estilos de componentes, com fronteiras explícitas
entre estilo, estado e movimento.

## Camadas

- `app/globals.css`: tokens do design, reset, estilos base, acessibilidade e regras globais de
  `prefers-reduced-motion`.
- CSS Modules: layout, espaçamento, tipografia, cores, responsividade, pseudo-elementos e estados
  visuais de cada componente. Cada componente visual isolado deve manter seu módulo ao lado do TSX.
- Tailwind: somente ajustes rápidos e de baixa complexidade, sem concentrar layout responsivo,
  estados ou estrutura visual de um componente.
- GSAP: animações dirigidas por JavaScript, scroll, cursor, timelines, física e transições que
  precisam de controle temporal.
- `style` inline: somente valores dinâmicos, dimensões calculadas ou variáveis CSS.

## Atributos `data-*`

- `data-motion="nome"`: alvo ou configuração semântica de uma animação GSAP. Valores múltiplos são
  separados por espaço e devem ser selecionados com `[data-motion~="nome"]`.
- `data-component="nome"`: marcador estrutural de um componente usado por CSS ou motion.
- `data-state="nome"`: estado visual controlado por React ou por uma transição, como
  `data-state="scrolled"`.
- `data-variant="nome"`: variante visual, como `peach`, `lilac`, `rose` ou `cream`.
- `data-motion-delay={valor}`: valor numérico usado para escalonar uma animação.

Não criar novos atributos legados específicos, como `data-hero`, `data-tone` ou
`data-blur-reveal`. O significado deve aparecer no namespace do atributo.

## Regras de GSAP em React

- Usar `useGSAP` para inicializar animações.
- Passar o `root` como `scope`.
- Buscar alvos com `root.current`, refs ou `gsap.utils.toArray(..., root.current)`.
- Usar `contextSafe` em callbacks de eventos que criam tweens depois da inicialização.
- Remover listeners, observers, timelines e propriedades CSS calculadas no cleanup.
- Não deixar CSS e GSAP controlarem a mesma propriedade no mesmo elemento. Isso vale
  principalmente para `transform`, `opacity` e `filter`.

## Estados e hover

React deve controlar estado de aplicação. CSS deve controlar hover e estados visuais simples. GSAP
deve ser usado quando o efeito exigir elasticidade, sequência, scroll, cursor ou interação contínua.
Quando CSS e GSAP precisarem transformar uma mesma composição, usar um wrapper interno ou variáveis
CSS para separar as responsabilidades.
