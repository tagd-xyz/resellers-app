#!/usr/bin/env bash

apt update && apt install -y curl unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install

mkdir app
tar xf app.tar.gz --directory ./app

case ${ENV} in
  production)
    export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}"
    export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}"
    export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}

    s3_bucket=${S3_BUCKET_NAME}
    cloudfront_dist_id=${CLOUDFRONT_DIST_ID}
    ;;

  qa|uat)
    export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID_UAT}"
    export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY_UAT}"
    export AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION_UAT}

    s3_bucket="S3_BUCKET_NAME_${ENV}"
    s3_bucket=${!s3_bucket}

    cloudfront_dist_id="CLOUDFRONT_DIST_ID_${ENV}"
    cloudfront_dist_id=${!cloudfront_dist_id}
    ;;
esac

aws s3 sync --delete app/ s3://${s3_bucket}/
if [[ $? != 0 ]]; then
  exit 1
fi

echo "Create CloudFront invalidation"
aws cloudfront create-invalidation \
  --distribution-id ${cloudfront_dist_id} \
  --paths "/*"

echo "--------------------------------------------------------------------------------------------"
echo "Deployed to ${ENV}:"
echo "--------------------------------------------------------------------------------------------"
echo " * https://${DOMAIN}"
echo "--------------------------------------------------------------------------------------------"
