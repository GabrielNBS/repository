# Rascunho — seção de skills front-end

## Intenção

Uma seção logo abaixo de `About`, mostrando que o trabalho front-end vai além da camada visual. A referência anexada é usada apenas como direção de composição: uma seção-viewport com `100dvh`, cards em alturas alternadas, borda coral e uma resposta expressiva ao hover. O retângulo é o enquadramento da seção, não um painel para os cards.

## Direção visual

- `ink` `#25221f`: painel de contraste e continuidade com os elementos escuros do portfólio.
- `paper` `#f6efe5`: leitura e respiro, já usado como base do projeto.
- `peach` `#efae82`: borda, títulos de cards e ponto de atenção da interação.
- Tipografia: Arial para interface e Lora apenas na palavra de ênfase do texto lateral.
- Assinatura: o giro de 360 graus com flutuação sutil, usado somente nos cards para não competir com a narrativa.

## Wireframe

```text
┌──────────────────────────── seção 100dvh ────────────────────┐
│  04 / Como construo                                           │
│  Muito mais que trocar a cor de um botão.                     │
│  A tela é só a parte mais visível.                             │
│                                                              │
│                                                ┌─────────┐   │
│                                    ┌─────────┐ │Frontend │   │
│                        ┌─────────┐ │Acessib. │ └─────────┘   │
│            ┌─────────┐ │Design   │ └─────────┘               │
│            │React    │ └─────────┘                            │
│            └─────────┘      pilha CardSwap / canto direito    │
└──────────────────────────────────────────────────────────────┘
```

## Implementação

1. `SkillsSection.tsx` mantém as seis skills como dados simples, com título e descrição de aplicação.
2. `CardSwap.jsx` e `CardSwap.css` reproduzem a implementação JS-CSS oficial do registry React Bits, com `gsap` já disponível no projeto.
3. `SkillsSection.module.css` adapta apenas a superfície visual, tipografia, cores e área técnica de `600px` sem criar um painel ao redor dos cards.
4. `CardSwap` recebe `cardDistance={60}`, `verticalDistance={70}`, `delay={5000}` e `pauseOnHover={false}` conforme a configuração solicitada.
5. `skills-section-preview.html` e `skills-section-preview.css` são arquivos descartáveis e não entram no bundle do Next.js.
6. A seção é exportada pelo índice de sections e inserida entre `AboutSection` e `ContactSection`.
7. A numeração editorial do contato passa de `04` para `05` para preservar a sequência real da página.
