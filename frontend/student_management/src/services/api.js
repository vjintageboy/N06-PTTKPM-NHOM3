import axios from "../utils/axios-customize";

export const callLogin = (email, password) => {
    return axios.post("/api/auth/login", {
        email,
        password,
    });
};
