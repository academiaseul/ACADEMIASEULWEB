# Abre cada .pptx con PowerPoint (COM) y lo deja listo para clase:
#  1. Salto de línea por palabra en coreano (ParagraphFormat.WordWrap): el hangul no se corta a mitad de palabra
#  2. Texto que no cabe en su caja se achica solo (AutoSize = ajustar texto a la forma), salvo los títulos
#  3. Tablas que bajan hasta el pie: se achica la letra hasta que entren (borde inferior ≤ 6,85")
#  4. Animaciones "Aparecer al hacer clic": rom_* (toda la romanización junta) y rev_N_caja + rev_N_txt (cada respuesta)
# Guarda el .pptx y exporta PNG (1280x720) a <carpeta>\_qa\<deck>\ para el control visual.
param([string[]]$Files)
$ErrorActionPreference = "Stop"
$LIMITE = 6.85 * 72
$ppt = New-Object -ComObject PowerPoint.Application
foreach ($f in $Files) {
  $pres = $ppt.Presentations.Open($f, 0, 0, 0)
  $nAnim = 0; $nTab = 0
  foreach ($slide in $pres.Slides) {
    foreach ($sh in $slide.Shapes) {
      if ($sh.HasTextFrame -and $sh.TextFrame.HasText) {
        $sh.TextFrame.TextRange.ParagraphFormat.WordWrap = -1
        $esTitulo = $false
        try { if ($sh.Type -eq 14 -and ($sh.PlaceholderFormat.Type -eq 1 -or $sh.PlaceholderFormat.Type -eq 3)) { $esTitulo = $true } } catch {}
        if (-not $esTitulo) { $sh.TextFrame.WordWrap = -1; $sh.TextFrame2.AutoSize = 2 }
      }
      if ($sh.HasTable) {
        $t = $sh.Table
        for ($r = 1; $r -le $t.Rows.Count; $r++) { for ($c = 1; $c -le $t.Columns.Count; $c++) { $t.Cell($r, $c).Shape.TextFrame.TextRange.ParagraphFormat.WordWrap = -1 } }
        $guard = 0
        while (($sh.Top + $sh.Height) -gt $LIMITE -and $guard -lt 12) {
          for ($r = 1; $r -le $t.Rows.Count; $r++) { for ($c = 1; $c -le $t.Columns.Count; $c++) {
            $tr = $t.Cell($r, $c).Shape.TextFrame.TextRange; if ($tr.Font.Size -gt 11) { $tr.Font.Size = $tr.Font.Size - 1 } } }
          for ($r = 1; $r -le $t.Rows.Count; $r++) { $t.Rows.Item($r).Height = 10 }
          $guard++
        }
        if ($guard -gt 0) { $nTab++ }
      }
    }
    $seq = $slide.TimeLine.MainSequence
    while ($seq.Count -gt 0) { $seq.Item(1).Delete() }
    $rom = @(); $rev = @{}
    foreach ($sh in $slide.Shapes) {
      if ($sh.Name -like "rom_*") { $rom += $sh }
      elseif ($sh.Name -match "^rev_(\d+)_(caja|txt)$") { $k = [int]$Matches[1]; if (-not $rev.ContainsKey($k)) { $rev[$k] = @() }; $rev[$k] += $sh }
    }
    $first = $true
    foreach ($sh in $rom) { $trig = $(if ($first) { 1 } else { 2 }); [void]$seq.AddEffect($sh, 1, 0, $trig); $first = $false; $nAnim++ }
    foreach ($k in ($rev.Keys | Sort-Object)) {
      $first = $true
      foreach ($sh in $rev[$k]) { $trig = $(if ($first) { 1 } else { 2 }); [void]$seq.AddEffect($sh, 1, 0, $trig); $first = $false; $nAnim++ }
    }
  }
  $pres.Save()
  $dir = Join-Path (Split-Path $f) ("_qa\" + [IO.Path]::GetFileNameWithoutExtension($f))
  if (Test-Path $dir) { Remove-Item -Recurse -Force $dir }
  New-Item -ItemType Directory -Force $dir | Out-Null
  $pres.Export($dir, "PNG", 1280, 720)
  Write-Output ("ok " + [IO.Path]::GetFileName($f) + " | laminas " + $pres.Slides.Count + " | animaciones " + $nAnim + " | tablas achicadas " + $nTab)
  $pres.Close()
}
$ppt.Quit()
