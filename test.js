const { exec } = require('child_process')

const e = exec('ls', (err, stdout) => {
    console.log(stdout)
})

e.on('exit', () => {
    console.log('结束了')
})