import React from 'react';
import { useGlobalContext } from '../context/globalContext';
import { AuthService } from '../services/authService';

const authService = new AuthService();

const Button = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { setModalOpen, user, setUser } = useGlobalContext();

  const handleClick = (e) => {
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(() => {
      e.target.classList.remove('animate');
      user ? logoutHandler() : setModalOpen(true);
    }, 700);
  };

  const logoutHandler = async () => {
    const response = await authService.logout();
    if (!response.error) setUser(null);
  };

  return (
    <div id="button" ref={ref} className="middle">
      <button onClick={handleClick} className="confetti-button">
        {user ? 'Logout' : 'Try it out!'}
      </button>
    </div>
  );
});

Button.displayName = 'Button';

export default Button;
