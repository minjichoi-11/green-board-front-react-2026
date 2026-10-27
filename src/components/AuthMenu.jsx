
import { Link, useNavigate } from "react-router-dom"; 
import { useAuthContext } from "../useAuthContext"

export default function AuthMenu({ onStatus }) {
    const { token, logout } = useAuthContext();
    const navigate = useNavigate();

    async function handlelogout() {
        try {
            await logout();
            navigate("/login");
            onStatus("");

        } catch (error) {
            onStatus(error.message);
        }
    }
    return<>
        {!token && <Link className="login-link" to="/login">로그인</Link>}
        {token && <button className="logout-button" type="button" onClick={handlelogout}>로그아웃</button>}
    </>
}