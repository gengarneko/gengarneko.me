import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { tw } from 'twind';
import { css } from 'twind/css';
import { useAtom, useAtomValue } from 'jotai';
import { NotionService } from '../services/notion';
import { currentPageState, pageSizeState } from '../store';
import { PostCard } from '../components/post-card';
import { MainFooter } from '../components/main/main-footer';

// * --------------------------------------------------------------------------- page

const Home: NextPage = ({ list }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    <div className={tw`flex flex-col w-full overflow-auto ${scroll}`}>
      <div className={tw`flex flex-col w-full align-center justify-start relative`}>
        {postList.map((post) => (
          <PostCard key={post.id} post={post} />
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
  );
};

// * --------------------------------------------------------------------------- style

const scroll = css`
  &::-webkit-scrollbar {
    width: 0;
  }
`;

// * ---------------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async () => {
  const notion = new NotionService();
  const test = await notion.getPostList();
  const list = await notion.getPostList();

  return { props: { list, test } };
};

export default Home;
