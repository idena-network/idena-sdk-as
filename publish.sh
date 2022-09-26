#!/bin/bash

cd ./sdk-core
npm version $1 --no-git-tag-version
npm publish


cd ../bindgen
yarn add idena-sdk-core@$1
npm version $1 --no-git-tag-version
yarn build
npm publish


cd ../sdk-tests
yarn build
npm version $1 --no-git-tag-version
npm publish

cd ../sdk

yarn add idena-sdk-core@$1
yarn add idena-sdk-bindgen@$1
yarn add idena-sdk-tests@$1
npm version $1 --no-git-tag-version
npm publish




