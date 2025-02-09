// src/context/UserContext.js
import React, { createContext, useState } from "react";

// Tạo context cho user
export const UserContext = createContext();

// Provider để bao bọc ứng dụng và cung cấp thông tin người dùng
export const UserProvider = ({ children }) => {
    // Khởi tạo state từ localStorage nếu có
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Hàm đăng nhập: cập nhật state và lưu vào localStorage
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Hàm đăng xuất: xóa state và xóa khỏi localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
