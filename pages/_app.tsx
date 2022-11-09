import { AppProps } from 'next/app';
import { FC } from 'react';
import 'regenerator-runtime/runtime.js'; //ensures our babel configuration runs without throwing an error
import { Layout } from '../components/layout';
import { GlobalContext } from '../context/globalContext';
import '../styles/styles.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <GlobalContext>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </GlobalContext>
);

export default App;
