#!/bin/bash

server1_dir="./backend"
server2_dir="./frontend"

start_server() {
  local server_dir=$1
  local start_command=$2

  echo "Starting server in $server_dir"

  if command -v kitty &>/dev/null; then
    kitty sh -c "cd '$server_dir' && $start_command"
  elif command -v alacritty &>/dev/null; then
    alacritty --working-directory="$server_dir" -e sh -c "$start_command"
  elif command -v xterm &>/dev/null; then
    xterm -e "cd '$server_dir'; $start_command"
  else
    echo "Unable to find a supported terminal emulator (alacritty, kitty, xterm)."
    exit 1
  fi
}

start_server "$server1_dir" "npm run start:dev" &

start_server "$server2_dir" "npx vite" &
