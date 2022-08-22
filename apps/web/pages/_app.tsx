import React from 'react';
import type { AppProps } from 'next/app';
import withTwindApp from '@twind/next/app';
import { MainLayout } from '../components/main/main-layout';
import twindConfig from '../twind.config';

// * --------------------------------------------------------------------------- comp

/**
 * https://nextjs.org/docs/advanced-features/custom-app
 */
function App({ Component, pageProps, ...appProps }: AppProps) {
  const pathname = appProps.router.pathname;

  const routers = {
    '/about': MainLayout,
    '/home': MainLayout,
    '/contact': MainLayout,
  };

  const Layout = routers[pathname] ?? MainLayout;

  return (
    <Layout>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default withTwindApp(twindConfig, App);
