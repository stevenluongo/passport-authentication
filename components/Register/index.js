import Fade from 'react-reveal/Fade';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import GitHub from '@mui/icons-material/GitHub';
import { useAuth } from '../../context/AuthContext';
import auth_service from '../../services/auth_service';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { CssTextField, GithubLoadingButton, LoadingBtn } from '../index';
import { validateEmail } from '../../lib/helpers';

export default function Register({ csrf_token }) {
  const [message, setMessage] = useState(null);

  //hooks
  const {
    isProcessing,
    setIsProcessing,
    isGithubProcessing,
    setIsGithubProcessing,
    setUser,
  } = useAuth();
  const router = useRouter();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  const fetchInputValues = () => {
    const username = usernameRef.current.childNodes[1].childNodes[0].value;
    const email_address = emailRef.current.childNodes[1].childNodes[0].value;
    const password = passwordRef.current.childNodes[1].childNodes[0].value;
    return { username, email_address, password };
  };

  const validateInputValues = ({ username, email_address, password }) => {
    if (!username) throw new Error('Please provide a username...');
    if (!email_address) throw new Error('Please provide an email address...');
    if (!password) throw new Error('Please provide a password...');

    //validate email address
    if (!validateEmail(email_address))
      throw new Error('Please provide a valid email address');

    return true;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault(); //prevent page from re-loading
    setIsProcessing(true); //enable loading state
    try {
      const isValid = validateInputValues(fetchInputValues());

      const { username, email_address, password } = fetchInputValues();

      const data =
        isValid &&
        (await auth_service.register(csrf_token, {
          username,
          email_address,
          password,
        })); //register user

      if (data.success) {
        setIsProcessing(false); //disable loading state

        setMessage({ success: true, content: data.message }); //display success message

        setTimeout(async () => {
          const data = await auth_service.login({ username, password }); //login user
          setUser(data.user); //update user state

          router.push('/'); //redirect user to homepage
        }, 1500);
      } else throw new Error(data.message); //handle server_side errors
    } catch (err) {
      setMessage({ error: true, content: err.message }); //display error message
      setIsProcessing(false); //disable loading state
    }
  };

  return (
    <div className="app_register">
      <div className="a_r_content">
        <Fade duration={1000} top distance="10px">
          <span onClick={() => router.push('/')} className="a_r_subhead">
            <ArrowLeftIcon />
            <h3>START FOR FREE</h3>
          </span>
        </Fade>
        <Fade duration={1000} top distance="20px">
          <h1 className="a_r_head">
            Create your account<span>.</span>
          </h1>
        </Fade>
        <div className="a_r_c_body">
          <a
            style={{ textDecoration: 'none' }}
            onClick={() => setIsGithubProcessing(true)}
            href="/api/auth/github"
          >
            <Fade duration={1000} top distance="25px">
              <GithubLoadingButton
                loading={isGithubProcessing}
                startIcon={<GitHub />}
                sx={{ width: '100%', p: '0.85rem' }}
              >
                Sign up with Github
              </GithubLoadingButton>
            </Fade>
          </a>
          <Fade duration={1000} top distance="30px">
            <>
              <span className="a_r_c_b_break">
                <hr />
                <p>Or Sign Up with Email</p>
                <hr />
              </span>
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
                onSubmit={handleSubmit}
              >
                <CssTextField
                  ref={usernameRef}
                  sx={{ width: '100%', m: '1rem 0' }}
                  label="Username"
                  id="custom-css-outlined-input-username"
                  name="email_address"
                />
                <CssTextField
                  ref={emailRef}
                  sx={{ width: '100%', mb: '1rem' }}
                  label="Email Address"
                  id="custom-css-outlined-input-email"
                  name="email_address"
                />
                <CssTextField
                  ref={passwordRef}
                  type="password"
                  sx={{ width: '100%', mb: '1rem' }}
                  label="Password"
                  id="custom-css-outlined-input-password"
                  name="email_address"
                />
                <LoadingBtn
                  className="a_c_d_summary_item_button"
                  loading={isProcessing}
                  variant="contained"
                  style={{ width: '100%', padding: '.65rem' }}
                  type="submit"
                >
                  Create Account
                </LoadingBtn>
              </form>
              {message && <p>{message.content}</p>}
            </>
          </Fade>
        </div>
      </div>
    </div>
  );
}
