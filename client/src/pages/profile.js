// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getUserName } from "../hooks/getUserName";
import styles from './profile.module.css';

function Profile() {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [broker, setBroker] = useState({
    surname: "",
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    officeAddress: "",
    yearsOfExperience: 1,
    userOwner: userID,
  });
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setBroker({ ...broker, [name]: checked });
    } else {
      setBroker({ ...broker, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/broker",
        { ...broker },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Profile Edited");
      console.log('Sending new profile data:', broker);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUsername = async () => {
      const username = await getUserName();
      setUsername(username);
    };
    getUsername();
  }, []);

  function changePassword(e) {
    const newPassword = document.getElementById("newPassword").value;

    const token = localStorage.getItem("token");

    axios.post("http://localhost:3001/auth/changePassword", { newPassword }, {
        headers: {
            'Authorization': token
        }
    }).then(response => {
        alert("password changed!");
        window.location.pathname = '/';
    }).catch(error => {
        alert("error changing password");
    });
  }

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }
    const token = localStorage.getItem("token");

    axios.delete("http://localhost:3001/auth/deleteAccount", {
      headers: {
        'Authorization': token
      }
    }).then(response => {
      alert("account deleted!");
      window.location.pathname = '/';
    }).catch(error => {
      alert("error deleting account");
    });
  };

  return (
    <div>
      <h1> Profile </h1>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="surname">Surname: </label>
            <input type="text" id="surname" name="surname" value={broker.surname} onChange={handleChange} required className={styles.inputField} />
          </div>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" value={broker.name} onChange={handleChange} required className={styles.inputField} />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="text" id="email" name="email" value={broker.email} onChange={handleChange} required className={styles.inputField} />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={broker.phoneNumber} onChange={handleChange} required className={styles.inputField} />
          </div>
          <div>
            <label htmlFor="companyName">Company Name: </label>
            <input type="text" id="companyName" name="companyName" value={broker.companyName} onChange={handleChange} required className={styles.inputField} />
          </div>
          <div>
            <label htmlFor="officeAddress">Office Address: </label>
            <input type="text" id="officeAddress" name="officeAddress" value={broker.officeAddress} onChange={handleChange} required className={styles.inputField} />
          </div>
          <div>
            <label htmlFor="yearsOfExperience">Years of Experience: </label>
            <input type="number" id="yearsOfExperience" name="yearsOfExperience" value={broker.yearsOfExperience} onChange={handleChange} required className={styles.inputField} />
          </div>
          <button type="submit" className={styles.submitBtn}>Submit</button>
          <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h3> Username: {username}</h3>
          <h3> Change Password:&nbsp;
            <input type="password" id="newPassword" placeholder="Enter new password" className={styles.inputField} />
            <button onClick={changePassword} className={styles.changePasswordBtn}> Submit </button>
          </h3>
          <button onClick={deleteAccount} className={styles.deleteAccountBtn}>Delete Account</button>
          {localStorage.getItem("userType") === "broker" ? (
            <button onClick={() => setEditing(true)} className={styles.editAccountBtn}>Edit Account</button>
          ) : null} 
        </div>
      )}
    </div>
  );
}

export default Profile;
