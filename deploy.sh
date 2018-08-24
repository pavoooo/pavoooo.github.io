#!/usr/bin/env sh

set -e

rm -rf ./blog

mkdir ./blog

cp -R /Users/zhaosai/Documents/51s/own/vueps/.vuepress/dist/* ./blog

git status

git add -A

git commit -m 'deploy'

git push origin master

