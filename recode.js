#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { EOL } = require('os')

const basePath = '/Users/zhaosai/Documents/51s/own/zhaosaisai.github.io/'
const filePath = path.join(basePath, 'articles/good-writings.md')
const [title, link, publish] = process.argv.slice(2)

function deploy() {
    const { exec } = require('child_process')
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
    fs.appendFileSync(filePath, `${EOL}- [${title}](${link})`)
    !!publish && deploy()
}
