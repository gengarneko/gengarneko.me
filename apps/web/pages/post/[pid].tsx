import { NotionToMarkdown } from '@blog/n2m';
import { Client } from '@notionhq/client';
import ReactMarkdown from 'react-markdown';
import slugify from 'slugify';
import { tw } from 'twind';
import { css } from 'twind/css';

import { MainLayout } from '@/components/main/main-layout';
import { NotionService } from '@/services/notion';

// * --------------------------------------------------------------------------- page

export default function Post({ post }) {
  return (
    <MainLayout>
      <main className={tw`w-[600px]`}>
        <div className={tw`flex min-h-full w-full flex-col justify-start items-start p-4`}>
          <div className={tw`flex-1 w-full h-full bg-white z-10 border(2 solid black) px-6 py-4 ${shadow}`}>
            <ReactMarkdown>{post.markdown}</ReactMarkdown>
          </div>
        </div>
      </main>

      <aside className={tw`pl-8 pt-2`}>article aside</aside>
    </MainLayout>
  );
}

// * --------------------------------------------------------------------------- style

const shadow = css`
  box-shadow: 3px 3px #000;
`;

// * --------------------------------------------------------------------------- getStaticPaths

export const getStaticPaths = async () => {
  const notion = new NotionService();
  const postList = await notion.getPostList();

  const paths = postList.map((post) => ({
    params: { pid: slugify(post.title).toLowerCase() },
  }));

  return { paths, fallback: false };
};

// * --------------------------------------------------------------------------- getStaticProps

export const getStaticProps = async ({ params: { pid } }) => {
  const notion = new NotionService();
  const notionClient = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
  const n2m = new NotionToMarkdown({ notionClient });

  const postList = await notion.getPostList();

  const post = postList.find((post) => slugify(post.title).toLowerCase() === pid);
  // TODO: next_cursor // GengarNeko 2022/08/23
  const blocks = await notion.getPostBlocks(post.id).then((res) => res.results);

  const mdBlocks = await n2m.blocksToMarkdown(blocks as any);
  const markdown = n2m.toMarkdownString(mdBlocks);

  return { props: { post: { cover: post.cover, title: post.title, markdown } } };
};
