import * as fs from 'node:fs'
import yaml from 'js-yaml'

const navDir = fs.readdirSync('./problems').filter(name => !name.endsWith('.md')).sort()

export const nav = generateNav()
export const sidebar = generateSidebar()

function generateNav() {
    const nav = []
    for (let navName of navDir) {
        nav.push({text: navName, link: `/${navName}/README.md`, activeMatch: `/${navName}/`})
    }
    return nav;
}

function generateSidebar() {
    const sidebar = {}
    for (let navName of navDir) {
        const navList = []
        const sidebarDir = fs.readdirSync(`./problems/${navName}`).filter(name => name != 'README.md').sort()
        let readme = `# ${navName}\n\n---\n\n| 题目 | 链接 | 难度 | 分类 | 标签 | 创建时间 | 更新时间 |\n|----|----|----|----|----|----|----|\n`

        let seq = 1;
        const categorySidebarMap = new Map()
        for (let sidebarName of sidebarDir) {
            const content = fs.readFileSync(`./problems/${navName}/${sidebarName}`, 'utf-8')
            const meta = yaml.load(/---(.*?)---/sg.exec(content)[1])

            meta['createTime'] = formatDate(meta['createTime'])
            meta['updateTime'] = formatDate(meta['updateTime'])

            const sidebarList = categorySidebarMap.get(meta['category']) || []
            sidebarList.push(sidebarName)
            categorySidebarMap.set(meta['category'], sidebarList)

            sidebarName.split('_')[1].replace('.md', '')
            readme += `|  [${seq++}. ${meta['title']}](/${navName}/${sidebarName})  |  [跳转](${meta['link']})  |  ${meta['difficulty']}  |  ${meta['category']}  |  ${meta['tags']}  |  ${meta['createTime']}  |  ${meta['updateTime']}  |\n`
        }

        fs.writeFileSync(`./problems/${navName}/README.md`, readme)

        categorySidebarMap.forEach((sidebarList, category) => {
            const items = []
            let seq = 1;
            for (let sidebarName of sidebarList) {
                items.push({
                    text: `${seq++}. ${sidebarName.split('_')[1].replace('.md', '')}`,
                    link: `/${navName}/${sidebarName}`
                })
            }
            navList.push({text: category, items})
        })
        sidebar[`/${navName}/`] = navList
    }
    return sidebar;
}

function formatDate(date) {
    const year = date.getUTCFullYear().toString().padStart(4, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hour = date.getUTCHours().toString().padStart(2, '0');
    const minute = date.getUTCMinutes().toString().padStart(2, '0');
    const second = date.getUTCSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
