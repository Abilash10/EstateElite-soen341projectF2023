import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie';


const Register = (props) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("buyer");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username, 
                password,
                userType
            });
            alert("registration completed! Now login.")
        } catch (err) {
            console.error(err);
        }
        
    };

    return (
        <div> 
            <form onSubmit={onSubmit }>
                <h2>Register </h2>
               <div>
                <label htmlFor="username">Username: </label>
                <input
                 type="text" 
                 id="username" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value) } />
                 <br/><br/>

                <label htmlFor="password">Password: </label>
                <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                    <div> 
                        <label htmlFor="userType">User Type: </label>
                        <select name="userType" id="userType" onChange={(e) => setUserType(e.target.value)}>
                            <option value="buyer">Buyer</option>
                            <option value="renter">Renter</option>
                            <option value="broker">Broker</option>
                        </select>
                    </div>
                </div>
                <br />
                <button type="submit"> Register </button>
                <br />
                <div>
                    <br />
                <a href="#" onClick={props.onClick} > Have an account? Login here</a>
                </div>
            </form>
        </div>

    );
};

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div> 
            <form>
                <h2>Login </h2>
               <div>
                <label htmlFor="username">Username: </label>
                <input
                 type="text" 
                 id="username" 
                 value={username}
                 onChange={(e) => setUsername(e.target.value) } />
                 <br/><br/>

                <label htmlFor="password">Password: </label>
                <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>

                </div>
                <br />
                <button type="submit"> Login </button>
                <br />
                <div>
                    <br />
                <a href="#" onClick={props.onClick} > Don't have an account? Create account</a>
                </div>
            </form>
        </div>

    );
};


function Auth(props) {

    const [haveAccount, setHaveAccount] = useState(true);
  
    return (
        <div> 
            { haveAccount ?  <Login 
                onClick = {() => setHaveAccount(false)} 
                handleRadioYes = {() => props.setIsBroker(true) } 
                handleRadioNo = {() => props.setIsBroker(false)} /> 
            : 
              <Register 
                onClick= {() => setHaveAccount(true)}
                handleRadioYes = {() => props.setIsBroker(true) } 
                handleRadioNo = {() => props.setIsBroker(false)} 
               /> }
        </div>
    
    );
}

export default Auth;