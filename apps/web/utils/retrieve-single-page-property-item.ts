import { Client } from '@notionhq/client';
import { GetPagePropertyResponse } from '@notionhq/client/build/src/api-endpoints';

// * --------------------------------------------------------------------------- util

export const retrieveSinglePagePropertyItem = (
  notionClient: Client,
  { page_id, property_id }: { page_id?: string | null; property_id?: string | null },
): Promise<GetPagePropertyResponse> => {
  const errorMsg = !page_id ? 'Illegal page id' : 'Illegal property id';

  if (!page_id || !property_id) {
    return Promise.reject(new Error(errorMsg));
  }

  return notionClient.pages.properties.retrieve({ page_id, property_id }).then((res) => ({ ...res, key: property_id }));
};
