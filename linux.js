#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const util = require('util');

const readdir = util.promisify(fs.readdir)

const source = path.resolve('articles/linux/linux实战技能')
const target = path.resolve('articles/linux.md')
const prefix = '/linux/linux实战技能/'

const isMd = file => file.endsWith('.md')
const ul = name => {
    const link = `${prefix}${name.replace(/\.md/, '.html')}`
    return `\n- [${name.replace(/\.md/, '')}](${link})`
}

let banner = `# 每天一点linux\n`

async function run() {
    const files = await readdir(source)

    files.forEach(file => {
        if (isMd(file)) {
            banner += ul(file)
        }
    })
}

run()
    .then(() => {
        fs.writeFileSync(target, banner)
    })