# Prompt — Redesign: About Section

## Contexto

Refaça **completamente** a seção "About" do projeto. O objetivo é construir uma seção com hierarquia de informação clara, peso visual correto e copy que retém atenção — seguindo os padrões modernos da indústria para páginas de produto/portfólio/empresa.

Todo o conteúdo textual abaixo é **placeholder**. Substitua pelos dados reais antes de publicar.

---

## Princípios a seguir

### Hierarquia de informação
1. **O quê** — quem é / o que faz (headline, peso máximo)
2. **Por quê** — proposta de valor ou diferencial (subheadline ou lead)
3. **Como** — evidências: trajetória, números, projetos, reconhecimentos
4. **Próximo passo** — CTA claro e contextualizado

### Copy
- Falar diretamente com o leitor (segunda pessoa ou voz ativa)
- Evitar fluff genérico: "apaixonado por", "movido por desafios", etc.
- Usar especificidade como prova: números, nomes, resultados concretos
- Cada parágrafo deve ter **uma** ideia central — sem acúmulo

### Visual
- Foto/avatar com tratamento visual (não float solto sem contexto)
- Usar SVG decorativo ou elemento gráfico para âncora visual
- Tipografia com hierarquia de peso: display → body → caption
- Espaço negativo como recurso, não como vazio
- Animação de entrada leve (fade + translate) para reter atenção no scroll

---

## Estrutura esperada da seção

```
[EYEBROW — pequeno label acima do título]
[HEADLINE — apresentação direta, 1–2 linhas]
[SUBHEADLINE — proposta de valor ou diferencial, 1 linha]

[FOTO / AVATAR com tratamento visual]       [BLOCO DE TEXTO PRINCIPAL]
                                            [STATS ou HIGHLIGHTS — 2 a 3 itens]
                                            [CTA — botão ou link de ação]

[LINHA DE LOGOS / BADGES / RECONHECIMENTOS — opcional]
```

> **Variação mobile**: empilhado verticalmente, foto acima do texto, stats em grid 2×2.

---

## Conteúdo placeholder (substituir pelos dados reais)

### Eyebrow
```
Designer & Desenvolvedor Frontend
```

### Headline
```
Transformo problemas complexos
em interfaces que as pessoas entendem.
```

### Subheadline
```
5 anos construindo produtos digitais para startups e scale-ups — do zero ao lançamento.
```

### Parágrafo principal
```
Trabalho na interseção entre design e código. Comecei como designer,
migrei para o frontend e nunca mais separei os dois. Hoje entrego
componentes que respeitam o sistema de design e funcionam em produção —
sem renegociar pixel por pixel com o time de dev.

Já colaborei com empresas como [Empresa A], [Empresa B] e [Empresa C],
em projetos que somam mais de [X] usuários ativos.
```

### Stats / Highlights (3 itens)
```
[12+]   anos de experiência         → [SUBSTITUIR]
[40+]   projetos entregues          → [SUBSTITUIR]
[98%]   de clientes recorrentes     → [SUBSTITUIR]
```

### CTA
```
Texto do botão primário:   "Ver projetos"
Texto do link secundário:  "Baixar currículo →"
```

### Logos / Reconhecimentos (opcional)
```
[Logo A] [Logo B] [Logo C] [Logo D]
Ou badges: "Featured on Awwwards · Product Hunt · CSS Design Awards"
```

---

## Requisitos técnicos

- **Remover** qualquer elemento da about atual que não apareça nessa estrutura
- **Sem** repetição de informação já presente em outras seções (ex: skills listadas no about se já há seção de skills)
- Animação de entrada com `IntersectionObserver` ou equivalente — não autoplay
- Responsivo: mobile-first, breakpoints em `640px` e `1024px`
- Acessível: contraste mínimo AA, `alt` em imagens, `aria-label` em ícones decorativos
- Fonte display: escolha com caráter (evitar Inter, Roboto, Arial)
- Paleta: manter coerência com o restante do projeto — não introduzir novas cores fora do design token

---

## O que remover

- Listas de soft skills genéricas ("comunicativo", "proativo")
- Ícones de redes sociais duplicados (se já estão no header/footer)
- Texto autobiográfico sem relevância para o visitante
- Qualquer seção vazia ou com conteúdo "em breve"
- Elementos visuais sem função (separadores decorativos sem contexto, backgrounds conflitantes)

---

## Referências de padrão (para guiar estilo, não copiar)

| Referência | O que observar |
|---|---|
| [Linear.app/about](https://linear.app/about) | Hierarquia tipográfica, densidade controlada |
| [Stripe.com/about](https://stripe.com/about) | Copy direto, uso de dados |
| [Rauno.me](https://rauno.me) | Portfólio minimalista com personalidade |
| [Paco.me](https://paco.me) | Simplicidade com textura de caráter |
| [Awwwards — About sections](https://www.awwwards.com/websites/about/) | Referência de excelência criativa |

---

## Entregável esperado

- Código limpo da seção (`HTML + CSS` ou componente `React/JSX`)
- Conteúdo placeholder já posicionado na estrutura correta
- Sem comentários de `TODO` ou código morto
- Pronto para substituição de dados reais sem alterar estrutura

---

> **Nota**: Valide o resultado final com um olhar editorial — a seção deve responder em menos de 5 segundos as perguntas: *Quem é? O que faz? Por que importa? O que fazer agora?*