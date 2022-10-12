import React, { useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { useAuth } from '../../context/AuthContext';
import GitHubIcon from '@mui/icons-material/GitHub';
import auth_service from '../../services/auth_service';
import { PrimaryButton, SecondaryButton } from '../index';

function Landing() {
  const { user, setUser, setModalOpen } = useAuth();

  useEffect(async () => {
    console.log('hello');
    const res = await fetch('/api/hello');
    const data = await res.json();
    console.log(data);
  }, []);

  const handleLogout = async () => {
    try {
      const data = await auth_service.logout();
      if (data.success) setUser(data.user);
      else throw new Error('Something went wrong...');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app_wrapper">
      <Fade duration={1000} top distance="20px">
        <div className="app_content">
          {user ? (
            <h1>Welcome back, {user.username} !</h1>
          ) : (
            <h1>
              Next.js Authentication flow <br /> built with Passport.
            </h1>
          )}
          <p>
            Implement a secure authentication system for Next.js built with
            <br />
            Passport that supports custom credentials and third party logins.
          </p>
          <span>
            {user ? (
              <PrimaryButton onClick={handleLogout}>Log out</PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => setModalOpen(true)}>
                Try it !
              </PrimaryButton>
            )}
            <SecondaryButton
              href="https://github.com/binolt/next.js-passport-auth"
              target="_blank"
              rel="noreferrer"
              endIcon={<GitHubIcon />}
            >
              View Repository
            </SecondaryButton>
          </span>
        </div>
      </Fade>
    </div>
  );
}

export default Landing;
