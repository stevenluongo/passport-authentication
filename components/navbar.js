import styles from "./navbar.module.scss";
import Link from "next/link";

function Navbar () {
    const handleLogout = async() => {
        const res = await fetch("/api/user")
        const data = await res.json()
        console.log(data)
    }
    return (
        <nav className={styles.nav}>
            <h1 className={styles.brand}>Ecommerce Dev Build</h1>
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