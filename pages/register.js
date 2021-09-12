import React, {useRef, useState} from 'react';
import {useRouter} from "next/router";


export default function Register() {
    const router = useRouter()
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const [message, setMessage] = useState({});
    
    const handleSubmit = async(evt) => {
        evt.preventDefault();
        if(!nameRef.current.value) {
            setMessage({msgBody: "Cannot Leave Blank", msgError: true})
            return;
        }
        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value
        }

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
            nameRef.current.value = ""
            passwordRef.current.value = ""
        }
    }
    return (
      <>
          <p>Register</p>
          <form onSubmit={handleSubmit}>
              <input type="text" ref={nameRef} placeholder="Name"/>
              <input type="password" ref={passwordRef} placeholder="Password"/>
              <button type="submit">Create New User</button>
          </form>
          {message && <p>{message.msgBody}</p>}
      </>
    )
}