import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import pMap from 'p-map';
import { retrieveSinglePage } from '../utils/retrieve-single-page';
import { getSinglePost } from '../utils/get-single-post';
import { mockList } from './_mock';

// * ---------------------------------------------------------------------------

export class NotionService {
  private readonly client: Client;

  private _pageIds: string[];
  private set pageIds(value: string[]) {
    this._pageIds = value;
  }
  private get pageIds(): string[] {
    return this._pageIds;
  }

  public constructor() {
    this.client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
  }

  /**
   * get all page ids from single database
   *
   * https://developers.notion.com/reference/post-database-query
   */
  public async getPostIds(): Promise<string[]> {
    const database_id = process.env.NOTION_BLOG_DATABASE_ID ?? '';

    let has_more = true;
    let next_cursor;
    let pageIds: string[] = [];

    type SortDirection = 'descending' | 'ascending';
    const direction: SortDirection = 'descending';
    const sorts = [{ property: 'update_time', direction }];

    while (has_more) {
      const start_cursor = next_cursor;
      const response = await this.client.databases.query({ database_id, sorts, start_cursor });

      if (!response.has_more) has_more = response.has_more;
      if (response.next_cursor) next_cursor = response.next_cursor;

      const _pageIds = pageIds;
      const ids = response.results.map((item) => item.id);
      pageIds = _pageIds.concat(ids);
    }
    // const pages = await pMap(pageIds, (page_id) => retrieveSinglePage(this.client, { page_id }), { concurrency: 4 });

    this._pageIds = pageIds;
    return pageIds;
  }

  /**
   * get page list for PostList component by pagination
   *
   * https://developers.notion.com/reference/retrieve-a-page
   */
  public async getPostList(ids: string[], options?: { pageNumber: number; pageSize: number }) {
    const { pageNumber = 1, pageSize = 10 } = options || {};
    const pageCount =
      ids.length % pageSize < 0
        ? 0
        : ids.length % pageSize > 0
        ? Math.floor(ids.length / pageSize) + 1
        : Math.floor(ids.length / pageSize);

    // * ---------------------------

    const group = (array: string[], subGroupLength: number) => {
      let index = 0;
      const result: string[][] = [];

      while (index < array.length) {
        const newArr = array.slice(index, index + subGroupLength);
        result.push(newArr);
        index += subGroupLength;
      }

      return result;
    };

    const groupedIds = group(ids, pageSize);
    const pageIds = groupedIds[pageNumber - 1] ?? [];

    // * ---------------------------

    const pages = await pMap(pageIds, (page_id) => retrieveSinglePage(this.client, { page_id }), { concurrency: 4 });
    const posts = await pMap(pages, (page: PageObjectResponse) => getSinglePost(this.client, page));
    console.log(posts);

    // * ---------------------------

    return posts;
  }

  /**
   * get mock page list
   */
  public getMockPostList = () => {
    return mockList;
  };
}
