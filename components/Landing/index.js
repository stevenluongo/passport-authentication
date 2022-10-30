import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import auth_service from "../../services/auth_service";
import { PrimaryButton, SecondaryButton } from "../index";

function Landing() {
  const { user, setUser, setModalOpen } = useAuth();

  const handleLogout = async () => {
    try {
      const data = await auth_service.logout();
      if (data.success) setUser(data.user);
      else throw new Error("Something went wrong...");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app_wrapper">
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
    </div>
  );
}

export default Landing;
