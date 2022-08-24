import { Client } from '@notionhq/client';
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { Post } from '../domains/post';
import { mock_results } from './mock';

// * --------------------------------------------------------------------------- const

const DEFAULT_SORT = [{ property: 'update_time', direction: 'descending' as 'descending' | 'ascending' }];

// * ---------------------------------------------------------------------------

export class NotionService {
  private readonly client: Client;

  public constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
  }

  /**
   * get page list for PostList component by pagination
   *
   * https://developers.notion.com/reference/retrieve-a-page
   */
  public async getPostList() {
    console.log('getPostList');
    const database_id = process.env.NOTION_BLOG_DATABASE_ID ?? '';

    // * --------------------------- fetch list

    const sorts = DEFAULT_SORT;
    let has_more = true;
    let start_cursor;
    // let results: QueryDatabaseResponse['results'] = [];
    // @ts-ignore
    let results: QueryDatabaseResponse['results'] = mock_results;

    // while (has_more) {
    while (!has_more) {
      const databaseData = await this.client.databases.query({ database_id, sorts, start_cursor });
      has_more = databaseData.has_more;
      start_cursor = databaseData.next_cursor;
      // results = results.concat(databaseData.results);
    }

    // * --------------------------- trans to post

    const posts: Post[] = results.map((page: any) => {
      const cover = page.cover && page.cover.type === 'external' ? page.cover.external.url : null;
      const getVal = (name: string) => getNotionPropertyValue(page?.properties[name]);

      return {
        id: page.id,
        cover,
        title: getVal('title'),
        description: getVal('description'),
        create_time: getVal('create_time'),
        update_time: getVal('update_time'),
        likes_count: getVal('likes_count'),
        views_count: getVal('views_count'),
        author: getVal('author'),
        status: getVal('status'),
        tags: getVal('tags'),
      };
    });

    // * ---------------------------

    return posts;
  }

  /**
   * get blocks
   */
  public async getPostBlocks(block_id: string) {
    const blocks = await this.client.blocks.children.list({ block_id });
    return blocks;
  }
}

// * --------------------------------------------------------------------------- util

export const getNotionPropertyValue = (property: any) => {
  if (!property) return null;

  let res;

  switch (property.type) {
    case 'select':
      res = property.select.name;
      break;

    case 'date':
      res = property.date.start;
      break;

    case 'multi_select':
      res = property.multi_select;
      break;

    case 'number':
      res = property.number;
      break;

    case 'title':
      res = property.title[0].plain_text;
      break;

    case 'rich_text':
      res = property.rich_text[0].plain_text;
      break;

    case 'people':
      res = property.people[0].name;
      break;

    default:
      res = undefined;
  }

  return res ?? null;
};
