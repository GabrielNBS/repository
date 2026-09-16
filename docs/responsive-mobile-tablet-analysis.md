# Análise responsiva — mobile, tablet e detalhes de projeto

## Direção adotada

O desktop continua sendo a versão de maior imersão: ele pode usar pin, parallax,
hover, cursor contextual, shader e a transformação 3D do manifesto. Em telas
touch, a prioridade muda para leitura, orientação e controle direto. A rolagem
volta a ser nativa e cada informação importante permanece disponível sem depender
de hover, drag, flip ou WebGL.

Há dois critérios independentes:

- **largura**: reorganiza colunas, títulos e densidade;
- **capacidade de interação**: `pointer: coarse` desativa experiências pensadas
  exclusivamente para mouse mesmo quando um tablet está em landscape.

`prefers-reduced-motion` usa a mesma composição estática de touch, mantendo o
conteúdo completo e removendo somente a coreografia decorativa.

## Matriz de comportamento

| Área | Desktop | Tablet | Mobile | Reduced motion / touch |
| --- | --- | --- | --- | --- |
| Navegação | Pílula compacta com links | Pílula com links se houver espaço | Menu expansível com alvos de 44px+ | Sem mudança estrutural |
| Hero | Loader, nome em letras, manifesto expandível e handoff para projetos | Hero mais contido, sem depender de hover | Nome estático após entrada curta + cartão manifesto estático | Sem loader/coreografia longa; cartão estático |
| Manifesto | Cena pinada com MorphSVG, MotionPath e progressão por atos | Conteúdo em fluxo quando touch | Três atos empilhados na página | Três atos empilhados |
| Projetos | Agenda vertical de cases, shader e elastic hover | Agenda pode colapsar para uma leitura mais linear | Cabeçalho editorial + cards em fluxo | Cards em fluxo |
| Cursor | Cursor contextual por projeto | Não é requisito | Removido | Removido |
| Skills | Track horizontal pinado, vídeo ativo e navegação por etapa | Track só permanece se o dispositivo for fine pointer | Cards em lista, descrição sempre visível | Cards em lista, vídeos pausados/substituídos visualmente |
| Detalhe — hero | Grid editorial, parallax sutil e visual grande | Grid colapsa progressivamente | Título quebra, metadados em duas colunas e visual vertical | Entrada estática |
| Detalhe — decisões | `ScrollSplitCard` de 500vh com separação e flip | Mantido apenas quando houver fine pointer | Três cartões estáticos legíveis | Três cartões estáticos |
| Detalhe — ações | Ações lado a lado | Quebra conforme espaço | Botões em coluna, altura mínima de toque | Sem mudança estrutural |
| Shader | Atmosfera WebGL lazy | Pode permanecer em ponteiro fino | Fallback CSS, sem canvas | Fallback CSS |

## Home

### Navegação

O menu móvel já usa um botão semântico com `aria-expanded`, `aria-controls` e
fechamento por `Escape`. A adaptação preserva a posição fixa, a largura segura e
os alvos de toque. O menu não deve depender do cursor ou de estados de hover.

### Hero e manifesto embutido

O manifesto completo é uma cena de narrativa, não uma imagem de cartão. Reduzi-lo
para o tamanho do cartão do hero fazia os textos dos três atos ficarem ilegíveis
e introduzia uma segunda rolagem conceitual dentro da primeira seção.

No mobile/tablet touch, o hero usa um único cartão editorial estático com a tese
“Começa com uma decisão.”. O manifesto completo continua disponível mais abaixo,
em fluxo natural, com os três atos visíveis. Assim, a primeira dobra mantém a
identidade do desktop sem sacrificar compreensão.

### Projetos

Esconder a agenda inteira no mobile removia contexto — o visitante via o primeiro
card sem saber que estava entrando na seleção recente. A versão responsiva agora
preserva o cabeçalho, o título e uma descrição curta, depois apresenta todos os
cards em fluxo vertical.

O shader é decorativo e não muda o significado do projeto. Em ponteiro coarse ele
é substituído pelas formas CSS do `ProjectVisual`, reduzindo custo de GPU, consumo
de bateria e risco de jank durante a rolagem.

### Sobre

O retrato-monograma, o título e as especialidades já possuem uma boa composição
vertical. O comportamento recomendado é manter o bloco visual antes do texto,
limitar a medida do parágrafo e deixar as tecnologias quebrarem em linhas sem
scroll horizontal.

### Skills

No desktop, o deslocamento horizontal comunica “camadas” e faz sentido com mouse
ou rolagem vertical pinada. Em touch, cada habilidade deve ser uma unidade
independente: título, visual, descrição e navegação ficam no fluxo. A descrição
não pode depender de o card estar ativo.

Os vídeos são mídia decorativa. Se a reprodução não for confiável ou custosa em
mobile, o card deve manter sua cor, numeração e tipografia como fallback suficiente
— nunca deixar uma área vazia ou bloquear o conteúdo.

### Contato e rodapé

O formulário mantém label visível, input nativo, feedback `aria-live` e botão com
48px. No mobile, o campo ocupa a largura disponível e o botão permanece separado
do texto para evitar toques acidentais. O rodapé quebra em coluna sem esconder o
retorno ao topo.

## Páginas de detalhe

Todas as rotas `/projetos/[slug]` usam o mesmo contrato de dados. As diferenças
entre Regula, E-Food, E-Play, To-Do, Spider-Verse, Clone Disney+, Hoje Tá Doce e
WhatsApp Sender devem aparecer em nome, descrição, tom, visual, stack e links —
não em interações diferentes que o usuário precise reaprender.

### Hero do case

O título usa quebra responsiva e largura máxima no mobile. Isso é especialmente
importante para “WhatsApp Sender”, que antes mantinha `white-space: nowrap` e
criava overflow horizontal. A descrição fica abaixo do título, os metadados usam
duas colunas e o visual ocupa a largura útil com altura baseada no conteúdo.

### Recorte funcional

O flip 3D de três painéis é expressivo no desktop, mas em mobile cada painel ficava
com cerca de um terço da largura e a cena consumia 500vh. A versão touch mostra os
mesmos três conteúdos em cartões empilhados, na ordem “O desafio”, “A solução” e
“O que ficou”, seguida por chips de tecnologia que exibem nome e ícone.

Isso mantém a narrativa, mas troca uma interação espacial por uma leitura que
funciona com scroll, teclado, leitor de tela e orientação vertical.

### Ações e retorno

“Ver projeto” e “Código” permanecem sempre visíveis depois do conteúdo. Em telas
estreitas, os botões ocupam uma coluna e mantêm altura mínima de toque. O link de
volta continua fixo no topo para reduzir custo de navegação após uma leitura longa.

## Critérios de aceite

- zero scroll horizontal em 375px, 390px e 768px;
- títulos longos quebram sem corte, em especial `whatsapp-sender`;
- nenhum conteúdo essencial depende de hover, cursor, flip ou vídeo;
- a narrativa do detalhe não cria um trecho artificial de 500vh em touch;
- cards e botões têm área de toque mínima de 44px;
- `prefers-reduced-motion` mostra conteúdo completo em fluxo normal;
- shaders não são montados em ponteiro coarse;
- desktop preserva as cenas pinadas e interações existentes;
- lint, TypeScript e build continuam passando.
