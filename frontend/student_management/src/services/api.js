import axios from "../utils/axios-customize";

// auth
export const callLogin = (email, password) => {
    return axios.post("/api/auth/login", {
        email,
        password,
    });
};

// department
export const getAllDepartment = () => {
    return axios.get("/api/departments/");
};
export const addNewDepartment = (code, name, manager) => {
    return axios.post("/api/departments/", { code, name, manager });
};
export const updateDepartment = (id, code, name, manager) => {
    const payload = { code, name };
    if (manager) payload.manager = manager;
    return axios.put(`/api/departments/${id}`, payload);
};
export const deleteDepartment = (id) => {
    return axios.delete(`/api/departments/${id}`);
};