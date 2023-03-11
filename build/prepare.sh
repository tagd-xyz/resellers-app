#!/usr/bin/env bash

source ${DTK_HOME}/lib/node.sh

local_env=.env
cp .env.example ${local_env}

if [[ ${CI_COMMIT_TAG} ]]; then
  ENV="production"
else
  ENV=${CI_COMMIT_REF_NAME//-*/}
fi

case ${ENV} in
  production)
    api_hostname="api.tagd.com"
    ;;

  qa|uat)
    api_hostname="tagd-ret-api.${ENV}.tclstaging.com"
    ;;
esac

API_URL=https://${api_hostname}/api/v1/

echo "ENV: ${ENV}"
echo "API_URL: ${API_URL}"

prepare_env_file ${local_env}

cat ${local_env}

install_system_packages "git"

# configure node to allow access to gitlab projects
sed -i "s|git+ssh://git@gitlab.totallydev.com|https://${CI_REGISTRY_USER}:${CI_REGISTRY_PASSWORD}@gitlab.totallydev.com/|" package.json yarn.lock

yarn install -q --production=false
yarn quasar build
