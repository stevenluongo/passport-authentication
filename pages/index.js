import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Fade from "react-reveal/Fade";
import GitHubIcon from '@mui/icons-material/GitHub';

function Landing() {
    const {currentUser, setUser, setModalOpen} = useAuth();

    const handleLogout = async() => {
      const res = await fetch("/api/logout")
      const data = await res.json()
      if(!data.msg.msgError) setUser(data.user);
    }

    return (
      <div className='app_wrapper'>
        <Fade duration={1000} top distance="20px">
        <div className='app_content'>
          {currentUser ? <h1>Welcome back, {currentUser.username} !</h1> : <h1>Next.js Authentication flow <br/> built with Passport.</h1>}
          <p>Implement a secure authentication system for Next.js built with<br/>Passport that supports custom credentials and third party logins.</p>
          <span>
            {currentUser ? (
            <ColorButton onClick={handleLogout}>
              Log out
            </ColorButton>
            ) : (
            <ColorButton onClick={() => setModalOpen(true)}>
              Try it !
            </ColorButton>
            )}
            <SecondaryButton href="https://github.com/binolt/next.js-passport-auth" target="_blank" rel="noreferrer" endIcon={<GitHubIcon/>}>
              View Repository
            </SecondaryButton>
          </span>
        </div>
        </Fade>
      </div>
    )
}

export default Landing;

const ColorButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: 'linear-gradient(56deg, #7650ff 0%, #7650ff 100%)',
  fontSize: '0.9em',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
  width: 200,
  padding: 12,
}));
const SecondaryButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  background: '#222222',
  fontSize: '0.9em',
  textTransform: 'initial',
  fontFamily: 'Inter, sans-serif',
  width: 200,
  padding: 12,
  '&:hover': {
    backgroundColor: '#7650ff',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
}));