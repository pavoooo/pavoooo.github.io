#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { EOL } = require('os')

const basePath = '/Users/zhaosai/Documents/51s/own/zhaosaisai.github.io/'
const filePath = path.join(basePath, 'articles/good-writings.md')
const [title, link, publish, emoji] = process.argv.slice(2)

function deploy() {
    const { exec } = require('child_process')
    console.log('开始push...')
    const deploy = exec('./deploy.sh 1', {
        cwd: basePath
    }, (err, stdout, stderr) => {
        if (err) {
            return console.error('发布错误...')
        }
        if (stdout) {
            console.log(stdout)
        }
    })
}

if (!title || !link) {
    console.error('请输入完成的文章标题和链接')
    return process.exit(1)
} else {
    console.log('正在添加...')
    fs.appendFileSync(filePath, `${EOL}- [${title}](${link}) ${emoji ? ':'+emoji+':' : ''}`)
    console.log('添加成功，马上push...')
    !!publish && deploy()
}
