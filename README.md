# Gabriel Nascimento — Portfólio

Portfólio pessoal em português, com direção visual editorial, ilustrações em papel e animações por scroll. Desenvolvido com Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, CSS Modules, GSAP e React Icons.

## Experiência

- Abertura com carregamento das imagens críticas e tipografia, ilustrações animadas e convite para explorar a página.
- Transição entre hero e manifesto com borda de papel rasgado, canto dobrado e sombra, mesclada ao fundo com `multiply` e máscara suave; imagem WebP transparente adaptada para desktop e mobile.
- Manifesto com narrativa guiada por scroll e revelação de texto.
- Projetos em agenda visual, seleção em destaque, arquivo expansível, vídeos de demonstração e cursor contextual.
- Oito páginas de projeto: Regula, E-food, E-play, To-Do, Spider-Verse, Clone Disney+, Hoje Tá Doce e WhatsApp Sender. Cada página reúne contexto, problema, solução, resultado, tecnologias, links e navegação entre projetos.
- Ilustrações de projetos reveladas por máscaras SVG a partir de imagens e mapas de traçado locais.
- Seção sobre com sequência de retratos, apresentação profissional e tecnologias.
- Seção de competências com vídeos locais e imagens de capa.
- Contato com placeholder animado, abertura de rascunho no aplicativo de e-mail, redes sociais e download do currículo em PDF.
- Navegação responsiva, retorno à seção de projetos, transições de página, fundos ambientes e efeitos de brilho.

## Instalação e comandos

Use uma versão LTS do Node.js compatível com Next.js 16 (mínimo 20.9) e npm. O lockfile é `package-lock.json`.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000. Para validar e gerar a produção:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`dev` usa Turbopack; `start` requer uma build concluída. A hospedagem deve executar Next.js e respeitar os cabeçalhos configurados em `next.config.ts`.

## Configuração

Defina `NEXT_PUBLIC_SITE_URL` com a URL pública completa antes do build, por exemplo `https://seu-dominio.com`. Essa URL alimenta metadata, canonical, Open Graph, sitemap e robots. Sem ela, o projeto usa `http://localhost:3000` para desenvolvimento.

Variáveis com prefixo `NEXT_PUBLIC_` são públicas; nunca coloque credenciais nelas. Arquivos `.env*` são ignorados pelo Git, exceto `.env.example`.

## Organização

```text
app/                         Rotas, layout, estilos globais, metadata, robots e sitemap
features/portfolio/
  shell/                     Composição, navegação, rodapé e carregamento inicial
  sections/                  Hero, manifesto, projetos, sobre, competências e contato
  projects/                  Dados, ordem, cards, vídeos, ícones e cursor
  project-detail/            Detalhes, ilustrações e animações dos projetos
  shared/                    Fundo, brilho, texto, máscaras e transições reutilizáveis
public/
  images/                    Imagens utilizadas pela experiência
  illustrations/             Ilustrações e mapas JSON de traçado
  videos/                    Demonstrações e capas de vídeos
  documents/                 Currículo
scripts/                     Ferramenta de geração dos mapas de traçado
```

A pasta `docs` foi esvaziada. Protótipos públicos, imagens antigas, galerias desativadas e a dependência OGL foram removidos. Dados dos projetos ficam em `features/portfolio/projects/data/projects.ts`; a ordem editorial está em `projectOrder.ts`.

O script `scripts/trace-project-illustrations.py` recria os mapas de traçado a partir dos PNGs originais. Requer Python, Pillow e NumPy, apenas para manutenção das ilustrações; não participa do build.

## Acessibilidade e desempenho

A experiência inclui links para pular conteúdo, navegação por teclado, estados de foco, mensagens acessíveis do formulário e tratamento de movimento reduzido. GSAP usa contextos, escopos, media queries e limpeza ao desmontar. As imagens usam `next/image`; vídeos têm capas locais e o carregamento inicial prioriza recursos do hero. CSS Modules mantêm estilos locais e os tokens globais centralizam cores, tipografia e espaçamento.

As competências carregam somente o vídeo ativo quando a seção entra na tela; as capas usam imagens responsivas. Títulos fora da viewport adiam o SplitText, e os plugins do manifesto são carregados conforme o modo desktop ou móvel. A ilustração dos livros usa WebP sem perda e carregamento sob demanda. As ilustrações dos cases usam o otimizador de imagens do Next.js, com prioridade para a imagem do hero; em telas compactas a imagem aparece completa, sem aguardar a animação de desenho. Cada case tem canonical e Open Graph próprios. No móvel, o navegador cria camadas de composição sob demanda, evitando manter camadas de animações fora da tela antes da primeira pintura.

O carrossel móvel de competências ativa a rolagem nativa ao se aproximar da viewport. Antes disso, mantém apenas o recorte visual, evitando interferência na captura inicial de LCP. Sem JavaScript, a rolagem nativa permanece disponível.

Auditoria Lighthouse 13.5.0 em build de produção local, em 03/10/2026:

| Página | Dispositivo | Performance | Acessibilidade | Boas práticas | SEO |
| --- | --- | --- | --- | --- | --- |
| Inicial | Móvel | 94 | 100 | 100 | 100 |
| Inicial | Desktop | 86 | 100 | 100 | 100 |
| Case Regula | Móvel | 93 | 100 | 100 | 100 |
| Case Regula | Desktop | 100 | 100 | 100 | 100 |

A inicial móvel registrou LCP de 2,2 s, TBT de 230 ms e CLS zero. Os relatórios locais estão em `output/lighthouse` (ignorado pelo Git). As notas variam conforme máquina, rede e hospedagem. Ainda há oportunidades de reduzir execução de JavaScript, recálculos de layout das animações e CSS que não participa da primeira tela; os dados do Lighthouse não significam que esses recursos estejam inutilizados no restante da experiência.

## Segurança

O contato não envia dados a um servidor: abre um `mailto` com destinatário fixo. O código normaliza espaços externos, limita o e-mail a 254 caracteres, rejeita controles e espaços internos, verifica a validade antes de abrir o rascunho e codifica assunto e corpo com `URLSearchParams`. Não há autenticação, banco de dados ou endpoint de formulário. Se um serviço de envio for adicionado, a validação e proteção contra abuso devem existir também no servidor.

Links externos usam proteção contra acesso à janela de origem. O Next.js entrega CSP, bloqueio de frames, `nosniff`, política de referência, restrições de permissões e HSTS em produção; o cabeçalho de identificação da plataforma está desabilitado. A CSP permite scripts e estilos inline para compatibilidade com a renderização e animação atuais, portanto não é uma CSP estrita com nonce. `unsafe-eval` fica restrito ao desenvolvimento.

Para auditar dependências:

```bash
npm audit
```

A auditoria cobre vulnerabilidades publicadas das dependências; não substitui uma auditoria completa da aplicação.
