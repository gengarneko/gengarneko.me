import type { CollectionEntry } from 'astro:content';

export interface Site {
  TITLE: string;
  DESCRIPTION: string;
  LOGO: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE?: number;
  NUM_PROJECTS_ON_HOMEPAGE?: number;
  POSTS_PER_PAGE: number;
  SITE_URL: string;
}

export interface Metadata {
  TITLE: string;
  DESCRIPTION: string;
}

export type Socials = {
  NAME: string;
  HREF: string;
}[];

export interface Link {
  href: string;
  label: string;
}

export type Blog = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;
