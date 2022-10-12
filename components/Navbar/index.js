import { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { useRouter } from 'next/router';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { ColorButton, StyledMenu } from '../index';
import { useAuth } from '../../context/AuthContext';
import auth_service from '../../services/auth_service';

function Navbar() {
  const { user, setUser, setModalOpen } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const data = await auth_service.logout();
      if (data.success) setUser(data.user);
      else throw new Error('Something went wrong...');
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <Fade duration={1000}>
      <nav className="nav">
        <h3 onClick={() => router.push('/')} className="nav_brand" href="/">
          Auth
        </h3>
        <span className="nav_end">
          <IconButton
            className="nav_menu_icon"
            aria-label="delete"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          {user ? (
            <ColorButton
              onClick={handleLogout}
              className="nav_signup"
              variant="contained"
            >
              Log out
            </ColorButton>
          ) : (
            <>
              <p onClick={openModal}>Log in</p>
              <ColorButton
                onClick={() => router.push('/register')}
                className="nav_signup"
                variant="contained"
              >
                Sign up
              </ColorButton>
            </>
          )}
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                openModal();
              }}
            >
              Log in
            </MenuItem>
            <MenuItem onClick={handleClose}>Sign Up</MenuItem>
          </StyledMenu>
        </span>
      </nav>
    </Fade>
  );
}

export default Navbar;
