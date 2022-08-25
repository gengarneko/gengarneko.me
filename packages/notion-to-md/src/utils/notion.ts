import { Client } from '@notionhq/client';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import { ListBlockChildrenResponseResults } from '../types';

export const getBlockChildren = async (notionClient: Client, block_id: string, totalPage: number | null) => {
  try {
    let result: ListBlockChildrenResponseResults = [];
    let pageCount = 0;
    let start_cursor;

    do {
      const response = (await notionClient.blocks.children.list({
        start_cursor: start_cursor,
        block_id: block_id,
      })) as ListBlockChildrenResponse;
      result.push(...response.results);

      start_cursor = response?.next_cursor;
      pageCount += 1;
      // TODO:  // GengarNeko 2022/08/9
      // eslint-disable-next-line no-unmodified-loop-condition
    } while (start_cursor !== null && (totalPage === null || pageCount < totalPage));

    modifyNumberedListObject(result);
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const modifyNumberedListObject = (blocks: ListBlockChildrenResponseResults) => {
  let numberedListIndex = 0;

  for (const block of blocks) {
    if ('type' in block && block.type === 'numbered_list_item') {
      // add numbers
      // @ts-ignore
      block.numbered_list_item.number = ++numberedListIndex;
    } else {
      numberedListIndex = 0;
    }
  }
};
