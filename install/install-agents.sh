#!/bin/sh
set -eu

usage() {
  cat <<'EOF'
Usage: install-agents.sh --path=TARGET_DIR

Copies the bundled SpecFlow agent markdown files into the target directory.

Example:
  ./install/install-agents.sh --path="$HOME/.config/opencode/agents"
EOF
}

target_dir=""

for arg in "$@"; do
  case "$arg" in
    --path=*)
      target_dir=${arg#--path=}
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      usage >&2
      exit 1
      ;;
  esac
done

if [ -z "$target_dir" ]; then
  usage >&2
  exit 1
fi

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
source_dir="$script_dir/../agents"

if [ ! -d "$source_dir" ]; then
  printf 'Error: agent source directory not found: %s\n' "$source_dir" >&2
  exit 1
fi

mkdir -p "$target_dir"
cp "$source_dir"/*.md "$target_dir/"

printf 'Installed SpecFlow agents into %s\n' "$target_dir"
