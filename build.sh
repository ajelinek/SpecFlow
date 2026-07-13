#!/usr/bin/env bash
# Builds a distributable .zip for each skill in skills/, ready to install
# via `npx skills add` or manual copy. Output goes to dist/<skill-name>.zip.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$ROOT_DIR/skills"
DIST_DIR="$ROOT_DIR/dist"

rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

count=0
for skill_path in "$SKILLS_DIR"/*/; do
  skill_name="$(basename "$skill_path")"

  if [ ! -f "$skill_path/SKILL.md" ]; then
    continue
  fi

  zip_path="$DIST_DIR/$skill_name.zip"
  (cd "$SKILLS_DIR" && zip -r -q -X "$zip_path" "$skill_name" \
    -x "*.DS_Store" \
    -x "__MACOSX/*")

  echo "Built $zip_path"
  count=$((count + 1))
done

echo "Done. $count skill(s) packaged into $DIST_DIR"
