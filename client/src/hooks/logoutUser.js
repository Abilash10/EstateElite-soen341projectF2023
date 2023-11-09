// Logout functions
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("userType");
        window.localStorage.removeItem("token");
        navigate("/auth");
    };

    return logout;
};

export default useLogout;