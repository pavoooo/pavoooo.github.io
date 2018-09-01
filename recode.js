#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { EOL } = require('os')

const basePath = '/Users/zhaosai/Documents/51s/own/zhaosaisai.github.io/'
const filePath = path.join(basePath, 'articles/good-writings.md')

const reader = fs.createReadStream(filePath, 'utf8')
let chunk = ''

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

reader.on('data', data => {
    chunk += data
})

reader.on('end', () => {
    const [title, link, publish] = process.argv.slice(2)
    if (!title || !link) {
        console.error('请输入完成的文章标题和链接')
        return process.exit(1)
    }
    const formatArticle = `- [${title}](${link})`
    const writer = fs.createWriteStream(filePath, 'utf8')
    writer.end(`${chunk}${EOL}${formatArticle}`)
    writer.on('finish', () => {
        console.log(`写入完毕!!! ${publish ? '正在push...' : ''}`)
    })
    !!publish && deploy()
})

reader.read()