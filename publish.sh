#!/bin/bash

cd ./sdk-core
npm version $1 --no-git-tag-version
npm publish
cd ../bindgen
npm version $1 --no-git-tag-version
yarn add idena-sdk-core@$1
yarn build
npm publish

cd ../sdk
npm version $1 --no-git-tag-version

yarn add idena-sdk-core@$1
yarn add idena-sdk-bindgen@$1
npm publish


