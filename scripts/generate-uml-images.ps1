param(
  [string]$SourceDir = "docs/uml",
  [string]$OutputDir = "report/assets",
  [string]$DockerImage = "plantuml/plantuml:latest"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$sourcePath = Resolve-Path (Join-Path $repoRoot $SourceDir)
$outputPath = Join-Path $repoRoot $OutputDir
$jarPath = Join-Path $repoRoot "tools/plantuml.jar"

New-Item -ItemType Directory -Force -Path $outputPath | Out-Null

$pumlFiles = Get-ChildItem -Path $sourcePath -Filter "*.puml" -File
if ($pumlFiles.Count -eq 0) {
  throw "No .puml files found in $sourcePath"
}

$plantumlCommand = Get-Command plantuml -ErrorAction SilentlyContinue
if ($plantumlCommand) {
  foreach ($file in $pumlFiles) {
    & plantuml -tpng -o $outputPath $file.FullName
    if ($LASTEXITCODE -ne 0) {
      throw "PlantUML failed for $($file.FullName)"
    }
  }
  Write-Host "Generated $($pumlFiles.Count) UML image(s) in $outputPath using local plantuml."
  exit 0
}

if (Test-Path $jarPath) {
  foreach ($file in $pumlFiles) {
    & java -jar $jarPath -tpng -o $outputPath $file.FullName
    if ($LASTEXITCODE -ne 0) {
      throw "PlantUML jar failed for $($file.FullName)"
    }
  }
  Write-Host "Generated $($pumlFiles.Count) UML image(s) in $outputPath using tools/plantuml.jar."
  exit 0
}

$dockerCommand = Get-Command docker -ErrorAction SilentlyContinue
if ($dockerCommand) {
  $repoForDocker = $repoRoot.Path -replace "\\", "/"
  foreach ($file in $pumlFiles) {
    $relativeFile = Resolve-Path -Relative $file.FullName
    $dockerFile = (Join-Path "/workspace" $relativeFile) -replace "\\", "/"
    & docker run --rm `
      -v "${repoForDocker}:/workspace" `
      -w /workspace `
      $DockerImage `
      -tpng `
      -o /workspace/report/assets `
      $dockerFile
    if ($LASTEXITCODE -ne 0) {
      throw "Docker PlantUML failed for $($file.FullName). Make sure Docker Desktop is running, or install PlantUML locally."
    }
  }
  Write-Host "Generated $($pumlFiles.Count) UML image(s) in $outputPath using Docker image $DockerImage."
  exit 0
}

throw @"
PlantUML image generation requires one of these options:
1. Install PlantUML and make the `plantuml` command available in PATH.
2. Download plantuml.jar to tools/plantuml.jar.
3. Install Docker and use the default plantuml/plantuml image.
"@
