import GitHub from '@mui/icons-material/GitHub';
import Head from 'next/head';
import Link from 'next/link';
import React, { FC } from 'react';
import { default as ReactModal } from 'react-modal';
import { CssTextField, GithubLoadingButton, LoadingBtn } from '.';
import { useGlobalContext } from '../context/globalContext';
import { AuthService } from '../services/authService';

ReactModal.setAppElement('#__next');

const authService = new AuthService();

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 0,
  },
  overlay: {
    background: '#000000b6',
  },
};

export const Modal: FC = () => {
  const { modalOpen, setModalOpen } = useGlobalContext();
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const [feedback, setFeedback] = React.useState<{
    message: string;
    error?: boolean;
  } | null>(null);
  const [isProcessing, setIsProcessing] = React.useState<{
    local?: boolean;
    github?: boolean;
  }>({ local: false, github: false });
  const { setUser } = useGlobalContext();

  React.useEffect(() => {
    setFeedback(null);
  }, []);

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setFeedback(null);
    setIsProcessing({ local: true });
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      if (!username || !password) throw new Error('Please fill in all fields');

      const response = await authService.login({ username, password });
      if (!response.success) throw new Error(response.message);
      setTimeout(() => {
        setUser(response.user);
        setModalOpen(false);
        setIsProcessing({ local: false });
      }, 1000);
    } catch (e) {
      setTimeout(() => {
        setIsProcessing({ local: false });
        setFeedback({ error: true, message: e.message });
      }, 500);
    }
  };

  return (
    <ReactModal
      isOpen={modalOpen}
      onRequestClose={closeModalHandler}
      style={customStyles}
      contentLabel="Authentication Modal"
      closeTimeoutMS={300}
      className="modal"
    >
      <div>
        <Head>
          <title>Login | Passport Authentication</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <h1 className="modal__header">Login</h1>
        <p className="modal__subheader">Login to manage your account.</p>
        <a
          onClick={() => setIsProcessing({ github: true })}
          href="/api/auth/github"
          style={{ textDecoration: 'none' }}
        >
          <GithubLoadingButton
            loading={isProcessing.github}
            startIcon={<GitHub />}
          >
            GitHub
          </GithubLoadingButton>
        </a>
        <span className="modal__divider">
          <hr />
          <p>or sign in with credentials</p>
          <hr />
        </span>
        <form onSubmit={loginHandler}>
          <CssTextField
            autoComplete="false"
            label="Username"
            id="custom-css-outlined-input-username"
            variant="outlined"
            inputRef={usernameRef}
            autoFocus
          />
          <CssTextField
            autoComplete="false"
            label="Password"
            id="custom-css-outlined-input-password"
            variant="outlined"
            inputRef={passwordRef}
            type="password"
          />
          <LoadingBtn
            className="a_c_d_summary_item_button"
            variant="contained"
            style={{ width: '100%', padding: '.65rem' }}
            type="submit"
            loading={isProcessing.local}
          >
            Sign In
          </LoadingBtn>
        </form>
        {feedback && (
          <p
            style={{ color: feedback.error && '#ff818b' }}
            className="modal__feedback"
          >
            {feedback.message}
          </p>
        )}
        <p className="modal__footer">
          Dont have an account?{' '}
          <span onClick={() => setModalOpen(false)}>
            <Link href="/register">Sign Up</Link>
          </span>
        </p>
      </div>
    </ReactModal>
  );
};
