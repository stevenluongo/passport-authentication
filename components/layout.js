import Navbar from "./navbar";
import Particles from "react-tsparticles";
import { options } from "../lib/data";
import Login from "./login";

function Layout ({children}) {
    return (
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