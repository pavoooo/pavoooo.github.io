#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const util = require('util')
const source = path.resolve(__dirname, './articles/README.md')
const target = path.resolve(__dirname, './README.md')
const host = 'https://zhaosaisai.com/blog'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const banner = `
> Updated by saisai on ${new Date().toLocaleString()} 
`

;(async () => {
  let content = await readFile(source, 'utf-8')
  content = content.replace(/\(([^)]+)\)/g, (_, $1) => {
    return `(${host}${$1})`
  })

  await writeFile(target, content.concat(`\n${banner}`), 'utf-8')
})()
