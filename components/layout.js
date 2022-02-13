import Navbar from "./navbar";
import {useState, useEffect} from "react";
import {useUser} from "../lib/hooks";
import Particles from "react-tsparticles";
import { options } from "../lib/data";
import Login from "./login";

function Layout ({children}) {
    const user = useUser();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(user !== undefined) {
            setLoaded(true)
        }
    }, [user]);

    return loaded && (
        <div className="layout">
            <Particles
                options={options}
                id="tsparticles"
                width='100vw'
                height='100vh'
            />
            <div className="layout_content_wrapper">
                <div className="layout_content">
                    <Navbar/>
                    <Login/>
                    <div className="layout_body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;