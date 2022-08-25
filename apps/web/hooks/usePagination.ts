import { useAtom, useAtomValue } from 'jotai';
import { currentPageState, pageSizeState } from '../store';

// * --------------------------------------------------------------------------- hook

export const usePagination = <T>(list: T[]) => {
  const pageSize = useAtomValue(pageSizeState);
  const [currentPage, setCurrentPage] = useAtom(currentPageState);

  const totalPostsNumber = list.length;

  const pageCount =
    totalPostsNumber % pageSize < 0
      ? 0
      : totalPostsNumber % pageSize > 0
      ? Math.floor(totalPostsNumber / pageSize) + 1
      : Math.floor(totalPostsNumber / pageSize);

  const isLastPage = currentPage === pageCount;
  const isFirstPage = currentPage === 1;

  const loaded = isLastPage ? totalPostsNumber : currentPage * pageSize;
  const postList = list.slice(0, loaded);

  const onPrev = () => setCurrentPage((prev) => (isFirstPage ? 1 : prev - 1));
  const onNext = () => setCurrentPage((prev) => (isLastPage ? prev : prev + 1));

  return { onPrev, onNext, loaded: loaded, total: list.length, list: postList };
};
