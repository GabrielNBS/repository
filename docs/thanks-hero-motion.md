# Thanks — engenharia reversa da hero

Fonte observada: [thanks.co](https://www.thanks.co/), em 28/09/2026.

## O que a raspagem revelou

A composição não é um H1 com uma string sendo trocada. O site mantém três
linhas dentro de um viewport com overflow hidden:

1. The best way to;
2. Say Thanks;
3. uma linha horizontal com as frases For ordering, For subscribing,
   For visiting, For following e For paying.

Durante a entrada, a primeira e a segunda linha começam em translateY(100%)
com opacidade zero e entram separadamente na viewport. A terceira linha já
está em sua posição natural, mas permanece invisível. Depois de uma pausa,
começa a timeline vertical contínua: a primeira linha sai para cima, a segunda
ocupa o primeiro lugar e a terceira sobe para o segundo. Ao fim da sequência
horizontal, a timeline desce as linhas de volta para translateY(0): a primeira
reaparece, a segunda retorna ao segundo lugar e a terceira é ocultada. O
repeat acontece dentro da mesma timeline, com repeatDelay de 1 segundo, sem
reposicionamento abrupto fora do fluxo.

A box recortada exibe duas linhas, mas tem altura extra suficiente para que a
terceira atravesse o limite sem cortar a composição no centro. Cada linha tem
seu próprio tween de y/opacidade, coordenado pelos mesmos marcadores verticais.

Cada frase horizontal usa a mesma largura de composição e fica sobreposta às
demais. A frase ativa está em xPercent: 0; a próxima entra em xPercent: 90 e a
anterior sai em xPercent: -90, com fade cruzado.

O local onde um caractere foi substituído por um sticker é um slot separado.
No estado inativo, o slot tem width: 0%; na entrada da frase ativa, cresce para
aproximadamente 6.75% da linha. O sticker interno entra de
rotate(45deg) scale(0) para rotate(0deg) scale(1), com uma curva elástica.
Na troca, a frase seguinte entra primeiro com o slot fechado. Quando ela chega
ao centro, o slot anima de 0% para 6.75% e o sticker surge dentro dele, fazendo
o prefixo e o sufixo se afastarem por reflow real. Os slots das frases já
exibidas permanecem abertos durante a volta; eles retornam aos valores iniciais
quando a timeline repetida reinicia a sequência.

Say Thanks também possui um slot próprio, sem uma letra oculta. No fechamento
da sequência horizontal, quando as linhas descem para o estado inicial, esse
slot abre e o smiley aparece ao lado de Say Thanks. No começo da repetição
seguinte, ele se retrai enquanto a primeira linha sai novamente. É esse
detalhe que faz a linha estática participar de todos os ciclos, e não só da
animação de entrada.

## Reprodução neste projeto

- HeroSection.tsx renderiza as três linhas, os slots de caractere, SVGs locais
  representativos, a grade de logos e o overlay de carregamento.
- HeroSection.module.css mantém o viewport recortado e posiciona cada linha em
  uma faixa independente. O loader é fixed, cobre o primeiro paint e só some
  depois que o conteúdo deixa de estar em estado de carregamento.
- entryAssets.ts pre-carrega imagens, metadados de vídeo e fontes, atualizando
  o percentual exibido no loader e usando um limite de segurança de 9 segundos.
- heroMotion.ts coordena a entrada, o loop de frases e a liberação do loader
  com timelines GSAP separadas.

O carregamento mantém uma duração mínima de 3 segundos para preservar o ritmo
editorial da referência mesmo quando os assets chegam do cache. Durante esse
intervalo, as três bolas do loader fazem uma onda independente. Na liberação,
elas encolhem e desaparecem primeiro; o overlay então perde opacidade e a
intro da hero começa atrás dele, eliminando o salto entre uma tela estática e
a animação.

Os SVGs são locais e representativos — não dependem dos assets privados/CDN do
site original. A estrutura de movimento é a mesma: yPercent para a promoção
vertical, xPercent para a troca horizontal, largura animada para a letra
substituída e scale/rotation para o sticker.

## Calibração visual (viewport de 1910 px)

Uma segunda comparação direta com a referência fixou as dimensões que sustentam
o movimento: viewport do título de 1200 px, trilho interno de 1040 px,
font-size de 160 px, line-height de 124.8 px, slot de 70.1875 px (6.75%) e
sticker de 150 px. As máscaras laterais têm 80 px; elas escondem a saída e a
entrada horizontal sem cortar a frase no centro. A faixa de logos usa pills de
126 × 63 px e começa 56 px abaixo da área reservada para ela.

Na versão local, esses valores são fluidos até o breakpoint, mas coincidem com
as medidas acima na largura de comparação. O loop também usa um ciclo fixo por
frase, evitando a pausa extra que existia entre a última e a primeira palavra;
o smiley pós-Say Thanks participa desse mesmo ciclo de retorno.

prefers-reduced-motion: reduce deixa a composição em um estado final estável,
com a primeira frase e seu sticker visíveis, sem loop contínuo.
