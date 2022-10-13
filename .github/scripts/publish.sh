#!/bin/bash
export NODE_AUTH_TOKEN=$2
tag=$1
version="${tag:1}"
echo "Pushed new version ${version}"
cd ./sdk-core
npm version $version --no-git-tag-version
npm publish


cd ../bindgen
yarn add idena-sdk-core@$version
npm version $version --no-git-tag-version
yarn build
npm publish


cd ../sdk-tests
yarn build
npm version $version --no-git-tag-version
npm publish

cd ../sdk

yarn add idena-sdk-core@$version
yarn add idena-sdk-bindgen@$version
yarn add idena-sdk-tests@$version
npm version $version --no-git-tag-version
npm publish




