export interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
}

export const sidebar: Record<string, SidebarItem[]> = {
  docs: [
    {
      text: '开始',
      items: [
        { text: '简介', link: '/docs/introduction' },
        { text: '快速开始', link: '/docs/getting-started' },
      ],
    },
    {
      text: '核心概念',
      items: [
        { text: '项目结构', link: '/docs/project-structure' },
        { text: '配置', link: '/docs/configuration' },
      ],
    },
  ],
}
