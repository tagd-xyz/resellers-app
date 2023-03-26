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
    firebaseAuthDomain=""
    firebaseStorageBucket=""
    firebaseAppId=""
    firebaseMeasurementId=""
    ;;

  qa|uat)
    api_hostname="tagd-ret-api.${ENV}.tclstaging.com"
    firebaseAuthDomain="${FIREBASE_PROJECT_ID}.firebaseapp.com"
    firebaseStorageBucket="${FIREBASE_PROJECT_ID}.appspot.com"
    firebaseAppId="FIREBASE_APP_ID_${ENV}"
    firebaseAppId=${!firebaseAppId}
    firebaseMeasurementId="FIREBASE_MEASUREMENT_ID_${ENV}"
    firebaseMeasurementId=${!firebaseMeasurementId}
    ;;
esac

API_URL=https://${api_hostname}/api/v1/

FIREBASE_API_KEY=${FIREBASE_API_KEY}
FIREBASE_AUTH_DOMAIN=${firebaseAuthDomain}
FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
FIREBASE_STORAGE_BUCKET=${firebaseStorageBucket}
FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_MESSAGING_SENDER_ID}
FIREBASE_APP_ID=${firebaseAppId}
FIREBASE_MEASUREMENT_ID=${firebaseMeasurementId}

echo "ENV: ${ENV}"
echo "API_URL: ${API_URL}"

echo "FIREBASE_API_KEY: ${FIREBASE_API_KEY}"
echo "FIREBASE_AUTH_DOMAIN: ${FIREBASE_AUTH_DOMAIN}"
echo "FIREBASE_PROJECT_ID: ${FIREBASE_PROJECT_ID}"
echo "FIREBASE_STORAGE_BUCKET: ${FIREBASE_STORAGE_BUCKET}"
echo "FIREBASE_MESSAGING_SENDER_ID: ${FIREBASE_MESSAGING_SENDER_ID}"
echo "FIREBASE_APP_ID: ${FIREBASE_APP_ID}"
echo "FIREBASE_MEASUREMENT_ID: ${FIREBASE_MEASUREMENT_ID}"

prepare_env_file ${local_env}

cat ${local_env}

install_system_packages "git"

# configure node to allow access to gitlab projects
sed -i "s|git+ssh://git@gitlab.totallydev.com|https://${CI_REGISTRY_USER}:${CI_REGISTRY_PASSWORD}@gitlab.totallydev.com/|" package.json yarn.lock

yarn install -q --production=false
yarn quasar build
