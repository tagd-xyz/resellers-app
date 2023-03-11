#!/usr/bin/env bash

PRIMARY_CONTAINER=tagd-resellers-app

install_docker_toolkit () {
  export DTK_VERSION=1.7.11
  export DTK_HOME=~/.dtk/${DTK_VERSION}
  curl -s https://dtk.totallydev.com/install.sh | bash 2>/dev/null
  if [[ ! -d ${DTK_HOME} ]]; then
    echo "Dev toolkit not installed"
    exit 1
  fi
  source ${DTK_HOME}/lib/dev.sh 1
}

prepare_app () {
  prepare_env_file ../.env.local ./conf/.env.dev
  # create_npmrc
}

# create .npmrc
# create_npmrc () {
#   npmrc=$(vault read -field=npmrc secret/dev/fontawesome_token 2>/dev/null)
#   npmrc_file=../.npmrc
#   if [[ ! -f ${npmrc_file} ]]; then
#     echo "Creating ${npmrc_file}"
#     echo "${npmrc}" >> ${npmrc_file}
#   fi
# }

install_docker_toolkit
prepare_app
create_docker_network "dev"

echo "Removing existing containers"
docker rm -f ${PRIMARY_CONTAINER} &>/dev/null

echo "Pulling latest versions of images"
docker-compose pull &>/dev/null

echo "Starting services"
docker-compose -p ${PRIMARY_CONTAINER} up -d

echo
echo "Attaching to container \"${PRIMARY_CONTAINER}\" [Ctrl-C to exit]"
echo
docker attach --sig-proxy=false ${PRIMARY_CONTAINER}
