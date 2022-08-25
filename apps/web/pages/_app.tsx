import React, { ReactElement, ReactNode } from 'react';

import withTwindApp from '@twind/next/app';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import twindConfig from '../twind.config';

// * --------------------------------------------------------------------------- type

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// * --------------------------------------------------------------------------- comp

/**
 * https://nextjs.org/docs/basic-features/layouts
 */
function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const AppComponent = Component as any;

  return getLayout(<AppComponent {...pageProps} />);
}

export default withTwindApp(twindConfig, App);
