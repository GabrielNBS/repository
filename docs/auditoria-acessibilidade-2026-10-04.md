# Auditoria de acessibilidade — 04/10/2026

Escopo exclusivo: acessibilidade da home e das páginas de projetos. Skill aplicada: `ui-ux-pro-max`. Revisão do código e verificações manuais no navegador local, sobre as alterações preexistentes do projeto.

## Problemas corrigidos

| Problema | Ajuste | Referência |
| --- | --- | --- |
| Navegação declarada como menu de aplicativo sem comportamento completo desse padrão | Links nativos em disclosure; `aria-expanded`, `aria-controls` e `inert`; fechamento ao sair com foco; Escape restaura o foco; seleção transfere foco à seção | WCAG 2.1.1, 2.4.3, 4.1.2 |
| Destinos de salto sem foco programático explícito | Títulos da home e dos projetos com `tabIndex=-1` | WCAG 2.4.1 |
| Navegação fixa pode cobrir destinos de foco | Margem de rolagem nos destinos e controles | WCAG 2.4.11; requer revisão visual em diferentes ampliações |
| Campo identificado apenas por nome acessível e placeholder animado | Rótulo visível associado por `htmlFor`; foco no campo após validação inválida | WCAG 3.3.1, 3.3.2 |
| Foco em habilidades fora do viewport no desktop | Sincronização imediata do deslocamento com o cartão focado; navegação funcional no modo de movimento reduzido | WCAG 2.1.1, 2.4.3 |
| `aria-posinset` e `aria-setsize` em artigos sem papel de conjunto compatível | Remoção dos atributos | WAI-ARIA |
| Princípios do manifesto desaparecem da leitura conforme o scroll no desktop | Versão textual para tecnologias assistivas; cartões visuais excluídos dessa leitura no modo animado | WCAG 1.3.1 |
| Vídeos automáticos contínuos sem pausa e teasers sem respeitar movimento reduzido | Controle global “Pausar vídeos” com estado pressionado; bloqueio de reprodução durante pausa; preferência do sistema respeitada nos teasers | WCAG 2.2.2 |

## Evidência de validação

- TypeScript e ESLint executados sem erros após as alterações.
- Navegador: menu expandido apresenta seis links; Escape fecha e restaura o foco ao botão; menu fechado tem `inert`.
- Navegador: seleção de Contato transfere foco para a seção.
- Navegador: e-mail inválido mantém foco no campo, apresenta erro e `aria-invalid=true`, sem abrir aplicativo externo.
- Navegador: controle de pausa marca `data-videos-paused=true`; nenhum vídeo permanece reproduzindo.
- Revisão do código: idioma `pt-BR`, indicadores de foco, imagens decorativas, nomes dos botões de ícone e tratamento de movimento reduzido já presentes em vários componentes.

## Limites e verificações restantes

Não constitui certificação de conformidade WCAG. Não foi executado axe/Lighthouse: Playwright não estava disponível no cache local; as verificações interativas usaram o navegador do Codex. Não houve validação com NVDA/JAWS, zoom de 200%/400%, dispositivos móveis ou mensuração exaustiva de contraste em todos os frames animados. O fluxo completo de foco dos seis cartões e o retorno dos vídeos após pausa precisam de verificação adicional no navegador. O controle adicionado pausa vídeos; animações GSAP continuam seguindo as preferências de movimento já implementadas no projeto. O PDF do currículo não foi auditado.

Fontes: [Disclosure Navigation — W3C](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/), [Pause, Stop, Hide — W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide/).
