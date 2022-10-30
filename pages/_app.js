import { useEffect, useState } from "react";
import "regenerator-runtime/runtime.js"; //ensures our babel configuration runs without throwing an error
import Layout from "../components/Layout";
import { AppContext } from "../context/AuthContext";
import auth_service from "../services/auth_service";
import "../styles/styles.scss"; //stylesheet

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
    const data = await auth_service.fetchSession();
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
