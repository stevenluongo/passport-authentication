import { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime.js'; //ensures our babel configuration runs without throwing an error
import Layout from '../components/Layout';
import { AppContext } from '../context/AuthContext';
import { AuthService } from '../services/authService';
import { UserService } from "../services/userService"; //stylesheet
import '../styles/styles.scss';

const authService = new AuthService();
const userService = new UserService();

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGithubProcessing, setIsGithubProcessing] = useState(false);

  useEffect(() => {
    loadRoute();
  }, []);

  const loadRoute = async () => {
    const { user } = await authService.fetchSession();
    setUser(user);
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
            authService,
            userService
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
