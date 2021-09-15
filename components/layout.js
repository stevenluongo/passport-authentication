import Navbar from "./navbar";
import {useState, useEffect} from "react";
import {useUser} from "../lib/hooks";

function Layout ({children}) {
    const user = useUser();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if(user !== undefined) {
            setLoaded(true)
        }
    }, [user])
    return loaded && (
        <>
        <Navbar/>
        {children}
        </>
    )
}

export default Layout;