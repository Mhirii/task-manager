#!/bin/bash

if [ -z "$1" ]; then
  echo "PROVIDE COMMIT MESSAGE!"
  exit 1
fi

message="$1"
repo="https://github.com/Mhirii/task-manager"
branch="main"

git add .

git commit -m "$message"

git push $repo $branch