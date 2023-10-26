import axios from "axios";
import { getUserName } from "../hooks/getUserName";
import { useEffect, useState } from "react";

function Profile() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const getUsername = async () => {
            const username = await getUserName();
            setUsername(username);
        };
        getUsername();
    }, []);

    function changePassword(e) {
        const newPassword = document.getElementById("newPassword").value;
    
        const token = localStorage.getItem("token"); // assuming you store the JWT in local storage
    
        axios.post("http://localhost:3001/auth/changePassword", { newPassword }, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            // Handle success
            alert("password changed!");
            window.location.pathname = '/';
        }).catch(error => {
            // Handle error
            alert("error changing password");
        });
    }

    return (
        <div>
            <h1> Profile </h1>
            <h3> Username: {username}</h3>
            <h3> Change Password:&nbsp;
                <input type="password" id="newPassword" placeholder="Enter new password" />
                <button onClick={changePassword}> Submit </button>
            </h3>

        </div>
    );
};

export default Profile;