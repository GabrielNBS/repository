# Auditoria completa de arquitetura, estilização, lógica e mídia

Data: 30/09/2026  
Escopo: aplicação Next.js, todas as seções do portfólio, estilos, animações, dados, imagens, vídeos e validação de produção.

## Resumo executivo

A base do projeto é consistente: as seções estão organizadas por funcionalidade, os estilos usam CSS Modules e os dados de projetos já ficam separados da maior parte da renderização. A principal divergência arquitetural estava nos limites entre Server Components e Client Components: páginas inteiras eram promovidas para o cliente apenas para hospedar referências de animação e contexto de cursor.

A auditoria corrigiu esses limites, estabilizou o contexto do cursor, retirou o pré-carregamento bruto de mídias públicas, removeu a espera artificial de três segundos na entrada e impediu que vídeos disputassem rede com os pôsteres. A transferência inicial da página inicial caiu de aproximadamente 10,12 MiB no levantamento anterior para 402 KiB no teste final, uma redução aproximada de 96%. O JavaScript estático total do build caiu 42.056 bytes, cerca de 3,7%.

O principal débito remanescente é CPU no celular: a página inicial ainda entrega uma quantidade relevante de JavaScript de animação, e o Lighthouse final registrou TBT de 910 ms. Portanto, o ganho de rede foi expressivo, mas a próxima rodada deve priorizar carregamento progressivo das animações abaixo da dobra.

## Metodologia

- Inventário da árvore do projeto, rotas, seções, componentes, hooks, dados, estilos e arquivos públicos.
- Leitura dos limites de renderização, dependências entre camadas e pontos de entrada de animação.
- Validação estática com ESLint, TypeScript e build de produção.
- Testes visuais e funcionais em desktop e celular, incluindo páginas de detalhe.
- Lighthouse em produção local para página inicial e detalhe de projeto.
- Inventário de mídia por extensão, uso direto no código, tamanho, dimensões, duração, contêiner e duplicidade por hash.
- Simulação de recompressão PNG lossless com comparação do conteúdo decodificado pixel a pixel por SHA-256.

## Modelo arquitetural esperado

O projeto deve seguir a direção abaixo:

1. **Conteúdo e contratos:** tipos, textos e referências de mídia, sem depender de componentes visuais.
2. **Lógica e comportamento:** hooks e módulos de movimento, responsáveis por estado, eventos e animação.
3. **Apresentação:** componentes e CSS Modules, responsáveis por estrutura semântica e aparência.
4. **Composição e renderização:** páginas e componentes de montagem, preferencialmente no servidor, que apenas conectam conteúdo, comportamento e apresentação.

## Alterações aplicadas

### Limites entre servidor e cliente

- `PortfolioHome` passou a ser uma composição de servidor.
- Foi criado `PortfolioExperience`, um limite cliente pequeno que contém apenas o contexto interativo, a referência do elemento principal e a inicialização das animações.
- `ProjectDetail` passou a ser uma composição de servidor.
- Foi criado `ProjectDetailExperience`, que concentra a referência e o comportamento cliente do detalhe.

Isso evita transformar toda a árvore estática em Client Component por causa de uma pequena necessidade interativa.

### Contexto e lógica de cursor

- As funções de entrada e saída do cursor foram estabilizadas com `useCallback`.
- O valor do contexto foi estabilizado com `useMemo`.
- Os callbacks retornados pelo hook de movimento também ficaram estáveis.

Isso reduz atualizações de contexto e rerenderizações desnecessárias durante interações de ponteiro.

### Entrada, carregamento e responsividade

- O carregador deixou de requisitar oito imagens originais e dois metadados de vídeo diretamente de `/public`.
- A espera artificial fixa de três segundos foi removida.
- A entrada agora acompanha apenas imagens realmente marcadas e presentes no DOM, reutilizando as URLs otimizadas pelo Next Image, além das fontes.
- O carregador ganhou estado inicial seguro e a versão móvel possui estado visual estático antes da hidratação.
- Imagens pequenas do carregador receberam `sizes` coerentes com sua exibição.
- Elementos gráficos relevantes da entrada foram marcados explicitamente; os demais permanecem lazy.
- O rótulo acessível do elemento gráfico dinâmico foi corrigido com papel semântico adequado.

### Vídeos dos projetos

- Vídeos de detalhes prioritários deixaram de montar imediatamente e aguardam 900 ms para dar preferência ao pôster e ao conteúdo principal.
- Vídeos não prioritários continuam dependendo de proximidade da viewport.
- O pôster permanece imediatamente disponível.

### Acessibilidade

- O uso proibido de `aria-label` em elemento sem papel semântico foi corrigido.
- Os links de projeto e código agora têm rótulos que preservam o texto visível e acrescentam a informação de nova guia.
- O Lighthouse final da página inicial registrou acessibilidade 100.

## Achados por prioridade

### P0 — comportamento funcional

1. **O formulário de contato não envia dados.** A interface muda para “Recebido”, mas não existe chamada de rede, persistência nem integração de e-mail. Isso pode comunicar sucesso sem que a mensagem tenha sido entregue. A correção exige escolher o canal de entrega e sua política de falha; por isso não foi implementada silenciosamente nesta auditoria.

### P1 — desempenho e arquitetura

1. **Custo de CPU da página inicial.** O Lighthouse final registrou TBT de 910 ms. Módulos GSAP de seções abaixo da dobra ainda entram no pacote inicial. Recomendação: carregar as animações de Manifesto, Projetos, Sobre, Skills e Contato quando a seção se aproximar da viewport, mantendo apenas Hero e navegação no caminho inicial.
2. **Arquivos de movimento extensos.** `manifestoMotion`, `heroMotion` e `skillsMotion` acumulam muitas responsabilidades e regras responsivas. Devem ser separados em preparação de estado, construção de timeline e integração de ScrollTrigger.
3. **Mudança de breakpoint durante a sessão.** Parte da lógica responsiva de Skills é escolhida no momento da montagem. Redimensionar a janela atravessando 800 px pode preservar listeners ou configurações da ramificação anterior. Recomendação: usar `gsap.matchMedia()` para criar e limpar cada variante.
4. **Metadados de produção.** Se a variável de URL pública não estiver configurada, canonical, sitemap e robots podem usar `localhost`. A URL real de produção deve ser obrigatória no pipeline de deploy.

### P2 — organização e manutenção

1. **Conteúdo de projetos concentrado.** `projects.ts` combina contratos, textos, links, pôsteres e fontes de vídeo. Separar tipos, catálogo de conteúdo e mapa de mídia reduziria acoplamento e facilitaria validação.
2. **CSS Modules grandes.** Os módulos de Hero, Manifesto, Projects, Skills e ProjectDetail misturam estrutura, variações responsivas e estados de animação. A organização é válida, mas a manutenção melhora se cada subcomponente ou bloco visual possuir seu próprio módulo.
3. **Tokens incompletos.** Existem variáveis globais úteis, porém ainda há cores, espaçamentos, raios e medidas repetidos diretamente nos módulos. Recomendação: promover apenas os valores realmente semânticos e recorrentes, sem criar uma camada de tokens abstrata demais.
4. **Dependência sem uso.** `ogl` não foi encontrado em imports da aplicação. Deve ser removido após confirmar que não existe experimento futuro dependente dela.
5. **Tailwind sem uso de utilitários.** A cadeia Tailwind participa do CSS global, mas não foram encontrados utilitários na marcação. A remoção pode reduzir complexidade, porém exige preservar explicitamente o reset e as regras globais hoje fornecidas por essa cadeia.

### P3 — resiliência e acabamento

1. Não existem páginas próprias para `not-found`, `error` e estados de carregamento. Os fallbacks do framework funcionam, mas não seguem a identidade visual do projeto.
2. A navegação mede retângulos das seções durante rolagem. Está protegida por `requestAnimationFrame`, mas `IntersectionObserver` pode simplificar a seleção de seção ativa.

## Auditoria de mídia

### Inventário

| Grupo | Arquivos | Tamanho |
| --- | ---: | ---: |
| Total em `public` | 123 | 139,10 MiB |
| Referenciados diretamente pela aplicação | 97 | 87,51 MiB |
| Não referenciados diretamente | 26 | 51,59 MiB |
| PNG | 94 | 111,55 MiB |
| MP4 | 13 | 9,72 MiB |
| WebM | 7 | 13,09 MiB |
| WebP | 7 | 1,02 MiB |
| PDF | 1 | 3,73 MiB |
| SVG | 1 | menos de 1 KiB |

“Não referenciado diretamente” significa ausência nas referências estáticas encontradas em `app` e `features`; não significa autorização para exclusão. Esses arquivos podem ser arquivo-fonte, histórico visual ou conteúdo futuro.

### Compressão PNG sem perda

Foi realizada uma simulação com compressão máxima lossless, sem substituir os arquivos. A igualdade foi validada pelo hash SHA-256 dos pixels decodificados antes e depois.

| Grupo | Antes | Depois | Economia | Integridade |
| --- | ---: | ---: | ---: | --- |
| PNGs usados | 62.868.538 B | 57.898.476 B | 4.970.062 B (7,9%) | 68/68 idênticos |
| PNGs não usados | 54.100.693 B | 52.371.882 B | 1.728.811 B (3,2%) | 26/26 idênticos |
| Total | 116.969.231 B | 110.270.358 B | 6.698.873 B (5,73%) | 94/94 idênticos |

A substituição não foi aplicada. As imagens usadas passam pelo otimizador do Next em tempo de execução/build, então recompactar apenas o contêiner PNG original produziria uma alteração binária grande no repositório com benefício inicial pequeno. A maior melhoria real veio de impedir o preload dos originais.

### Vídeos

- Todos os MP4 analisados já possuem o átomo `moov` no início, condição adequada para início progressivo.
- Os vídeos de projeto têm 1440 × 1000 e duração aproximada de 10,8 s; o vídeo de Skills tem 720 × 720 e 10 s.
- Em todos os pares disponíveis, o WebM é maior que o MP4. Trocar a ordem de preferência pode reduzir bytes em alguns navegadores, mas alteraria codec e potencialmente a aparência. Sob o requisito de zero perda de qualidade, a troca não foi aplicada sem validação visual controlada.
- Remux lossless não apresentou oportunidade material de redução.

### Duplicidades e arquivos suspeitos

- `images/about/front-end-collage-paper-bg.png` é idêntico a `images/hero/front-end-collage-paper-bg.png`.
- `mockups/e-play/desktop-03.png` é idêntico a `mockups/e-play/mobile-01.png`; os nomes sugerem que vale confirmar se a duplicidade é intencional.
- `images/hero/title-elements/animam-frame-01.png` é idêntico a `images/hero/title-elements/animam.png`.
- Foram encontrados 26 PNGs sem referência direta, principalmente variações antigas de About, Contact e elementos de título. Nenhum foi apagado porque isso seria destrutivo e parte deles pode representar arquivo de design.

## Medições de produção

Os números abaixo foram coletados em build de produção local. Lighthouse varia entre execuções; o levantamento anterior era uma mediana, enquanto o resultado final abaixo é uma execução de verificação.

### Página inicial — celular

| Métrica | Levantamento anterior | Verificação final |
| --- | ---: | ---: |
| Performance | 65 | 63 |
| Acessibilidade | — | 100 |
| Boas práticas | — | 100 |
| SEO | — | 100 |
| FCP | 1,08 s | 1,1 s |
| LCP | 4,70 s | 4,4 s |
| TBT | 729 ms | 910 ms |
| CLS | 0,001 | 0 |
| Transferência | 10,12 MiB | 402 KiB |
| Main thread | 4,65 s | 4,7 s |

Interpretação: rede e estabilidade melhoraram de forma substancial, mas o score continua limitado pelo custo de execução das animações. O TBT deve ser tratado como próximo objetivo, não mascarado pelo ganho de transferência.

### Detalhe Regula — celular

| Métrica | Faixa observada em duas verificações |
| --- | ---: |
| Performance | 86–91 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |
| FCP | 0,9–1,9 s |
| LCP | 1,9–2,8 s |
| TBT | 260–480 ms |
| CLS | 0 |
| Transferência | 892 KiB |

A última execução também confirmou que a auditoria `label-content-name-mismatch` não possui elementos com falha após a correção dos rótulos de links.

### Pacote estático

- Antes: 1.138.059 B de JavaScript.
- Depois: 1.096.003 B de JavaScript.
- Redução: 42.056 B, aproximadamente 3,7%.
- CSS permaneceu em 95.318 B não comprimidos no conjunto de chunks medido.

## Verificações executadas

- ESLint: aprovado.
- TypeScript sem emissão: aprovado.
- Build de produção: aprovado.
- Desktop 1440 × 900: sem overflow horizontal e entrada concluída.
- Celular 390 × 844: sem overflow horizontal, conteúdo visível antes da hidratação e carregador oculto.
- Detalhes Regula e WhatsApp Sender: conteúdo, pôster, título e layout verificados.
- Regula: nenhum vídeo no instante inicial; vídeo montado e reproduzido após a prioridade do pôster.
- Console das páginas testadas: sem erros ou avisos.

## Próximas ações recomendadas

1. Implementar uma entrega real para o formulário de contato, com estado de erro, confirmação verificável e proteção contra abuso.
2. Dividir e carregar sob demanda os módulos GSAP abaixo da dobra para reduzir TBT.
3. Migrar Skills para `gsap.matchMedia()` e validar redimensionamento cruzando o breakpoint.
4. Tornar a URL pública obrigatória no deploy.
5. Confirmar e remover dependências e mídias não usadas em uma alteração separada e recuperável.
6. Executar uma rodada visual controlada para decidir se MP4 pode preceder WebM sem diferença perceptível.
7. Reavaliar a divisão dos grandes módulos de movimento e CSS por subcomponente.

## Observação sobre arquivos preexistentes

As alterações que já estavam presentes nos arquivos de Contact, Projects, navegação e na imagem `contact-binocular-family-v3.png` foram tratadas como trabalho do proprietário e preservadas. Elas não são apresentadas neste documento como mudanças produzidas pela auditoria.
