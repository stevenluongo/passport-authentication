import Link from "next/link";
import {useUser} from "../lib/hooks";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal"
import Github from "@material-ui/icons/GitHub"
import { useAuth } from "../context/AuthContext";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      border: 0,
      borderRadius: 0,
      backgroundColor: "#181818"
    },
    overlay: {
        background: '#000000b6',
    }
};



  Modal.setAppElement('#__next');


function Navbar () {
    const user = useUser();
    const {currentUser, setUser} = useAuth();
    const [modalIsOpen, setIsOpen] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };


    useEffect(() => {
        setUser(user);
    }, [user])
    
    const handleLogout = async() => {
        const res = await fetch("/api/logout")
        const data = await res.json()
        if(!data.msg.msgError) setUser(data.user);
    }

    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => {
            usernameRef.current.focus()
        }, 1);
    }

    const closeModal = () => {
        setIsOpen(false);
    }


    const handleSubmit = async(evt) => {
        evt.preventDefault();
        setIsLoading(true)
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
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
        if(!data.msg.msgError) {
            setTimeout(() => {
                setIsLoading(false)
                closeModal();
                setUser(data.user);
            }, 500);
        }
    }

    const handleGithub = () => {
        console.log("LOADING")
        setIsLoading(true)
    }
    return (
        <nav className="nav">
            <h3 className="nav_brand" href="/">Auth</h3>
            <span className="nav_center">
                <p>About</p>
                <p>How it works</p>
                <p>Code</p>
            </span>
            <span className="nav_end">
                <IconButton className="nav_menu_icon" aria-label="delete" onClick={handleClick}>
                    <MenuIcon/>
                </IconButton>
                <p>Log in</p>
                <ColorButton className="nav_signup" variant="contained">Sign up</ColorButton>
                <StyledMenu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>About</MenuItem>
                    <MenuItem onClick={handleClose}>Code</MenuItem>
                    <MenuItem onClick={handleClose}>Log in</MenuItem>
                    <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                </StyledMenu>
            </span>
            {/* <Link href="/">
                <h3>Auth.</h3>
            </Link>
            {currentUser ?
                <button onClick={handleLogout}>Logout</button>
            :
            <span>
                <button onClick={openModal}>Login</button>
                <Link href="/register">
                    <button>Sign Up</button>
                </Link>
            </span>
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login Modal"
                closeTimeoutMS={300}
            >
                <div >
                    <Loader isLoading={isLoading}/>
                    <h1>Sign In</h1>
                    <p>Login to manage your account</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input ref={usernameRef} name="username" type="text"/>
                        <label htmlFor="password">Password</label>
                        <input ref={passwordRef} name="password" type="password"/>
                        <button type="submit">Sign In</button>
                    </form>
                    <h3>OR</h3>
                    <a onClick={handleGithub} href="/api/auth/github">
                        <button><Github/>Sign in with Github</button>
                    </a>
                    <p>Do not have an account? Sign Up</p>
                    <p>Forgot Password?</p>
                </div>
            </Modal> */}
        </nav>
    )
}

const Loader = ({isLoading}) => {
    const override = css`
        display: block;
        height: 4px;
    `;
    return isLoading &&  (
        <div className={styles.loader}>
            <BarLoader css={override} height={10} width={100} color="white"/>
        </div> 
    )
}

export default Navbar;

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    background: 'linear-gradient(56deg, rgba(89,110,213,1) 0%, rgba(80,49,177,1) 100%)',
    fontSize: '0.9em',
    textTransform: 'initial',
    fontFamily: 'Inter, sans-serif',
}));

const StyledMenu = styled((props) => (
    <Menu
      elevation={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      marginTop: theme.spacing(1),
      top: 0,
      left: 0,
      minWidth: 200,
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
        },
      },
    },
  }));