import Layout from '../components/layout'
import App from 'next/app';
import React from 'react';
import '../styles.scss';

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
