import styles from "./header.module.css";
import { Link } from "react-router-dom";
import logoImg from "../assets/EElogo.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


function Header() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("userType");
        navigate("/auth");
    };

    return (
        <div className={styles.header}>
            <img className={styles.logo} src={logoImg} alt="logo" />
            <div className={styles.menu}>
            <ul>
                <li> <Link to="/"> Home </Link> </li>
                <li>Team</li>
                <li>Contact</li>

                { !cookies.access_token ? 
                    (<li><Link to="/auth"> Login/Register </Link> </li>) : (<li onClick={logout} >  Logout </li> )}
            </ul>
            </div>
        </div>

    );
};

export default Header;