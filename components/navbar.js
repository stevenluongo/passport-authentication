import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import {useUser} from "../lib/hooks";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal"
import { TextField } from "@material-ui/core";
import Github from "@material-ui/icons/GitHub"
import { useAuth } from "../context/AuthContext";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        background: 'transparent'
    }
};

  Modal.setAppElement('#__next');


function Navbar () {
    const user = useUser();
    const {currentUser, setUser} = useAuth();
    const [modalIsOpen, setIsOpen] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

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
    }

    const closeModal = () => {
        setIsOpen(false);
    }


    const handleSubmit = async(evt) => {
        evt.preventDefault();
        const user = {
            username: usernameRef.current.childNodes[1].childNodes[0].value,
            password: passwordRef.current.childNodes[1].childNodes[0].value
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
            closeModal();
            setUser(data.user);
        }
    }
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <h3>Auth.</h3>
            </Link>
            {currentUser ?
                <button className={styles.logout} onClick={handleLogout}>Logout</button>
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
            className={styles.modal}
        >
            <div className={styles.modal}>

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField ref={usernameRef} id="filled-basic" label="Username" variant="filled" />
                <TextField ref={passwordRef} id="filled-basic" type="password" label="Password" variant="filled" />
                <button className={styles.buttonGradient} type="submit">Login</button>
            </form>
            <p>Or Login With</p>
            <a href="/api/auth/github">
                <Github/>
            </a>
            </div>
        </Modal>
        </nav>
    )
}

export default Navbar;