import axios from "../utils/axios-customize";

// auth
export const callLogin = (email, password) => {
    return axios.post("/api/auth/login", {
        email,
        password,
    });
};
export const callLogout = () => {
    return axios.post("/api/auth/logout");
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

// user
export const getAvailableManagers = () => {
    return axios.get("/api/users/managers/available");
};
// môn học
