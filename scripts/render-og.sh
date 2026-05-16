#!/usr/bin/env bash
# Rasterize assets/og-image.svg -> assets/og-image.png at 1200x630.
# Uses headless Chrome so Fraunces (Google Fonts) renders correctly.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SVG="assets/og-image.svg"
OUT="assets/og-image.png"
TMP="$(mktemp -d)"
WRAP="$TMP/og.html"

cat > "$WRAP" <<HTML
<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap" rel="stylesheet">
<style>html,body{margin:0;padding:0;background:#fff}body{width:1200px;height:630px;overflow:hidden}svg{display:block;width:1200px;height:630px}</style>
</head><body>
$(cat "$SVG")
</body></html>
HTML

"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1200,630 --virtual-time-budget=3000 \
  --screenshot="$PWD/$OUT" "file://$WRAP" 2>/dev/null

rm -rf "$TMP"
echo "Rendered -> $OUT ($(sips -g pixelWidth -g pixelHeight "$OUT" | tail -2 | tr '\n' ' '))"
