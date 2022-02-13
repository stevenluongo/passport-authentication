import {useUser} from "../lib/hooks";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import {useRouter} from "next/router";
import Fade from "react-reveal/Fade"
import { ColorButton, StyledMenu } from ".";

function Navbar () {
    const user = useUser();
    const {currentUser, setUser, setModalOpen} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const router = useRouter()
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
        setModalOpen(true)
    }

    return (
      <Fade duration={1000}>
        <nav className="nav">
            <h3 onClick={() => router.push("/")} className="nav_brand" href="/">Auth</h3>
            <span className="nav_end">
                <IconButton className="nav_menu_icon" aria-label="delete" onClick={handleClick}>
                    <MenuIcon/>
                </IconButton>
                <p onClick={openModal}>Log in</p>
                <ColorButton onClick={() => router.push("/register")} className="nav_signup" variant="contained" >Sign up</ColorButton>
                <StyledMenu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {handleClose(); openModal();}}>Log in</MenuItem>
                    <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                </StyledMenu>
            </span>
        </nav>
      </Fade>
    )
}

export default Navbar;