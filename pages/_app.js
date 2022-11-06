import { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime.js'; //ensures our babel configuration runs without throwing an error
import Layout from '../components/Layout';
import { AppContext } from '../context/AuthContext';
import { AuthService } from '../services/authService';
import '../styles/styles.scss'; //stylesheet

const authService = new AuthService();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGithubProcessing, setIsGithubProcessing] = useState(false);

  useEffect(() => {
    load_app();
  }, []);

  const load_app = async () => {
    const data = await authService.fetchSession();
    if (data.user) setUser(data.user);
    setLoaded(true);
  };

  return (
    loaded && (
      <AppContext.Provider
        value={{
          user,
          setUser,
          modalIsOpen,
          setModalOpen,
          isProcessing,
          setIsProcessing,
          isGithubProcessing,
          setIsGithubProcessing,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    )
  );
}

export default MyApp;
