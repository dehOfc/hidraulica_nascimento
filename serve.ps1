$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Servidor rodando em http://localhost:8080 - Pressione Ctrl+C para parar"

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $urlPath = $req.Url.LocalPath
    if ($urlPath -eq "/") { $urlPath = "/index.html" }
    $file = Join-Path $root $urlPath.TrimStart("/")
    if (Test-Path $file -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file)
        $mimeMap = @{
            ".html" = "text/html; charset=utf-8"
            ".css"  = "text/css"
            ".js"   = "application/javascript"
            ".png"  = "image/png"
            ".jpg"  = "image/jpeg"
            ".webp" = "image/webp"
            ".svg"  = "image/svg+xml"
        }
        $mime = $mimeMap[$ext]
        if (-not $mime) { $mime = "text/plain" }
        $res.ContentType = $mime
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
    }
    $res.Close()
}
