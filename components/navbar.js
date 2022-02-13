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
import { purple } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import GitHub from "@mui/icons-material/GitHub";
import LoadingButton from '@mui/lab/LoadingButton';

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
            usernameRef.current.childNodes[1].childNodes[0].focus()
        }, 1);
    }

    const closeModal = () => {
        setIsOpen(false);
    }


    const handleSubmit = async(evt) => {
        evt.preventDefault();
        console.log("HELLO")
        setIsLoading(true)
        const username = usernameRef.current.childNodes[1].childNodes[0].value;
        const password = passwordRef.current.childNodes[1].childNodes[0].value
        if(!username || !password) {
            setIsLoading(false);
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
        setIsLoading(false)
        // if(!data.msg.msgError) {
        //     setTimeout(() => {
        //         setIsLoading(false)
        //         closeModal();
        //         setUser(data.user);
        //     }, 500);
        // }
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
                <p onClick={openModal}>Log in</p>
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login Modal"
                closeTimeoutMS={300}
                className="modal"
            >
                <>
                    {/* <Loader isLoading={isLoading}/> */}
                    <h1>Sign In</h1>
                    <p className="login_subhead">Login to manage your account</p>
                    <form onSubmit={handleSubmit}>
                        <CssTextField ref={usernameRef} sx={{m: '1rem 0', width: '100%'}} label="Email Address" id="custom-css-outlined-input-email" name="email_address" />
                        <CssTextField ref={passwordRef} type="password" sx={{width: '100%', mb: '1rem'}} label="Password" id="custom-css-outlined-input-password" name="email_address" />
                        <LoadingBtn
                            className='a_c_d_summary_item_button'
                            loading={isLoading}
                            variant="contained"
                            style={{width: "100%", padding: '.65rem'}}
                            type="submit"
                        >
                        Sign In
                        </LoadingBtn>
                    </form>
                    <p style={{margin: '1rem 0', fontSize: 14}}>OR</p>
                    <GithubButton endIcon={<GitHub/>} style={{width: "100%", padding: '.65rem'}}> Log in with GitHub</GithubButton>
                    <p className="login_footer">Don't have an account ? <span>Sign Up</span></p>
                </>
            </Modal>
        </nav>
    )
}

// const Loader = ({isLoading}) => {
//     const override = css`
//         display: block;
//         height: 4px;
//     `;
//     return isLoading &&  (
//         <div className={styles.loader}>
//             <BarLoader css={override} height={10} width={100} color="white"/>
//         </div> 
//     )
// }

export default Navbar;

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    background: 'linear-gradient(56deg, rgba(89,110,213,1) 0%, rgba(80,49,177,1) 100%)',
    fontSize: '14px',
    textTransform: 'initial',
    fontFamily: 'Inter, sans-serif',
}));

const GithubButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    background: 'rgba(0, 0, 0, 0.5)',
    fontSize: '14px',
    textTransform: 'initial',
    fontFamily: 'Inter, sans-serif',
    "&:hover" : {
        background: 'rgba(1, 1, 1, 0.5)'
    }
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

  export const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#868686',
    },
    '& .MuiFormLabel-root': {
      fontSize: '14px',
      color: "#bdbdbd",
    },
    '& .MuiInputLabel-shrink': {
      color: '#bdbdbd',
      fontSize: '16px',
    },
  
    '& .MuiInputBase-input': {
      color: '#FFF',
      fontSize: '14px',
      padding: '1rem'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #868686',
        transition: 'border-color 0.5s ease',
      },
      '&:hover fieldset': {
        borderColor: '#b1b1b1',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#868686',
      },
    },
});

export const LoadingBtn = styled(LoadingButton)({
    color: '#cfc4ff',
    backgroundColor: 'var(--primary-text-accent)',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#472cac',
    },

})