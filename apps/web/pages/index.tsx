import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { tw } from 'twind';
import { PostCard } from '../components/post-card';
import { NotionService } from '../services/notion';
import { MainFooter } from '../components/main/main-footer';

// * --------------------------------------------------------------------------- page

const Home: NextPage = ({ list }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log(postIdList, postIdList.length, '+++++++++++++++');
  // console.log(list, '_______________');

  return (
    <div className={tw`flex flex-col w-full`}>
      <div className={tw`flex flex-col w-full align-center justify-start relative`}>
        {list.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <MainFooter />
    </div>
  );
};

// * ---------------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async () => {
  const notionClient = new NotionService();
  // const ids = await notionClient.getPostIds();
  // const list = await notionClient.getPostList();
  const list = notionClient.getMockPostList();

  return { props: { list } };
};

export default Home;
