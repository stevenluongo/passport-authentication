import React, { useEffect } from 'react';
import styles from "../styles/landing.module.scss";
import Particles from 'react-particles-js';
import Image from "next/image";
import PassportLogo from "../public/images/passport.png";
import NextLogo from "../public/images/next-logo.png";
import Code from "@material-ui/icons/Code";
import { params } from "../lib/data";
import { useAuth } from '../context/AuthContext';

function Landing() {
    const {currentUser} = useAuth();

    return (
      <div className={styles.landing}>
          <Particles params={params}/>
          <div className={styles.content}>
            <h1>{currentUser ? `Welcome Back, ${currentUser.username}` : "{ Authentication }"}</h1>
            <h3>Implement a secure and swift authentication<br/>system using Next.js and Passport</h3>
            <span className={styles.logos}>
                <Image width={30} height={30} src={PassportLogo}/>
                <Image width={70} height={70} src={NextLogo}/>
            </span>
            <span className={styles.buttons}>
                <a target="_blank" href="https://github.com/binolt/next.js-passport-auth">
                  <button className={styles.btn1}>Get Started</button>
                </a>
                <a target="_blank" href="https://github.com/binolt/next.js-passport-auth">
                  <button className={styles.btn2}>View Code<Code/></button>
                </a>
            </span>
          </div>
      </div>
    )
}

export default Landing;