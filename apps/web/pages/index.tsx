import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { tw } from 'twind';
import { Client } from '@notionhq/client';
import { PostCard } from '../components/post-card';
import { retrieveSinglePage } from '../utils/retrieve-single-page';
import pMap from 'p-map';
import { getNotionPropertyValue } from '../utils/get-notion-property-value';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { Post } from '../domains/post';
import { retrieveSinglePagePropertyItem } from '../utils/retrieve-single-page-property-item';

// * --------------------------------------------------------------------------- page

const Home: NextPage = ({ postIdList, db, db2 }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // console.log(db, db2, '==============');
  return (
    <div className={tw`mt-20 flex flex-col align-center justify-center w-[768px]`}>
      {postIdList.map((postId: string, index) => (
        <PostCard key={index} id={postId} />
      ))}
    </div>
  );
};

// * ---------------------------------------------------------------------------

export const getStaticProps: GetStaticProps = async () => {
  const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
  const database_token = process.env.NOTION_ACCESS_TOKEN;
  const database_id = process.env.NOTION_BLOG_DATABASE_ID;

  const db = await client.databases.retrieve({ database_id });
  const db2 = await client.databases.query({ database_id });
  const db3 = await client.databases.query({ database_id, start_cursor: db2.next_cursor });

  console.log(db, db2.results.length, db3.results.length, db3.next_cursor, db3, 1111111111111);

  const postIdList = await client.databases.query({ database_id }).then((res) => res.results.map((item) => item.id));

  // * ---------------------------

  // const firstPage = postIdList.slice(0, 16);
  // const notionPages = await pMap(firstPage, (page_id) => retrieveSinglePage(client, { page_id }), {
  //   concurrency: 2,
  // });
  //
  // // * ---------------------------
  //
  // const getSinglePost = async (page: PageObjectResponse): Promise<Post> => {
  //   const cover = page.cover && page.cover.type === 'external' ? page.cover.external.url : null;
  //
  //   const pageId = page.id;
  //   const propertyIds = Object.values(page.properties).map((item) => item.id);
  //   const propertyEntries = Object.entries(page.properties);
  //   const propertyValues = await pMap(
  //     propertyIds,
  //     (id) => retrieveSinglePagePropertyItem(client, { page_id: pageId, property_id: id }),
  //     { concurrency: 4 },
  //   );
  //
  //   const properties = propertyIds.map((propertyId) => ({
  //     id: propertyId,
  //     name: propertyEntries.find(([, { id }]) => id === propertyId)[0],
  //     value: getNotionPropertyValue(propertyValues.find((item) => item.key === propertyId)),
  //   }));
  //
  //   const getPropertyValue = (propertyName: string) =>
  //     properties.find((property) => property.name === propertyName).value;
  //
  //   return {
  //     cover,
  //     title: getPropertyValue('title'),
  //     description: getPropertyValue('description'),
  //     create_time: getPropertyValue('create_time'),
  //     update_time: getPropertyValue('update_time'),
  //     likes_count: getPropertyValue('likes_count'),
  //     views_count: getPropertyValue('views_count'),
  //     author: getPropertyValue('author'),
  //     status: getPropertyValue('status'),
  //     tags: getPropertyValue('tags'),
  //   };
  // };
  //
  // const posts: Post[] = await pMap(notionPages, getSinglePost);

  // * ---------------------------

  return { props: { postIdList, db, db2 } };
};

export default Home;
