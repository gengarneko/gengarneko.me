import { FC } from 'react';

import Head from 'next/head';

// * --------------------------------------------------------------------------- comp

export const Header: FC<{ title?: string }> = ({ title = 'gengarneko.me' }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="gengarneko personal blog" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
