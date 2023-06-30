#!/bin/bash

server1_dir="./backend"
server2_dir="./frontend"

start_server() {
  local server_dir=$1
  local start_command=$2

  echo "Starting server in $server_dir"
  kitty --directory="$server_dir" fish -c "$start_command"
}

start_server "$server1_dir" "npm run start:dev" &

start_server "$server2_dir" "npx vite" &

cd "$server2_dir