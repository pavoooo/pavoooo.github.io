#!/usr/bin/env sh

set -e

test $1 && [ 1 = $1 ] && cd articles && vuepress build && cd -

git status

git add -A

git commit -m "deploy in `date +"%Y-%m-%d %H:%m:%S"`"

git push origin master
