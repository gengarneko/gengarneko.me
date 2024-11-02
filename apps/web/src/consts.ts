import type { Metadata, Site, Link, Socials } from '@types'

export const SITE: Site = {
  TITLE: 'gengarneko.me',
  DESCRIPTION: 'A personal website',
  LOGO: 'https://avatars.githubusercontent.com/u/16524264?v=4&size=64',
  EMAIL: 'gengarneko@gmail.com',
  NUM_POSTS_ON_HOMEPAGE: 2,
  POSTS_PER_PAGE: 4,
  SITE_URL: 'https://gengarneko.me',
}

export const NAV_LINKS: Link[] = [
  { href: '/', label: 'home' },
  { href: '/blog', label: 'blog' },
  // { href: '/authors', label: 'authors' },
  { href: '/about', label: 'about' },
  // { href: '/tags', label: 'tags' },
]

export const SOCIAL_LINKS: Link[] = [
  { href: 'https://github.com/gengarneko', label: 'GitHub' },
  { href: 'https://twitter.com/gengarneko', label: 'Twitter' },
  { href: 'gengarneko@gmail.com', label: 'Email' },
  { href: '/rss.xml', label: 'RSS' },
]

export const SOCIALS: Socials = [
  { NAME: 'GitHub', HREF: 'https://github.com/gengarneko' },
  { NAME: 'Twitter', HREF: 'https://twitter.com/gengarneko' },
  { NAME: 'Email', HREF: 'gengarneko@gmail.com' },
  { NAME: 'RSS', HREF: '/rss.xml' },
]

export const HOME: Metadata = {
  TITLE: 'Home',
  DESCRIPTION: 'Astro Micro is an accessible theme for Astro.',
}

export const BLOG: Metadata = {
  TITLE: 'Blog',
  DESCRIPTION: 'A collection of articles on topics I am passionate about.',
}

export const PROJECTS: Metadata = {
  TITLE: 'Projects',
  DESCRIPTION:
    'A collection of my projects with links to repositories and live demos.',
}
