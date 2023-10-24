import styles from "./header.module.css";
import { Link } from "react-router-dom";
import logoImg from "../assets/EElogo.png";

function Header() {
    return (
        <div className={styles.header}>
            <img className={styles.logo} src={logoImg} alt="logo" />
            <div className={styles.menu}>
            <ul>
                <li> <Link to="/"> Home </Link> </li>
                <li>Team</li>
                <li>Contact</li>
                <li><Link to="/auth"> Login/Register </Link> </li>
            </ul>
            </div>
        </div>

    );
};

export default Header;