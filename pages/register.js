import React, {useRef, useState} from 'react';
import {useRouter} from "next/router";
import { CssTextField, GithubButton, GithubLoadingButton } from '../components';
import { useAuth } from '../context/AuthContext';
import { LoadingBtn } from '../components';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import GitHub from '@mui/icons-material/GitHub';
import Fade from "react-reveal/Fade";

export default function Register() {
    const router = useRouter()
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const [message, setMessage] = useState({});
    const { isProcessing, setIsProcessing, isGithubProcessing, setIsGithubProcessing } = useAuth();
    
    const handleSubmit = async(evt) => {
        evt.preventDefault();
        const username = usernameRef.current.childNodes[1].childNodes[0].value;
        const email_address = emailRef.current.childNodes[1].childNodes[0].value;
        const password = passwordRef.current.childNodes[1].childNodes[0].value

        setIsProcessing(true)

        if(!username || !email_address) {
            setMessage({msgBody: "Cannot Leave Blank", msgError: true});
            setIsProcessing(false)
            return;
        }
        const user = { email_address, username, password }

        const res = await fetch("/api/user", {
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

        setMessage({body: data.message, error: data.success});
        
        setIsProcessing(false)
        if(data.success) {
            //on success 
            router.push('/');
            usernameRef.current.value = ""
            passwordRef.current.value = ""
        }
    }
    return (
      <div className='app_register'>
        <div className='a_r_content'>
            <Fade duration={1000} top distance="10px">
                <span onClick={() => router.push("/")} className='a_r_subhead'>
                <ArrowLeftIcon/><h3>START FOR FREE</h3>
                </span>
            </Fade>
            <Fade duration={1000} top distance="20px">
                <h1 className='a_r_head'>Create your account<span>.</span></h1>
            </Fade>
            <div className='a_r_c_body'>
                <a style={{textDecoration: 'none'}} onClick={() => setIsGithubProcessing(true)} href="/api/auth/github">
                    <Fade duration={1000} top distance="25px">
                            <GithubLoadingButton  loading={isGithubProcessing} startIcon={<GitHub/>} sx={{width: "100%", p: '0.85rem'}}>Sign up with Github</GithubLoadingButton>
                    </Fade>
                </a>
                <Fade duration={1000} top distance="30px">
                    <span className='a_r_c_b_break'>
                        <hr/>
                        <p>Or Sign Up with Email</p>
                        <hr/>
                    </span>
                    <form style={{display: 'flex', flexDirection: 'column', width: '100%'}} onSubmit={handleSubmit}>
                    <CssTextField ref={usernameRef} sx={{width: '100%', m: '1rem 0'}} label="Username" id="custom-css-outlined-input-username" name="email_address" />
                    <CssTextField ref={emailRef} sx={{width: '100%', mb: '1rem'}} label="Email Address" id="custom-css-outlined-input-email" name="email_address" />
                    <CssTextField ref={passwordRef} type="password" sx={{width: '100%', mb: '1rem'}} label="Password" id="custom-css-outlined-input-password" name="email_address" />
                    <LoadingBtn
                        className='a_c_d_summary_item_button'
                        loading={isProcessing}
                        variant="contained"
                        style={{width: "100%", padding: '.65rem'}}
                        type="submit"
                        >
                    Create Account
                    </LoadingBtn>
                    </form>
                    {message && <p>{message.body}</p>}
                </Fade>
            </div>
        </div>
      </div>
    )
}