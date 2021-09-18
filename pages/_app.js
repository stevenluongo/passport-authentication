import Layout from '../components/layout'
import App from 'next/app';
import '../styles/styles.scss';
import { AuthContext } from '../context/AuthContext';

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <AuthContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    )
  }
}

export default MyApp;
