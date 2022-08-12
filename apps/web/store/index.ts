import { atom } from 'jotai';
import { NotionService } from '../services/notion';

// * --------------------------------------------------------------------------- const

const isSSR = typeof window === 'undefined';

const INITIAL_PAGE_ID = 1;

const EMPTY_POST_DATA = {
  title: '',
  url: '',
  text: '',
};

export const preparePostData = async () => {
  const id = INITIAL_PAGE_ID;
  // const prefetched = await fetchData(id);
  const prefetched = {};
  return { [id]: prefetched };
};

// * ---------------------------------------------------------------------------

export const postListPageId = atom(INITIAL_PAGE_ID);

export const postListCache = atom({});

export const postListData = atom((get) => {
  const id = get(postListPageId);
  const cache = get(postListCache);

  if (isSSR || cache[id]) {
    return cache[id] || EMPTY_POST_DATA;
  }
  return new NotionService().getPostIds();
});
