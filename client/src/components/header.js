import styles from "./header.module.css";
import { Link } from "react-router-dom";
import logoImg from "../assets/Estate Elite.png";
import { useCookies } from "react-cookie";
import useLogout from "../hooks/logoutUser";

function Header() {
    // Logout functions
    const [cookies, setCookies] = useCookies(["access_token"]);
    const logout = useLogout();

    const userType = window.localStorage.getItem('userType');


    
    return (
        <div className={styles.header}>
            <img className={styles.logo} src={logoImg} alt="logo" />
            <div className={styles.menu}>
            <ul>
                <li> <Link to="/"> Home </Link> </li>
                { cookies.access_token && window.localStorage.getItem("userType") === "broker" ? <li>
                    <Link to="/addProperty"> Add </Link> </li> : null
                }
                { userType != 'broker' ? <li><Link to="/mortgageCalculator"> Mortgage Calculator </Link></li> : null }
                { userType == 'broker' ? <li> <Link to="/MyProperties"> My Properties </Link></li> : null }


                { userType != 'broker' ? <li> <Link to="/BrokerList"> Broker List </Link></li> : null }

                
                { cookies.access_token ? 
                
                userType == 'broker' ? <li>
                    <Link to="OfferManagement" > Offers </Link>
                    
                </li> : 
                <li>
                     <Link to="/MyOffers"  > My Offers </Link> 
                     </li>
                : null }

               
               <li> <Link to="/founders"> Founders </Link> </li> 
                
                { cookies.access_token ? <li> <Link to="/profile"> Profile </Link> </li> : null}

                { !cookies.access_token ? 
                    (<li><Link to="/auth"> Login/Register </Link> </li>) : (<li onClick={logout} >  Logout </li> )}
            </ul>
            </div>
        </div>

    );
};

export default Header;
