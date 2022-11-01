#!/bin/bash
tag=$1
version="${tag:1}"
echo "Pushed new version ${version}"
cd ./sdk-core
npm version $version --no-git-tag-version
npm publish

sleep 10

cd ../bindgen
yarn add idena-sdk-core@$version --force
npm version $version --no-git-tag-version
yarn build
npm publish

sleep 10

cd ../sdk-tests
yarn build
npm version $version --no-git-tag-version
npm publish

sleep 10

cd ../sdk

yarn add idena-sdk-core@$version --force
yarn add idena-sdk-bindgen@$version --force
yarn add idena-sdk-tests@$version --force
npm version $version --no-git-tag-version
npm publish




