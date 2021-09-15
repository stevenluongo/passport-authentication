import Layout from '../components/layout'
import App from 'next/app';
import '../styles/styles.scss';

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp;
