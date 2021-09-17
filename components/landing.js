import React, { useEffect } from 'react';
import styles from "../styles/landing.module.scss";
import Particles from 'react-particles-js';
import Image from "next/image";
import PassportLogo from "../public/images/passport.png";
import NextLogo from "../public/images/next-logo.png";
import Code from "@material-ui/icons/Code";
import { useUser } from "../lib/hooks";
import { params } from "../lib/data";
import { useAuth } from '../context/AuthContext';

function Landing() {
    const user = useUser();
    const {name} = useAuth();

    useEffect(() => {
      console.log(name)
    }, [])
    return (
      <div className={styles.landing}>
          <Particles params={params}/>
          <div className={styles.content}>
            <h1>{user ? `Welcome Back, ${user.username}` : "{ Authentication }"}</h1>
            <h3>Implement a secure and swift authentication<br/>system using Next.js and Passport</h3>
            <span className={styles.logos}>
                <Image width={30} height={30} src={PassportLogo}/>
                <Image width={70} height={70} src={NextLogo}/>
            </span>
            <span className={styles.buttons}>
                <button className={styles.btn1}>Get Started</button>
                <button className={styles.btn2}>View Code<Code/></button>
            </span>
          </div>
      </div>
    )
}

export default Landing;