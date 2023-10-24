import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export const NavBar = () => {
    return (
     
        
            
         
            <div className={styles.menu}>
              <ul>
                <li> <Link to="/"> Home </Link> </li>
                <li> bla</li>
                <li>bla</li>
                <li>smple</li>
                <li><Link to="/auth"> Login/Register </Link> </li>
              </ul>
            </div>
           
    );
};