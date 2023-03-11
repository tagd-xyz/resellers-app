#!/usr/bin/env bash

source ${DTK_HOME}/lib/node.sh

export NODE_OPTIONS=--max_old_space_size=1024

echo "User-agent: *
Disallow: /" > dist/robots.txt

# bundle web
gitlabci_bundle dist/spa

if [[ $? != 0 ]]; then
  echo "Failed to bundle SPA build"
  exit 1
fi
