# Estudos temporários — ProjectDetail

Cinco direções visuais isoladas, todas usando os tokens e todos os dados do case Regula como amostra. Cada HTML utiliza o `prototype-runtime.js` temporário para compartilhar o mesmo conjunto completo de dados e não participa do build da aplicação.

1. `01-editorial-fold.html` — narrativa editorial com hero tipográfico e leitura vertical.
2. `02-film-strip.html` — case como sequência cinematográfica em fotogramas.
3. `03-swiss-archive.html` — grade modular de arquivo, mais sóbria e objetiva.
4. `04-split-depth.html` — composição em dois planos com profundidade e resposta ao cursor.
5. `05-notebook-mosaic.html` — mosaico de blocos para um case mais tátil e técnico.

Cada estudo contém hero, narrativa (contexto, desafio e solução), seis capturas (desktop e mobile), destaques, ficha técnica, tecnologias, CTAs e encerramento. Os movimentos usam GSAP Core, apenas `transform`/`autoAlpha`, revelação por seção e feedback de hover; desligam quando `prefers-reduced-motion` está ativo.
