import styles from "../pages/repsonsive.module.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className={styles.header}>
            <img src="" alt="logo" />
            <div className={styles.menu}>
            <ul>
                <li> <Link to="/"> Home </Link> </li>
                <li> bla</li>
                <li>bla</li>
                <li>smple</li>
                <li><Link to="/auth"> Login/Register </Link> </li>
            </ul>
            </div>
        </div>

    );
};

export default Header;