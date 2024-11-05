import { getEntry } from 'astro:content';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @description 合并 class
 * @param inputs - 类名
 * @returns 合并后的类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @description 格式化日期
 * @param date - 日期
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date) {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * @description 计算阅读时间
 * @param html - 文章内容
 * @returns 阅读时间
 */
export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, '');
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

/**
 * @description 解析作者
 * @param authors - 作者 slug 列表
 * @returns 作者信息列表
 */
export async function parseAuthors(authors?: string[]) {
  if (!authors || authors.length === 0) return [];

  const parseAuthor = async (slug: string) => {
    try {
      const author = await getEntry('authors', slug);
      return {
        slug,
        name: author?.data?.name || slug,
        avatar: author?.data?.avatar || '/static/logo.png',
        isRegistered: !!author,
      };
    } catch (error) {
      console.error(`Error fetching author with slug ${slug}:`, error);
      return {
        slug,
        name: slug,
        avatar: '/static/logo.png',
        isRegistered: false,
      };
    }
  };

  return await Promise.all(authors.map(parseAuthor));
}

/**
 * @description 获取已过去的时间
 * @param unixTimestamp - 时间戳
 * @returns 已过去的时间
 */
export function getElapsedTime(unixTimestamp: number): string {
  const createdAt = new Date(unixTimestamp);
  const now = new Date();
  let difference = now.getTime() - createdAt.getTime();
  const hours = Math.floor(difference / (1000 * 60 * 60));
  difference -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(difference / (1000 * 60));
  difference -= minutes * (1000 * 60);
  const seconds = Math.floor(difference / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} elapsed`;
}
