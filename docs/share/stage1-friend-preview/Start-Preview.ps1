$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$port = 4173

$nodeCandidates = @(
  "C:\Users\Admin\AppData\Local\OpenAI\Codex\bin\node.exe",
  "C:\Program Files\nodejs\node.exe"
)

$nodePath = $nodeCandidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1

if (-not $nodePath) {
  $nodeCommand = Get-Command node -ErrorAction SilentlyContinue
  if ($nodeCommand) {
    $nodePath = $nodeCommand.Source
  }
}

if (-not $nodePath) {
  Write-Error "Node.js was not found. On this machine, install Node.js or run this from Codex after it rebuilds the packet."
  exit 1
}

$env:AUTHORIA_PREVIEW_ROOT = $root
$env:AUTHORIA_PREVIEW_PORT = "$port"

$serverScript = @'
const http = require("http");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(process.env.AUTHORIA_PREVIEW_ROOT);
const host = "127.0.0.1";
const port = Number(process.env.AUTHORIA_PREVIEW_PORT || 4173);
const rootPrefix = rootDir.endsWith(path.sep) ? rootDir : rootDir + path.sep;

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
]);

function safeResolve(requestPath) {
  const resolved = path.resolve(rootDir, "." + requestPath);
  if (resolved !== rootDir && !resolved.startsWith(rootPrefix)) {
    return null;
  }
  return resolved;
}

function candidatePaths(pathname) {
  if (pathname === "/") {
    return ["/index.html"];
  }

  if (pathname.endsWith("/")) {
    return [
      pathname + "index.html",
      pathname.slice(0, -1) + ".html",
    ];
  }

  return [
    pathname,
    pathname + ".html",
    pathname + "/index.html",
  ];
}

function resolveFile(reqUrl) {
  const parsed = new URL(reqUrl, `http://${host}:${port}`);
  const pathname = decodeURIComponent(parsed.pathname);

  for (const candidate of candidatePaths(pathname)) {
    const filePath = safeResolve(candidate);
    if (!filePath) {
      return null;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return filePath;
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || "/");

  if (!filePath) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  const contentType = contentTypes.get(extension) || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the other preview server, then run Start-Preview.ps1 again.`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`Authoria Almanac preview: http://127.0.0.1:${port}/`);
  console.log("Press Ctrl+C to stop the preview server.");
});
'@

$serverFile = Join-Path $env:TEMP "authoria-stage1-preview-server.js"
Set-Content -LiteralPath $serverFile -Value $serverScript -Encoding UTF8

try {
  & $nodePath $serverFile
} finally {
  Remove-Item -LiteralPath $serverFile -Force -ErrorAction SilentlyContinue
}
