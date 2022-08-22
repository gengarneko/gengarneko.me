import { tw } from 'twind';
import slugify from 'slugify';
import { NotionService } from '../../services/notion';

// * --------------------------------------------------------------------------- page

export default function Post({ post }) {
  return (
    <div className={tw`flex h-full flex-col justify-center items-center`}>
      <h1 className={tw`text-4xl mb-5 font-bold`}>Contact</h1>
      <span className={tw`text-7xl`}>1231313</span>
      <p>{JSON.stringify(post, null, 2)}</p>
    </div>
  );
}

// * --------------------------------------------------------------------------- getStaticPaths

export const getStaticPaths = async () => {
  const notion = new NotionService();
  const postList = await notion.getPostList();

  const paths = postList.map((post) => ({
    params: {
      pid: slugify(post.title).toLowerCase(),
    },
  }));

  console.log(paths, 22222222);

  return {
    paths,
    fallback: false,
  };
};

// * --------------------------------------------------------------------------- getStaticProps

export const getStaticProps = async ({ params: { pid } }) => {
  const notion = new NotionService();
  const postList = await notion.getPostList();

  const post = postList.find((post) => slugify(post.title).toLowerCase() === pid);
  const blocks = await notion.getPostBlocks(post.id);

  const title = post.title;
  const ingredients = [];
  const method = [];

  blocks.results.forEach((block) => {
    // if (block?.type === 'bulleted_list_item') {
    //   ingredients.push(block.bulleted_list_item.text[0].plain_text);
    // }
    //
    // if (block?.type === 'numbered_list_item') {
    //   method.push(block.numbered_list_item.text[0].plain_text);
    // }
  });

  return {
    props: {
      post: {
        title,
        ingredients,
        method,
        blocks,
      },
    },
  };
};
