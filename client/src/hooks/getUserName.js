import axios from "axios";

export const getUserName = async () => {
    const userID = window.localStorage.getItem("userID");
    const response = await axios.get(`http://localhost:3001/auth/username/${userID}`);
    return response.data.username;
};