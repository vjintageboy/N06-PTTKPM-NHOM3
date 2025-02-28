import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login"); // Nếu chưa đăng nhập, tự động chuyển hướng
        }
    }, [user, navigate]);

    return user ? children : null;
};

export default ProtectedRoute;
