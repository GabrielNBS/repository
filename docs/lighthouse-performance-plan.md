# Plano de performance orientado pelo Lighthouse

Data da auditoria: 29/09/2026

## Escopo e metodologia

- Build de produção com Next.js 16.2.10 (`npm run build` + `next start`).
- Lighthouse 13.5.0 em Chrome headless.
- Home: três execuções mobile válidas; os valores abaixo usam a mediana.
- Home desktop: uma execução de referência.
- Página representativa de projeto: `/projetos/regula`, execução mobile válida.
- A estabilidade visual também foi conferida com `PerformanceObserver` em desktop e mobile, com cache frio, rede limitada e CPU 4x.
- Relatórios definitivos: `output/lighthouse/home-mobile-valid.json`, `output/lighthouse/home-mobile-valid-2.json`, `output/lighthouse/mobile.json`, `output/lighthouse/desktop.json` e `output/lighthouse/project-regula-mobile-valid.json`.

O Lighthouse concluiu as coletas e gravou os relatórios, mas o launcher do Chrome retornou `EPERM` ao tentar apagar seu diretório temporário no Windows. Esse erro aconteceu após a gravação dos JSONs e não afetou as medições. Relatórios de projeto anteriores a `project-regula-mobile-valid.json` foram descartados porque os chunks CSS daquela sessão ficaram indisponíveis durante a execução.

## Baseline

| Rota e perfil | Score | FCP | LCP | TBT | CLS | TTI | Transferência | Main thread |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home mobile, mediana de 3 | 65 | 1,08 s | 4,70 s | 729 ms | 0,001 | 5,36 s | 10,12 MiB | 4,65 s |
| Home desktop | 86 | 0,30 s | 0,83 s | 313 ms | 0,005 | 1,33 s | 10,36 MiB | 1,63 s |
| Projeto Regula mobile | 92 | 0,92 s | 2,20 s | 310 ms | 0 | 3,50 s | 0,90 MiB | 2,90 s |

O servidor e a estabilidade geométrica não são os gargalos atuais. O documento raiz respondeu em cerca de 10–55 ms e o CLS válido permaneceu próximo de zero. As prioridades são a entrada bloqueante da home, o volume de mídia e o custo de JavaScript/layout no thread principal.

## Diagnóstico

### P0 — A entrada da home bloqueia conteúdo útil

`features/portfolio/sections/hero/heroMotion.ts` espera simultaneamente o preload de mídia e um atraso visual fixo de 3 segundos. Nesse período, o loader ocupa a tela e se torna o candidato de LCP. Nas execuções mobile, isso levou o LCP até 4,70 s na mediana e o TTI até 5,36 s.

`features/portfolio/shell/entryAssets.ts` também baixa oito imagens e metadados de dois vídeos antes de liberar a entrada. Esses arquivos são requisitados pelas URLs originais de `public/`, contornando a otimização de imagens do Next e duplicando parte do tráfego.

### P0 — Imagens representam praticamente todo o peso inicial

Na home mobile, 10,30 MB de 10,61 MB de transferência observada em uma das execuções eram imagens. Os maiores downloads antecipados foram:

- retrato editorial: aproximadamente 2,40 MiB;
- três bolas do loader: aproximadamente 1,39–1,51 MiB cada nas URLs originais;
- arte editorial do hero: aproximadamente 1,54 MiB;
- fundo de papel do hero: aproximadamente 1,24 MiB.

Além das versões originais, o loader solicita versões do `next/image` com largura de 1920 px para elementos exibidos com aproximadamente 64 px. O Lighthouse estimou cerca de 305 KiB de economia apenas ao servir tamanhos responsivos adequados para essas três imagens.

### P1 — Trabalho excessivo no thread principal

Na mediana mobile, a home consumiu 4,65 s de main thread. Uma execução representativa separou aproximadamente 2,28 s em Style & Layout e 1,71 s em avaliação de scripts. O Lighthouse também registrou reflow forçado de aproximadamente 422 ms e estimou 50 KiB de JavaScript não utilizado na carga inicial.

A home inteira nasce dentro de uma árvore cliente (`PortfolioHome`) e registra GSAP, ScrollTrigger, SplitText, Observer e motion de seções abaixo da dobra logo na hidratação. Há ainda chamadas de `ScrollTrigger.refresh()` em diferentes módulos, ampliando leituras de layout durante a entrada.

### P1 — A rota de projeto ainda inicia vídeo e JavaScript cedo

A rota de projeto já está muito mais leve, mas transfere aproximadamente 473 KiB do teaser WebM na carga inicial. O Lighthouse apontou 162 KiB de JavaScript potencialmente não utilizado, TBT de 310 ms e 2,90 s de trabalho de main thread. O poster pode ser o LCP estável; o vídeo não precisa disputar a janela crítica.

## Plano de execução

### Etapa 1 — Remover o bloqueio artificial e o preload duplicado

Arquivos principais:

- `features/portfolio/sections/hero/heroMotion.ts`
- `features/portfolio/shell/entryAssets.ts`
- `features/portfolio/sections/hero/HeroSection.tsx`

Ações:

1. Remover o atraso fixo de 3 segundos e impedir que a exibição do conteúdo dependa de imagens, vídeos ou `document.fonts.ready` abaixo da dobra.
2. Tornar o loader uma animação não bloqueante, curta e descartável, ou substituí-lo por uma entrada do hero que mantenha o conteúdo significativo pintado desde o primeiro frame.
3. Eliminar o preload por `new Image()` das URLs originais. Se ainda houver um recurso realmente crítico, carregá-lo uma única vez pelo markup, com prioridade explícita e URL otimizada.
4. Não pré-carregar retrato, posters e vídeos de seções futuras. Deixar esses recursos sob a estratégia lazy/in-view já existente.
5. Garantir que o loader nunca seja o elemento de LCP e que não mantenha `body` travado após a primeira pintura útil.

Critérios de aceite:

- home mobile com LCP <= 2,5 s;
- home mobile com transferência inicial <= 1,5 MiB;
- nenhum PNG original da lista de `entryAssets` baixado antes de sua seção entrar na janela de carregamento;
- nenhuma espera de duração fixa no caminho de entrada.

### Etapa 2 — Entregar mídia no tamanho e no momento corretos

Arquivos principais:

- `features/portfolio/sections/hero/HeroSection.tsx`
- `features/portfolio/projects/ProjectTeaser.tsx`
- `features/portfolio/sections/about/AboutPortraitSequence.tsx`
- ativos em `public/images/` e `public/videos/`

Ações:

1. Criar variantes pequenas das bolas do loader, próximas do maior tamanho real de exibição, ou definir `sizes` preciso no `next/image`. Apenas o recurso visual que puder ser LCP deve receber prioridade alta.
2. Converter imagens decorativas usadas diretamente por CSS/JavaScript para AVIF/WebP dimensionados, ou renderizá-las com `next/image` quando isso preservar a composição.
3. Manter poster responsivo como primeira pintura dos teasers. Usar `preload="none"` para vídeo e iniciar o download apenas após interseção, idle ou intenção do usuário.
4. Na página de projeto, não usar o WebM como recurso crítico de LCP. Exibir o poster imediatamente e ativar autoplay depois da janela crítica.
5. Auditar a sequência de retratos após scroll: limitar frames simultâneos, resolução e memória decodificada; considerar sprite, vídeo curto ou canvas se o custo agregado continuar alto.

Critérios de aceite:

- economia de imagem apontada pelo Lighthouse abaixo de 30 KiB;
- rota de projeto mobile com transferência inicial <= 500 KiB antes do início do vídeo;
- nenhum vídeo abaixo da dobra transferido na navegação inicial da home;
- ausência de regressão visual em 412, 768, 1280 e 1920 px.

### Etapa 3 — Reduzir hidratação, JS inicial e reflows

Arquivos principais:

- `features/portfolio/shell/PortfolioHome.tsx`
- `features/portfolio/shell/portfolioHomeMotion.ts`
- motions em `features/portfolio/sections/**`
- `features/portfolio/shared/motion/headingSplitMotion.ts`

Ações:

1. Mover markup estático para Server Components e reduzir as fronteiras `use client` a controles e motion que realmente dependem do navegador.
2. Inicializar motion de seções abaixo da dobra apenas quando se aproximarem da viewport, com import dinâmico por seção quando o ganho de chunk justificar.
3. Evitar registrar SplitText, Observer e ScrollTrigger no caminho crítico quando não são usados acima da dobra.
4. Centralizar e agrupar `ScrollTrigger.refresh()`. Separar leituras e escritas de layout e impedir refresh redundante durante hidratação e carregamento de mídia.
5. Revisar animações de texto acima da dobra; preferir estrutura estável no HTML e transform/opacity sem reescrever o conteúdo após a primeira pintura.

Critérios de aceite:

- TBT mobile <= 200 ms na home e na página de projeto;
- trabalho de main thread <= 2,5 s na home mobile;
- reflow forçado <= 50 ms;
- JavaScript não utilizado estimado <= 20 KiB na home e <= 50 KiB na rota de projeto;
- CLS <= 0,1 em todas as rotas representativas.

### Etapa 4 — Criar uma barreira contra regressão

Ações:

1. Executar Lighthouse CI em build de produção e usar a mediana de três execuções mobile.
2. Adotar budgets numéricos, mais estáveis que o score isolado:
   - LCP <= 2,5 s;
   - TBT <= 200 ms;
   - CLS <= 0,1;
   - home <= 1,5 MiB na carga inicial;
   - rota de projeto <= 500 KiB antes do vídeo.
3. Adicionar um fluxo de auditoria com scroll até Projetos, Sobre e Skills para capturar mídia tardia, memória e long tasks que o Lighthouse de navegação não cobre.
4. Coletar Web Vitals reais em produção, principalmente LCP, CLS e INP, e comparar p75 mobile com a baseline de laboratório.

## Ordem recomendada

1. Etapa 1: maior impacto e menor risco; resolve o atraso artificial e a duplicação de downloads.
2. Etapa 2: reduz bytes e tira mídia não essencial da janela crítica.
3. Reexecutar três Lighthouse mobile. Se TBT continuar acima de 200 ms, avançar para a Etapa 3 com trace de performance antes/depois.
4. Etapa 4 após estabilizar as metas, para impedir regressões.

## Meta de saída

O objetivo não é apenas elevar o score. A entrega é considerada concluída quando a home deixa de atrasar conteúdo real, a carga inicial cai para menos de 1,5 MiB, LCP/TBT entram na faixa verde em três execuções consecutivas e a experiência visual continua equivalente com movimento normal e reduzido.
