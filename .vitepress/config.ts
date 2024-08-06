import {defineConfig} from 'vitepress'
import {nav, sidebar} from './auto'

export default defineConfig({
    title: "刷题记录",
    description: "收集个人在leetcode，牛客网上的刷题记录",
    srcDir: './problems',
    appearance: false,
    themeConfig: {
        aside: false,
        nav,
        sidebar,
        socialLinks: [
            {icon: 'github', link: 'https://github.com/CodecStack/question-list'}
        ]
    }
})