import React from 'react';
import type { AppProps } from 'next/app';
import withTwindApp from '@twind/next/app';
import { Layout as LayoutComp } from '../components/layout';
import twindConfig from '../twind.config';

/**
 * https://nextjs.org/docs/advanced-features/custom-app
 */
function App({ Component, pageProps, ...appProps }: AppProps) {
  const pathname = appProps.router.pathname;

  const routers = {
    '/about': LayoutComp,
    '/home': LayoutComp,
    // * ---------------------------
    '/contact': React.Fragment,
  };

  const Layout = routers[pathname] ?? LayoutComp;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default withTwindApp(twindConfig, App);
