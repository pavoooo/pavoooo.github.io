#!/usr/bin/env sh

set -e

cd articles

vuepress build

cd -

git status

git add -A

git commit -m "deploy in `date +"%Y-%m-%d %H:%m:%S"`"

git push origin master
