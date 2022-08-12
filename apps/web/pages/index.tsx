import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { tw } from 'twind';
import { PostCard } from '../components/post-card';
import { NotionService } from '../services/notion';
import { MainFooter } from '../components/main/main-footer';
import { css } from 'twind/css';

// * --------------------------------------------------------------------------- page

const Home: NextPage = ({ list }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log(postIdList, postIdList.length, '+++++++++++++++');
  // console.log(list, '_______________');

  return (
    <div className={tw`flex flex-col w-full overflow-auto ${scroll}`}>
      <div className={tw`flex flex-col w-full align-center justify-start relative`}>
        {list.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
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
  const notionClient = new NotionService();
  const ids = await notionClient.getPostIds();
  const list = await notionClient.getPostList(ids);
  // const list = notionClient.getMockPostList();
  return { props: { list } };
};

export default Home;
