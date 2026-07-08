#!/bin/bash

# Script para extrair frames de um vídeo e gerar manifest.json para ScrollFrameSequence

# Instalação recomendada do FFmpeg no Windows:
# winget install FFmpeg

# Argumentos
INPUT_VIDEO=$1
OUTPUT_DIR=$2
FPS=${3:-15}
QUALITY=${4:-6} # 1 (melhor/maior) a 31 (pior/menor) para -q:v do ffmpeg webp

if [ -z "$INPUT_VIDEO" ] || [ -z "$OUTPUT_DIR" ]; then
  echo "Uso: ./extract-frames.sh <caminho_do_video> <diretorio_de_saida> [fps=15] [qualidade_webp=6]"
  exit 1
fi

# Criar pasta de saída
mkdir -p "$OUTPUT_DIR"

echo "Extraindo frames de: $INPUT_VIDEO"
echo "Diretório de saída: $OUTPUT_DIR"
echo "Frames por segundo (FPS): $FPS"

# Executar ffmpeg para extrair frames em .webp com qualidade configurada
# O padrão %04d extrai os frames como frame_0001.webp, frame_0002.webp, etc.
ffmpeg -i "$INPUT_VIDEO" -vf "fps=$FPS" -q:v "$QUALITY" -y "$OUTPUT_DIR/frame_%04d.webp"

if [ $? -ne 0 ]; then
  echo "Erro: falha na execução do FFmpeg para extrair os frames."
  exit 1
fi

# Contar número total de frames gerados
FRAME_COUNT=$(ls -1 "$OUTPUT_DIR"/frame_*.webp 2>/dev/null | wc -l)

if [ "$FRAME_COUNT" -eq 0 ]; then
  echo "Erro: nenhum frame foi gerado."
  exit 1
fi

# Obter dimensões do primeiro frame usando ffprobe
# Se ffprobe não estiver disponível, assumiremos as dimensões do vídeo
WIDTH=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 "$INPUT_VIDEO" 2>/dev/null)
HEIGHT=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=nw=1:nk=1 "$INPUT_VIDEO" 2>/dev/null)

if [ -z "$WIDTH" ] || [ -z "$HEIGHT" ]; then
  # Fallback caso ffprobe falhe (padrão Full HD)
  WIDTH=1920
  HEIGHT=1080
fi

# Escrever manifest.json
cat <<EOF > "$OUTPUT_DIR/manifest.json"
{
  "frameCount": $FRAME_COUNT,
  "fps": $FPS,
  "width": $WIDTH,
  "height": $HEIGHT,
  "pattern": "frame_%04d.webp"
}
EOF

echo "Processo concluído com sucesso!"
echo "Total de frames: $FRAME_COUNT"
echo "Dimensões: ${WIDTH}x${HEIGHT}"
echo "Manifesto salvo em: $OUTPUT_DIR/manifest.json"
