import { ReactElement } from 'react';

import { tw, css } from '@blog/css';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { MainFooter } from '@/components/main/main-footer';
import { MainLayout } from '@/components/main/main-layout';
import { PostCard } from '@/components/post-card';
import { Post } from '@/domains/post';
import { usePagination } from '@/hooks/usePagination';
import { NotionService } from '@/services/notion';

import type { NextPageWithLayout } from './_app';

// * --------------------------------------------------------------------------- page

const Index: NextPageWithLayout = ({ list }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { list: postList, loaded, total, onPrev } = usePagination<Post>(list);

  return (
    <>
      <main className={tw`flex justify-center w-[600px] overflow-hidden ${main}`}>
        <div className={tw`flex flex-col w-full overflow-auto ${scroll}`}>
          <div className={tw`flex flex-col w-full align-center justify-start relative`}>
            {postList.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}

            <div className={tw`flex pb-2 px-2 justify-between`}>
              <div>{`${loaded} / ${total}`}</div>
              <div className={tw`hover:cursor-pointer`} onClick={onPrev}>
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
