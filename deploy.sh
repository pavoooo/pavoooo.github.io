#!/usr/bin/env sh

set -e

cp -R /Users/zhaosai/Documents/51s/own/vueps/.vuepress/dist ./blog

git status

git add -A

git commit -m 'deploy'

git push origin master

