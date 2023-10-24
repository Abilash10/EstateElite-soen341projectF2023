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
                    <div> 
                        <p>Are you a Broker ? </p>
                        <label htmlFor="yes" > Yes </label>
                        <input type="radio" id="yes" name="type_of_user" value="Yes"
                                onClick={props.handleRadioYes} />

                        <label htmlFor="no" > No</label>
                        <input type="radio" id="no" name="type_of_user" value="No" 
                                onClick={props.handleRadioNo}/>

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
                <div> 
                        <p>Are you a Broker ? </p>
                        <label htmlFor="yes" > Yes </label>
                        <input type="radio" id="yes" name="type_of_user" value="Yes" 
                                onClick={props.handleRadioYes} />

                        <label htmlFor="no" > No</label>
                        <input type="radio" id="no" name="type_of_user" value="No" 
                                onClick={props.handleRadioNo} />

                    </div>
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