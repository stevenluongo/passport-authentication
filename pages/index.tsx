import GitHubIcon from '@mui/icons-material/GitHub';
import { PrimaryButton, SecondaryButton } from "../components/index";
import { useAuth } from "../context/AuthContext";

function Landing() {
  const { user, setUser, setModalOpen, authService } = useAuth();

  const logoutHandler = async () => {
    const { success, user, message } = await authService.logout();
    if(!success) console.error(message);
    setUser(user);
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
            <PrimaryButton onClick={logoutHandler}>Log out</PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => setModalOpen(true)}>
              Try it !
            </PrimaryButton>
          )}
          <SecondaryButton
            href="https://github.com/stevenluongo/next.js-passport-auth"
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
