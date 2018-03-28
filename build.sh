#!/bin/sh

npm install
npm run build

mkdir -p ./output/webroot/static/nscm

cp -r ./output/* ./output/webroot/static/nscm
rm -rf ./output/index.html
rm -rf ./output/static
rm -rf ./output/webroot/static/nscm/webroot
rm -rf ./output/webroot/static/nscm/.DS_Store
rm -rf ./output/webroot/static/nscm/.svn
rm -rf ./output/webroot/static/nscm/.git


