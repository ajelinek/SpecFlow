#!/bin/sh
set -eu

usage() {
  cat <<'EOF'
Usage: install-agents.sh --path=TARGET_DIR

Copies the bundled SpecFlow agent markdown files into the target directory.
When the local agents directory is not present, the script downloads the agent
files from the SpecFlow GitHub repository instead.

Example:
  ./install/install-agents.sh --path="$HOME/.config/opencode/agents"
EOF
}

download_agent() {
  agent_name=$1
  target_file=$2
  agent_url="${repo_base_url}/agents/${agent_name}"

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$agent_url" -o "$target_file"
    return
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -qO "$target_file" "$agent_url"
    return
  fi

  printf 'Error: could not download %s because neither curl nor wget is installed\n' "$agent_url" >&2
  exit 1
}

target_dir=""
repo_base_url=${SPECFLOW_REPO_BASE_URL:-https://raw.githubusercontent.com/ajelinek/SpecFlow/main}

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
agent_files="coder.md designer.md execution-agent.md"

mkdir -p "$target_dir"

if [ -d "$source_dir" ]; then
  cp "$source_dir"/*.md "$target_dir/"
  printf 'Installed SpecFlow agents into %s from local files\n' "$target_dir"
  exit 0
fi

for agent_file in $agent_files; do
  download_agent "$agent_file" "$target_dir/$agent_file"
done

printf 'Installed SpecFlow agents into %s from %s\n' "$target_dir" "$repo_base_url"
