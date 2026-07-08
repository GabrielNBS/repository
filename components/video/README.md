# Infraestrutura de Vídeo e Scroll-Scrubbing Zen

Este módulo fornece os componentes e scripts para processamento e renderização de vídeo baseado em sequências de frames no Canvas 2D, sincronizado com a rolagem do usuário através do **GSAP ScrollTrigger**.

---

## 1. Scripts de Otimização e Extração de Frames

Para evitar o download de grandes arquivos de vídeo e obter máximo controle e fluidez nas animações orientadas ao scroll (Apple-style scroll scrubbing), dividimos o vídeo em uma sequência de imagens estáticas comprimidas em formato `.webp` e geramos um manifesto JSON.

### Como Executar (Nativamente no Windows)
O Winget instala o FFmpeg de forma silenciosa. O script do PowerShell localiza o executável e faz a extração automática.

No PowerShell, execute:
```powershell
.\scripts\video\extract-frames.ps1 -InputVideo "Caminho\para\seu-video.mp4" -OutputDir "public\frames\nome-da-sequencia" -Fps 15 -Quality 75
```

### Como Executar (Bash - Git Bash / WSL / Linux / macOS)
Caso utilize um terminal bash, utilize o script correspondente:
```bash
./scripts/video/extract-frames.sh "Caminho/para/seu-video.mp4" "public/frames/nome-da-sequencia" 15 75
```

Estes scripts geram:
1. Uma sequência de arquivos WebP (`frame_0001.webp`, `frame_0002.webp`, etc.).
2. Um arquivo `manifest.json` contendo a quantidade de frames, dimensões e padrão de nomenclatura das imagens.

---

## 2. Componentes e Hooks React

### `ScrollFrameSequence.tsx`
Renderiza os frames carregados dinamicamente em um elemento `<canvas>`. Ele utiliza a lógica de proporção `"cover"` para se comportar como imagem de fundo, cobrindo a viewport e tratando corretamente a densidade de pixels em telas Retina (`devicePixelRatio`).

#### Exemplo de Uso:
```tsx
import ScrollFrameSequence from '@/components/video/ScrollFrameSequence';

export default function MySection() {
  return (
    <section id="hero" className="h-screen w-full relative overflow-hidden">
      <ScrollFrameSequence
        sequencePath="/frames/fox-sumi-e"
        triggerSelector="#hero"
        className="opacity-35"
      />
      <div className="relative z-10">
        <h1>Seu Título Zen</h1>
      </div>
    </section>
  );
}
```

### `useScrollSequence.ts`
Hook responsável pelo pré-carregamento assíncrono e progressivo das imagens.
- **Performance LCP**: O hook faz o download imediato dos primeiros 5 frames críticos (sincronamente) para que o topo da página monte instantaneamente.
- **Background Loading**: O restante da sequência é baixado de forma assíncrona em segundo plano, evitando travamentos ou picos de processamento na interface.

---

## 3. Performance e Acessibilidade

1. **Acessibilidade (`prefers-reduced-motion`)**: O componente verifica automaticamente a query de preferências de movimento. Caso o usuário prefira movimento reduzido, o ScrollTrigger de fixação é ignorado e apenas o primeiro frame estático é exibido, preservando o layout limpo sem provocar desconfortos de rolagem.
2. **Lazy Loading**: A sequência de frames só inicia a conexão e o download ao atingir a viewport ou quando o componente correspondente é montado no cliente.
