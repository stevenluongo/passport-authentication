import '../styles/styles.scss'; //stylesheet
import Layout from '../components/layout'
import { useState, useEffect } from "react";
import { AppContext } from "../context/AuthContext";
import auth_service from '../services/auth_service';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGithubProcessing, setIsGithubProcessing] = useState(false);

  useEffect(() => {
    load_app();
  }, [])

  const load_app = async() => {
    const data = await auth_service.fetchSession();
    setUser(data.user)
    setLoaded(true)
  }
  
  return loaded && (
    <AppContext.Provider value={{user, setUser, modalIsOpen, setModalOpen, isProcessing, setIsProcessing, isGithubProcessing, setIsGithubProcessing}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  )
}

export default MyApp
