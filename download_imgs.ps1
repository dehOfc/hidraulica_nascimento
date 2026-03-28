$assets = "c:\Users\55169\.gemini\antigravity\scratch\hidraulica_nascimento\assets"

# Verified Unsplash photo IDs found by browsing
$images = @(
    @{name="caca_vazamento.jpg";   id="GGj1-zd1cNI"},
    @{name="desentupimento.jpg";   id="VFSFaY6Tw6k"},
    @{name="valvula_hidra.jpg";    id="p4B281L6t7k"},
    @{name="caixa_dagua.jpg";      id="lYnZqf-Z-Z0"},
    @{name="torneiras.jpg";        id="ud8ywRHmI2w"},
    @{name="instalacoes.jpg";      id="vM_Z8-0-7A4"}
)

foreach ($img in $images) {
    $path = Join-Path $assets $img.name
    $url = "https://images.unsplash.com/photo-" + $img.id + "?w=600&q=80&fit=crop"
    try {
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url, $path)
        $size = (Get-Item $path).Length
        Write-Host "OK: $($img.name) - $size bytes"
    } catch {
        Write-Host "ERRO: $($img.name) - $_"
    }
}
Write-Host "Concluido."
