import type { AppProps } from 'next/app';
import withTwindApp from '@twind/next/app';
import twindConfig from '../twind.config';
import '../styles/globals.css';

/**
 * https://nextjs.org/docs/advanced-features/custom-app
 */
function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTwindApp(twindConfig, App);
