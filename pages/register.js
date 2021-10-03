import React, {useRef, useState} from 'react';
import {useRouter} from "next/router";


export default function Register() {
    const router = useRouter()
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const [message, setMessage] = useState({});
    
    const handleSubmit = async(evt) => {
        evt.preventDefault();
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(!username || !email) {
            setMessage({msgBody: "Cannot Leave Blank", msgError: true})
            return;
        }
        const user = {email, username, password}

        const res = await fetch("/api/user", {
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

        console.log(data)

        setMessage(data);
        if(!data.msgError) {
            usernameRef.current.value = ""
            passwordRef.current.value = ""
        }
    }
    return (
      <>
          <p>Register</p>
          <form onSubmit={handleSubmit}>
              <input type="text" ref={emailRef} placeholder="Email Address"/>
              <input type="text" ref={usernameRef} placeholder="Username"/>
              <input type="password" ref={passwordRef} placeholder="Password"/>
              <button type="submit">Create New User</button>
          </form>
          {message && <p>{message.msgBody}</p>}
      </>
    )
}