# Script do PowerShell para extrair frames de vídeo com FFmpeg e gerar manifest.json

param (
    [Parameter(Mandatory=$true)]
    [string]$InputVideo,
    
    [Parameter(Mandatory=$true)]
    [string]$OutputDir,
    
    [int]$Fps = 15,
    [int]$Quality = 75
)

# Caminho absoluto do FFmpeg instalado pelo Winget
$ffmpegPath = "C:\Users\gabri\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
$ffprobePath = "C:\Users\gabri\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffprobe.exe"

# Fallback se o caminho absoluto do Winget não existir
if (-not (Test-Path $ffmpegPath)) {
    $ffmpegPath = "ffmpeg"
    $ffprobePath = "ffprobe"
}

# Criar pasta de saída se não existir
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
}

Write-Host "Extraindo frames de: $InputVideo"
Write-Host "Diretório de saída: $OutputDir"
Write-Host "Frames por segundo (FPS): $Fps"

# Executar FFmpeg para extrair frames como imagens estáticas individuais libwebp
& $ffmpegPath -i $InputVideo -vf "fps=$Fps" -c:v libwebp -q:v $Quality -f image2 -y "$OutputDir\frame_%04d.webp"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Falha na execução do FFmpeg."
    exit 1
}

# Contar número total de frames
$frames = Get-ChildItem -Path $OutputDir -Filter "frame_*.webp"
$frameCount = $frames.Count

if ($frameCount -eq 0) {
    Write-Error "Nenhum frame foi gerado."
    exit 1
}

# Obter dimensões do vídeo
$width = 1920
$height = 1080

try {
    $probeWidth = & $ffprobePath -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 $InputVideo
    $probeHeight = & $ffprobePath -v error -select_streams v:0 -show_entries stream=height -of default=nw=1:nk=1 $InputVideo
    if ($probeWidth -and $probeHeight) {
        $width = [int]$probeWidth
        $height = [int]$probeHeight
    }
} catch {
    # Ignorar e usar fallback
}

# Escrever manifest.json
$manifest = @{
    frameCount = $frameCount
    fps = $Fps
    width = $width
    height = $height
    pattern = "frame_%04d.webp"
}

$manifest | ConvertTo-Json | Out-File -FilePath "$OutputDir\manifest.json" -Encoding utf8

Write-Host "Processo concluído!"
Write-Host "Total de frames: $frameCount"
Write-Host "Dimensões: ${width}x${height}"
Write-Host "Manifesto salvo em: $OutputDir\manifest.json"
