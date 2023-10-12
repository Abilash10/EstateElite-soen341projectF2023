import { useState } from "react";



const Register = (props) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div> 
            <form>
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


function Auth() {

    const [haveAccount, setHaveAccount] = useState(true);


    return (
        <div> 
            { haveAccount ?  <Login onClick = {() => setHaveAccount(false)} /> : 
              <Register onClick= {() => setHaveAccount(true)} /> }
        </div>
    
    );
}

export default Auth;