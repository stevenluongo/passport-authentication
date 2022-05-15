import { useAuth } from "../context/AuthContext";
import Modal from "react-modal";
import { CssTextField, GithubLoadingButton, LoadingBtn } from ".";
import GitHub from "@mui/icons-material/GitHub";
import { useRef } from "react";
import { useRouter } from "next/router";
import auth_service from "../services/auth_service";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    outline: 0,
  },
  overlay: {
      background: '#000000b6',
  }
};

Modal.setAppElement('#__next');

export default function Login() {
  const { modalIsOpen, setModalOpen, isProcessing, setIsProcessing, isGithubProcessing, setIsGithubProcessing, setUser } = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter()

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    setIsProcessing(true)
    const username = usernameRef.current.childNodes[1].childNodes[0].value;
    const password = passwordRef.current.childNodes[1].childNodes[0].value
    if(!username || !password) {
        setIsProcessing(false);
        return;
    }
    const user = { username, password }
    const data = await auth_service.login(user);

    setIsProcessing(false)
    if(data.success) {
        setTimeout(() => {
            setModalOpen(false);
            setUser(data.user);
        }, 500);
    }
}

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
        <a style={{textDecoration: 'none', width: '100%'}} onClick={() => setIsGithubProcessing(true)} href="/api/auth/github">
          <GithubLoadingButton  loading={isGithubProcessing} startIcon={<GitHub/>} sx={{width: "100%", p: '0.65rem'}}>Sign up with Github</GithubLoadingButton>
        </a>
        <span className="login_break">
          <hr/>
          <p>or Sign in with Email</p>
          <hr/>
        </span>
        <form onSubmit={handleSubmit}>
            <CssTextField autoComplete="false" ref={usernameRef} sx={{width: '100%'}} label="Email Address" id="custom-css-outlined-input-email" name="email_address" />
            <CssTextField ref={passwordRef} type="password" sx={{width: '100%', m: '1rem 0'}} label="Password" id="custom-css-outlined-input-password" name="email_address" />
            <LoadingBtn
                className='a_c_d_summary_item_button'
                loading={isProcessing}
                variant="contained"
                style={{width: "100%", padding: '.65rem'}}
                type="submit"
            >
            Login
            </LoadingBtn>
        </form>
        <p className="login_footer">Don't have an account ? <span onClick={() => { setModalOpen(false); router.push("/register")}} style={{textDecoration: 'underline'}}>Sign Up</span></p>
    </>
</Modal>
  );
}