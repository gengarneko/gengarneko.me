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

// * --------------------------------------------------------------------------- list

export const pageSizeState = atom(10);
export const currentPageState = atom(1);
