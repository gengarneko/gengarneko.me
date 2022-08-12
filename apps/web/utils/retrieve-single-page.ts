import { Client } from '@notionhq/client';
import { GetPageResponse } from '@notionhq/client/build/src/api-endpoints';

// * --------------------------------------------------------------------------- util

export const retrieveSinglePage = (
  notionClient: Client,
  { page_id }: { page_id?: string | null },
): Promise<GetPageResponse> => {
  const errorMsg = 'Illegal page id.';

  if (!page_id) {
    return Promise.reject(new Error(errorMsg));
  }

  return notionClient.pages.retrieve({ page_id });
};
