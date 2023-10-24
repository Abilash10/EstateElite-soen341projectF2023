import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export const NavBar = (props) => {
    return (
     
        
            
         
            <div className={styles.menu}>
              <ul>
                <li> <Link to="/"> Home </Link> </li>
                <li> bla</li>
                <li>bla</li>

               { props.isBroker ? <li> create listing</li> : <li> view listing</li>}
                <li><Link to="/auth"> Login/Register </Link> </li>
              </ul>
            </div>
           
    );
};