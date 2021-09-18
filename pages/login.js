import React, {useRef, useState} from 'react';
import {useRouter} from "next/router";
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const router = useRouter()
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState({});

  const handleSubmit = async(evt) => {
    const {setUser} = useAuth();
    evt.preventDefault();
    if(!nameRef.current.value || !passwordRef.current.value) {
      setMessage({msgError: true, msgBody: "Must fill in all blanks!"});
      return;
    }
    const user = {
      username: nameRef.current.value,
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

    console.log(data);

    setMessage(data.msg)
    
    if(!data.msg.msgError) {
        setUser(data.user);
        nameRef.current.value = ""
        passwordRef.current.value = ""
    }
  }
  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
          <input type="text" ref={nameRef} placeholder="Name"/>
          <input type="password" ref={passwordRef} placeholder="Password"/>
          <button type="submit">Login</button>
      </form>
      {message && <p>{message.msgBody}</p>}
      <h1>Sign In With Github</h1>
      <a href="/api/auth/github">Click Here!</a>
    </>
  )
}