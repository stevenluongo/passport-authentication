import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import {useUser} from "../lib/hooks";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal"
import { TextField } from "@material-ui/core";
import Github from "@material-ui/icons/GitHub"
import { useAuth } from "../context/AuthContext";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

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
        <nav className={styles.nav}>
            <Link href="/">
                <h3>Auth.</h3>
            </Link>
            {currentUser ?
                <button className={styles.buttonGradient} onClick={handleLogout}>Logout</button>
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
                <div className={styles.modal}>
                    <Loader isLoading={isLoading}/>
                    <h1>Sign In</h1>
                    <p>Login to manage your account</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input ref={usernameRef} name="username" type="text"/>
                        <label htmlFor="password">Password</label>
                        <input ref={passwordRef} name="password" type="password"/>
                        <button className={styles.buttonGradient} type="submit">Sign In</button>
                    </form>
                    <h3>OR</h3>
                    <a onClick={handleGithub} href="/api/auth/github">
                        <button className={styles.github}><Github/>Sign in with Github</button>
                    </a>
                    <p>Do not have an account? Sign Up</p>
                    <p>Forgot Password?</p>
                </div>
            </Modal>
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