import Modal from 'react-modal';
import { customStyles } from './data';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import GitHub from '@mui/icons-material/GitHub';
import { useAuth } from '../../context/AuthContext';
import auth_service from '../../services/auth_service';
import { CssTextField, GithubLoadingButton, LoadingBtn } from '../index';
import Link from 'next/link';

Modal.setAppElement('#__next'); //set default app element to bind modal in dom

export default function AuthModal() {
  const {
    modalIsOpen,
    setModalOpen,
    isProcessing,
    setIsProcessing,
    isGithubProcessing,
    setIsGithubProcessing,
    setUser,
  } = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const fetchInputValues = () => {
    const username = usernameRef.current.childNodes[1].childNodes[0].value;
    const password = passwordRef.current.childNodes[1].childNodes[0].value;

    return { username, password };
  };

  const validateInputValues = ({ username, password }) => {
    if (!username) throw new Error('Please provide a username...');
    if (!password) throw new Error('Please provide a password...');

    return true;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault(); //prevent page from re-loading
    setIsProcessing(true); //enable loading state

    try {
      const isValid = validateInputValues(fetchInputValues());

      const { username, password } = fetchInputValues();

      const data =
        isValid && (await auth_service.login({ username, password })); //login user

      if (data.success) {
        setIsProcessing(false); //disable loading state
        setModalOpen(false); //close modal
        setUser(data.user); //update user state
        router.push('/'); //redirect user to homepage
      } else throw new Error(data.message); //handle server_side errors
    } catch (err) {
      setMessage({ error: true, content: err.message }); //display error message
      setIsProcessing(false); //disable loading state
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customStyles}
      contentLabel="Login Modal"
      closeTimeoutMS={300}
      className="modal"
    >
      <>
        <h1>Login</h1>
        <p className="login_subhead">Login to manage your account</p>
        <Link
          style={{ textDecoration: 'none', width: '100%' }}
          onClick={() => setIsGithubProcessing(true)}
          href="/api/auth/github"
        >
          <GithubLoadingButton
            loading={isGithubProcessing}
            startIcon={<GitHub />}
            sx={{ width: '100%', p: '0.65rem' }}
            >
            Sign up with Github
          </GithubLoadingButton>
        </Link>
        <span className="login_break">
          <hr />
          <p>or Sign in with Credentials</p>
          <hr />
        </span>
        <form onSubmit={handleSubmit}>
          <CssTextField
            autoComplete="false"
            ref={usernameRef}
            sx={{ width: '100%' }}
            label="Username"
            id="custom-css-outlined-input-email"
          />
          <CssTextField
            ref={passwordRef}
            type="password"
            sx={{ width: '100%', m: '1rem 0' }}
            label="Password"
            id="custom-css-outlined-input-password"
          />
          <LoadingBtn
            className="a_c_d_summary_item_button"
            loading={isProcessing}
            variant="contained"
            style={{ width: '100%', padding: '.65rem' }}
            type="submit"
          >
            Login
          </LoadingBtn>
          {message && <p>{message.content}</p>}
        </form>
        {/* <p className="login_footer">
          Don't have an account ?
          <span
            onClick={() => {
              setModalOpen(false);
              router.push('/register');
            }}
            style={{ textDecoration: 'underline' }}
          >
            Sign Up
          </span>
        </p> */}
      </>
    </Modal>
  );
}
