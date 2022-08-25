import { ReactElement } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from './_app';
import { tw, css } from '@blog/css';
import { useAtom, useAtomValue } from 'jotai';
import { NotionService } from '../services/notion';
import { currentPageState, pageSizeState } from '../store';
// * ---------------------------
import { PostCard } from '../components/post-card';
import { MainFooter } from '../components/main/main-footer';
import { MainLayout } from '../components/main/main-layout';

// * --------------------------------------------------------------------------- page

const Index: NextPageWithLayout = ({ list }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
  const loadedPostsNumber = isLastPage ? totalPostsNumber : currentPage * pageSize;
  const postList = list.slice(0, loadedPostsNumber);

  const handleLoadMore = () => {
    setCurrentPage((prev) => (isLastPage ? prev : prev + 1));
  };

  return (
    <>
      <main className={tw`flex justify-center w-[600px] overflow-hidden ${main}`}>
        <div className={tw`flex flex-col w-full overflow-auto ${scroll}`}>
          <div className={tw`flex flex-col w-full align-center justify-start relative`}>
            {postList.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}

            <div className={tw`flex pb-2 px-2 justify-between`}>
              <div>{`${loadedPostsNumber} / ${totalPostsNumber}`}</div>
              <div className={tw`hover:cursor-pointer`} onClick={handleLoadMore}>
                Load More
              </div>
            </div>
          </div>

          <MainFooter />
        </div>
      </main>

      <aside className={tw`w-60`}>sidebar</aside>
    </>
  );
};

// * --------------------------------------------------------------------------- layout

Index.getLayout = (children: ReactElement) => {
  return <MainLayout>{children}</MainLayout>;
};

// * --------------------------------------------------------------------------- style

const scroll = css`
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const main = css`
  height: calc(100vh - 3rem);
`;

// * --------------------------------------------------------------------------- getStaticProps

export const getStaticProps: GetStaticProps = async () => {
  const notion = new NotionService();
  const test = await notion.getPostList();
  const list = await notion.getPostList();

  return { props: { list, test } };
};

export default Index;
