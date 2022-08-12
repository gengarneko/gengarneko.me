import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { Post } from '../domains/post';
import { retrieveSinglePagePropertyItem } from './retrieve-single-page-property-item';
import { getNotionPropertyValue } from './get-notion-property-value';
import pMap from 'p-map';

// * --------------------------------------------------------------------------- util

export const getSinglePost = async (client: Client, page: PageObjectResponse): Promise<Post> => {
  const cover = page.cover && page.cover.type === 'external' ? page.cover.external.url : null;

  console.log(page.properties, 111111111111111);

  const pageId = page.id;
  const propertyIds = Object.values(page.properties).map((item) => item.id);
  const propertyEntries = Object.entries(page.properties);
  const propertyValues = await pMap(
    propertyIds,
    (id) => retrieveSinglePagePropertyItem(client, { page_id: pageId, property_id: id }),
    { concurrency: 4 },
  );

  const properties = propertyIds.map((propertyId) => ({
    id: propertyId,
    name: propertyEntries.find(([, { id }]) => id === propertyId)[0],
    // @ts-ignore
    value: getNotionPropertyValue(propertyValues.find((item) => item.key === propertyId)),
  }));

  const getPropertyValue = (propertyName: string) =>
    properties.find((property) => property.name === propertyName).value;

  return {
    id: page.id,
    cover,
    title: getPropertyValue('title'),
    description: getPropertyValue('description'),
    create_time: getPropertyValue('create_time'),
    update_time: getPropertyValue('update_time'),
    likes_count: getPropertyValue('likes_count'),
    views_count: getPropertyValue('views_count'),
    author: getPropertyValue('author'),
    status: getPropertyValue('status'),
    tags: getPropertyValue('tags'),
  };
};
