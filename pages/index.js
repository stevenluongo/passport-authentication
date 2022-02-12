import React, { useEffect } from 'react';
import Image from "next/image";
import PassportLogo from "../public/images/passport.png";
import NextLogo from "../public/images/next-logo.png";
import Code from "@material-ui/icons/Code";
import { params } from "../lib/data";
import { useAuth } from '../context/AuthContext';

function Landing() {
    const {currentUser} = useAuth();

    return (
      <div className='app_wrapper'>
      </div>
    )
}

export default Landing;
