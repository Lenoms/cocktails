#!/bin/bash
set -e

BUCKET_NAME="lemonscode-cocktails"
PREFIX="cocktails"
BUILD_DIR="./build"
DISTRIBUTION_ID="E285F6U9ES21E7"

echo "Building React app..."
npm run build

echo "Deploying to s3://$BUCKET_NAME/$PREFIX ..."
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME/$PREFIX" --delete

if [ ! -z "$DISTRIBUTION_ID" ]; then
  echo "Invalidating CloudFront cache..."
  aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/$PREFIX/*"
fi

echo "Deployment complete!"
