# Reauditoria de padrões de design e acessibilidade

Data: 01/10/2026  
Baseline: `docs/auditoria-design-system-2026-10-01.md`  
Escopo: página inicial, navegação, rodapé, todas as seções do portfólio e o template compartilhado pelas oito páginas de projeto.

## Resultado executivo

Os problemas funcionais e visuais prioritários da auditoria inicial foram corrigidos. O projeto agora possui uma fundação semântica para cores, espaçamento, containers, raios, camadas, fontes e entrelinhas; os componentes principais foram migrados para esses papéis; e os fluxos de contato e navegação comunicam corretamente o que fazem.

Avaliação heurística pós-correção: **8,6/10 — sistema consistente e governável, com exceções editoriais ainda locais**.

| Dimensão | Antes | Depois | Situação atual |
| --- | ---: | ---: | --- |
| Paleta e contraste | 8,5 | 9,2 | Placeholder corrigido para 5,57:1 e aliases semânticos adicionados. |
| Tipografia | 7,0 | 8,7 | Papéis de fonte e entrelinha formalizados; corpo ganhou leitura; títulos longos não quebram dentro da palavra. |
| Espaçamento e whitespace | 4,0 | 8,0 | Escala 4/8 px, gutter e larguras de conteúdo compartilhadas entre seções. |
| Layout e responsividade | 7,5 | 8,8 | Sem overflow nos quatro viewports; contato cresce verticalmente; títulos dos oito projetos foram validados. |
| Acessibilidade | 7,0 | 8,8 | Erro inline programático, autocomplete, alvos confortáveis, `aria-current` mais preciso e conteúdo funcional não recortado. |
| Copy e feedback | 6,0 | 9,0 | O contato não promete envio: abre um rascunho e explica que nada é enviado automaticamente. |
| Governança de tokens | 4,5 | 8,0 | Fundação central criada e aplicada; valores locais permanecem apenas onde a composição demanda contexto próprio. |

> A nota é uma avaliação heurística de produto e implementação. Não representa certificação de conformidade WCAG.

## Correções aplicadas

### 1. Contato e feedback

- Removida a confirmação falsa de envio.
- O formulário valida o endereço e abre um rascunho real via `mailto:` para `gabrielnbs.dev@gmail.com`.
- A interface informa explicitamente que nada é enviado automaticamente.
- Adicionados `autocomplete="email"`, `inputmode="email"`, `aria-invalid`, mensagem de erro associada e `role="alert"`.
- O ícone textual foi substituído por ícone vetorial com nome acessível no botão.

### 2. Contraste

- Criado `--color-text-placeholder`, atualmente apontando para `--color-muted`.
- Contraste medido do placeholder sobre o fundo paper: **5,57:1**, acima do mínimo AA de 4,5:1 para texto normal.
- Criados aliases semânticos para canvas, texto primário e secundário, bordas, superfícies, sombras, foco e erro.

### 3. Títulos dos projetos

- Wrappers de palavra passaram a preservar `white-space: nowrap`.
- A escala desktop foi ajustada ao espaço real da coluna.
- Nomes com partes longas recebem uma variante compacta sem reduzir a escala mobile.
- Regula, E-Food, E-Play, To-Do, Spider-Verse, Clone Disney+, Hoje Tá Doce e WhatsApp Sender foram verificados; nenhum divide caracteres dentro da palavra.

### 4. Fundação de tokens

Foram adicionados em `app/globals.css`:

- escala `--space-*` de 4/8 px;
- `--gutter-page`, `--content-reading`, `--content-wide` e `--nav-clearance`;
- `--radius-sm/md/lg/xl/pill/round`;
- camadas globais de underlay, base, conteúdo, navegação, elementos flutuantes, cursor, overlay e loader;
- papéis `--font-display`, `--font-body` e `--font-label`;
- papéis de entrelinha e tracking;
- tokens semânticos de cor, borda, superfície, sombra, foco e erro.

As seções Contact, Project Detail, Nav, Projects, About, Skills, Manifesto, Hero, Footer e os componentes de projeto foram migrados nos papéis recorrentes. Exceções de composição continuam locais quando não representam um padrão reutilizável.

### 5. Ritmo tipográfico e áreas interativas

- Texto introdutório de Sobre passou a `line-height: 1.5`.
- Descrições de habilidades passaram a `line-height: 1.45`.
- As abas de habilidades agora medem 44 px de altura em desktop.
- Os controles medidos na seção de contato em 390 px têm 48–57,6 px de altura; links têm 52 px.

### 6. Altura, recorte e espaçamento de texto

- Contato passou de `height: 100dvh` com recorte total para `min-height: 100dvh` com crescimento vertical.
- Em 320 × 568, a seção cresce para aproximadamente 707 px em vez de cortar o conteúdo.
- O eixo horizontal continua protegido com `overflow-x: clip`; o conteúdo funcional pode crescer no eixo vertical.

### 7. Copy, navegação e manutenção

- `aria-current="location"` substitui `page` na navegação entre âncoras.
- Quando deploy e repositório têm a mesma URL, apenas a ação “Repositório” é exibida.
- As classes obsoletas `.copy`, `.cta`, `.logoWall` e `.logoPill` foram removidas do Hero.
- O breakpoint isolado de 1050 px foi consolidado em 1024 px.

## Métricas pós-correção

- 17 arquivos CSS de produção, 3.986 linhas.
- 80 de 99 declarações de `font-size` usam a escala tipográfica: **80,8%**.
- 36 referências novas a tokens de espaço, gutter, container ou clearance nos papéis compartilhados.
- Ocorrências de cores literais/funções nos estilos de produção caíram de 97 para 86; 27 referências já usam os novos aliases semânticos.
- Seis tokens de raio e nove papéis de camada foram formalizados.
- Breakpoints ativos: 480, 600, 800/801, 900, 960 e 1024 px. A dupla 800/801 representa a mesma fronteira entre layouts compacto e amplo.

As contagens incluem definições globais e exceções artísticas. Por isso, quantidade de valores não deve ser confundida com quantidade de inconsistências.

## Validação executada

- `npm run lint`: aprovado.
- `npx tsc --noEmit`: aprovado.
- `npm run build`: aprovado; 13 rotas geradas e oito páginas de projeto pré-renderizadas.
- `git diff --check`: aprovado.
- Inspeção em 320 × 568, 390 × 844, 768 × 900 e 1440 × 900.
- Sem overflow horizontal nos viewports auditados.
- Sem erros ou avisos no console durante a navegação validada.
- Erro de e-mail exposto visualmente e na árvore acessível, com foco seguindo para o botão sem bloqueio.
- Spider-Verse medido em 1440 px: palavra com aproximadamente 257,7 px dentro do espaço disponível, sem quebra interna.

## Pontos residuais não bloqueantes

1. **Regressão visual automatizada:** a cobertura atual é manual. Recomenda-se salvar screenshots de referência para os quatro viewports e para os oito títulos.
2. **Teste assistivo real:** executar uma passada complementar com NVDA/VoiceOver e navegação exclusivamente por teclado antes de publicar uma declaração formal de acessibilidade.
3. **Tokens locais:** camadas numéricas internas e raios orgânicos ainda existem em cenas complexas. Eles são apropriados dentro de contextos de empilhamento isolados, mas devem ser documentados se forem reutilizados.
4. **Breakpoints:** CSS custom properties não são portáveis em media queries nativas. Se a base crescer, centralizar os valores no pipeline de CSS ou em documentação de arquitetura, sem criar abstração prematura.
5. **Formulário transacional:** `mailto:` é honesto e funcional, mas depende do cliente de e-mail do visitante. Um endpoint com estados loading/success/error pode ser adotado quando houver infraestrutura e política de tratamento de dados.

## Conclusão

O projeto deixou de depender apenas de coerência visual implícita e passou a ter uma fundação explícita para decisões recorrentes. Os achados P1 foram resolvidos, os principais achados P2 foram incorporados ao sistema e os refinamentos P3 mais relevantes foram aplicados. O restante é evolução de maturidade — automação de regressão, validação assistiva real e eventual backend de contato — e não uma inconsistência que bloqueie a publicação atual.
