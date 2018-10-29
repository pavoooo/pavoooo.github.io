const path = require('path')

const resolve = p => path.resolve(__dirname, '../..', p)

module.exports = {
    title: '赛赛的空间',
    description: '赵赛赛个人博客，关注前端技术，后端技术，喜欢编程。每天进步一点点就好啦！',
    dest: resolve('./blog'),
    base: '/blog/',
    serviceWorker: true,
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon',  href: '/favicon.ico' }],
        ['script', { type: 'text/javascript', src: '/bdtj.js' }]
    ],
    themeConfig: {
        serviceWorker: {
            updatePopup: true
        },
        nav: [
            { text: '我的文章', link: '/' },
            { text: '阅读的好文', link: '/good-writings.html' },
            { text: 'Linux', link: '/linux.html' },
            { text: 'Github', link: 'https://github.com/zhaosaisai' }
        ],
        logo: '/logo.png',
        sidebar: false
    },
    markdown: {
        anchor: {
            level: 2
        },
        lineNumbers: true
    }
}