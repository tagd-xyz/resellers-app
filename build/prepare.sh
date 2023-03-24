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
    firebaseApiKey=""
    firebaseAuthDomain=""
    firebaseProjectId=""
    firebaseStorageBucket=""
    firebaseMessagingSenderId=""
    firebaseAppId=""
    firebaseMeasurementId=""
    ;;

  qa|uat)
    api_hostname="tagd-res-api.${ENV}.tclstaging.com"
    firebaseApiKey="FIREBASE_API_KEY_${ENV}"
    firebaseApiKey=${!firebaseApiKey}
    firebaseAuthDomain="FIREBASE_AUTH_DOMAIN_${ENV}"
    firebaseAuthDomain=${!firebaseAuthDomain}
    firebaseProjectId="FIREBASE_PROJECT_ID_${ENV}"
    firebaseProjectId=${!firebaseProjectId}
    firebaseStorageBucket="FIREBASE_STORAGE_BUCKET_${ENV}"
    firebaseStorageBucket=${!firebaseStorageBucket}
    firebaseMessagingSenderId="FIREBASE_MESSAGING_SENDER_ID_${ENV}"
    firebaseMessagingSenderId=${!firebaseMessagingSenderId}
    firebaseAppId="FIREBASE_APP_ID_${ENV}"
    firebaseAppId=${!firebaseAppId}
    firebaseMeasurementId="FIREBASE_MEASUREMENT_ID_${ENV}"
    firebaseMeasurementId=${!firebaseMeasurementId}
    ;;
esac

API_URL=https://${api_hostname}/api/v1/

FIREBASE_API_KEY=${firebaseApiKey},
FIREBASE_AUTH_DOMAIN=${firebaseAuthDomain},
FIREBASE_PROJECT_ID=${firebaseProjectId},
FIREBASE_STORAGE_BUCKET=${firebaseStorageBucket},
FIREBASE_MESSAGING_SENDER_ID=${firebaseMessagingSenderId},
FIREBASE_APP_ID=${firebaseAppId},
FIREBASE_MEASUREMENT_ID=${firebaseMeasurementId}

echo "ENV: ${ENV}"
echo "API_URL: ${API_URL}"

prepare_env_file ${local_env}

cat ${local_env}

install_system_packages "git"

# configure node to allow access to gitlab projects
sed -i "s|git+ssh://git@gitlab.totallydev.com|https://${CI_REGISTRY_USER}:${CI_REGISTRY_PASSWORD}@gitlab.totallydev.com/|" package.json yarn.lock

yarn install -q --production=false
yarn quasar build
