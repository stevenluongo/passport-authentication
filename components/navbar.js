import styles from "./navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import Logo from "../public/images/logo-light.png";

function Navbar () {
    const handleLogout = async() => {
        const res = await fetch("/api/logout")
        const data = await res.json()
        console.log(data)
    }
    return (
        <nav className={styles.nav}>
            <Image height={30} width={30} className={styles.brand} src={Logo} alt="Website Logo"/>
            <span>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </span>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar;