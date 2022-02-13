import { useAuth } from "../context/AuthContext";
import Modal from "react-modal";
import { CssTextField, GithubButton, LoadingBtn } from ".";
import GitHub from "@mui/icons-material/GitHub";
import { useRef } from "react";

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
  const {modalIsOpen, setModalOpen, isProcessing, setIsProcessing} = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async(evt) => {
    evt.preventDefault();
    console.log("HELLO")
    setIsProcessing(true)
    const username = usernameRef.current.childNodes[1].childNodes[0].value;
    const password = passwordRef.current.childNodes[1].childNodes[0].value
    if(!username || !password) {
        setIsProcessing(false);
        return;
    }
    const user = {username, password}
    console.log(user)
    const res = await fetch("/api/login", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    })
  
    const data = await res.json();

    console.log(data);
    setIsProcessing(false)
    if(!data.msg.msgError) {
        setTimeout(() => {
            setIsProcessing(false)
            closeModal();
            setUser(data.user);
        }, 500);
    }
}

const handleGithub = () => {
    console.log("LOADING")
    setIsProcessing(true)
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
        <GithubButton className="login_github" startIcon={<GitHub/>} style={{width: "100%", padding: '.65rem'}}> Sign in with GitHub</GithubButton>
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
        <p className="login_footer">Don't have an account ? <span>Sign Up</span></p>
    </>
</Modal>
  );
}