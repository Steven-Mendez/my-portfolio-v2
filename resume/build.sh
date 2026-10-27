#!/usr/bin/env sh
# Renders resume/cv-{en,es}.html to public/steven-mendez-cv-{en,es}.pdf with
# headless Chrome, then refuses any PDF that is not exactly one page.
set -eu
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at $CHROME (set CHROME=...)" >&2
  exit 1
fi

status=0
for lang in en es; do
  out="public/steven-mendez-cv-$lang.pdf"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$out" "file://$PWD/resume/cv-$lang.html" 2>/dev/null
  pages=$(pdfinfo "$out" | awk '/^Pages:/ { print $2 }')
  if [ "$pages" != "1" ]; then
    echo "$out has $pages pages; it must be exactly one" >&2
    status=1
    continue
  fi
  # A line that ends in a hyphen loses it in plain-text extraction
  # ("computer-" + "use" becomes "computeruse"). Wrap the term in
  # <span class="nowrap"> in the HTML.
  broken=$(pdftotext -layout "$out" - | sed 's/[[:space:]]*$//' | grep -E -- '-$' || true)
  if [ -n "$broken" ]; then
    echo "$out breaks a line at a hyphen:" >&2
    echo "$broken" >&2
    status=1
  else
    echo "$out: 1 page, no hyphen breaks"
  fi
done
exit $status
