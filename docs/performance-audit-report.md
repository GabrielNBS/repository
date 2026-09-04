# Auditoria de performance e tree shaking

Data: 02/09/2026

## Resultado

O build final passou com Next.js 16.2.10, TypeScript e ESLint. O shader WebGL pesado foi retirado do caminho crítico da home e passou a carregar sob demanda. Três artefatos antigos de skills sem referências foram removidos, junto com dependências diretas órfãs.

## Comparação do build

Baseline: estado do working tree imediatamente antes desta auditoria.

| Métrica | Antes | Depois | Variação |
| --- | ---: | ---: | ---: |
| JavaScript emitido | 3.312.662 B | 2.190.998 B | -1.121.664 B (-33,9%) |
| Arquivos JavaScript | 12 | 14 | +2 chunks de carregamento sob demanda |
| CSS emitido | 91.643 B | 91.193 B | -450 B (-0,5%) |
| Total dos chunks estáticos | 3.404.305 B | 2.282.191 B | -1.122.114 B (-33,0%) |

Na home final, o HTML inicial referencia 947.770 B de assets (11 JS e 2 CSS). O chunk do shader, com 1.128.350 B, não é referenciado inicialmente e fica disponível para carregamento lazy.

## Alterações

- `ProjectShaderGradient` agora é carregado por `next/dynamic` com `ssr: false`, preservando um fallback visual CSS.
- `getProjectTone` foi extraído para um módulo leve para não puxar o bundle WebGL ao importar a lógica de tom.
- Removidos `SkillScene.tsx`, `CardSwap.jsx` e `CardSwap.d.ts`, todos sem consumidores no código ativo.
- Removidos `camera-controls`, `three-stdlib` e `@types/three` das dependências declaradas; os dois primeiros não eram importados pelo projeto e o shadergradient já traz sua implementação necessária em chunks próprios.
- `package-lock.json` foi sincronizado.

## Validação

- `npm run build`: passou; 11 páginas estáticas/SSG geradas.
- `npm run lint`: passou.
- `npx tsc --noEmit`: passou.
- `git diff --check`: sem erros de whitespace.

Observação: a primeira tentativa de build no sandbox não conseguiu baixar Lora do Google Fonts; a baseline e o build final foram então executados com acesso de rede autorizado para manter a comparação válida.
