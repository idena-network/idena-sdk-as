#!/bin/bash
tag=$1
version="${tag:1}"
echo "pushed new version ${version}"
cd ./sdk-core
echo "set version"
npm version $version --no-git-tag-version
echo "publish"
npm publish
echo "idena-sdk-core published"

cd ../bindgen
yarn add idena-sdk-core@$version --legacy-peer-deps
npm version $version --no-git-tag-version
yarn build
npm publish


cd ../sdk-tests
yarn build
npm version $version --no-git-tag-version
npm publish

cd ../sdk

yarn add idena-sdk-core@$version --legacy-peer-deps
yarn add idena-sdk-bindgen@$version --legacy-peer-deps
yarn add idena-sdk-tests@$version --legacy-peer-deps
npm version $version --no-git-tag-version
npm publish




