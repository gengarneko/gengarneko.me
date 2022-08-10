import { PropertyItemListResponse, PropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const getNotionPropertyValue = (property: PropertyItemObjectResponse | PropertyItemListResponse) => {
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

    case 'property_item':
      if (property.results[0].type === 'title') {
        res = property.results[0].title.plain_text;
      }
      if (property.results[0].type === 'rich_text') {
        res = property.results[0].rich_text.plain_text;
      }
      if (property.results[0].type === 'people') {
        // TODO: fix type error
        // @ts-ignore
        res = property.results[0].people.name;
      }
      break;

    default:
      res = undefined;
  }

  return res;
};
