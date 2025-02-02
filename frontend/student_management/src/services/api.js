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
export const searchDepartments = (query) => {
    return axios.get(`/api/departments/search?query=${query}`);
};

// user
export const getAvailableManagers = () => {
    return axios.get("/api/users/managers/available");
};
// môn học

export const getAllSubjects = () => {
    return axios.get("/api/subjects/");
};
export const addNewSubject = (code, name, credits, department) => {
    return axios.post("/api/subjects/", { code, name, credits, department });
};
export const updateSubject = (id, code, name, credits, department) => {
    return axios.put(`/api/subjects/${id}`, {
        code,
        name,
        credits,
        department,
    });
};
export const deleteSubject = (id) => {
    return axios.delete(`/api/subjects/${id}`);
};

// sinh vien
export const getAllStudent = () => {
    return axios.get("/api/students/");
};
export const addNewStudent = (
    studentID,
    name,
    email,
    dateOfBirth,
    department,
    enrollmentYear
) => {
    return axios.post("/api/students/", {
        studentID,
        name,
        email,
        dateOfBirth,
        department,
        enrollmentYear,
    });
};
export const updateStudent = (
    id,
    studentID,
    name,
    email,
    dateOfBirth,
    department,
    enrollmentYear
) => {
    return axios.put(`/api/students/${id}`, {
        studentID,
        name,
        email,
        dateOfBirth,
        department,
        enrollmentYear,
    });
};
export const deleteStudent = (id) => {
    return axios.delete(`/api/students/${id}`);
};
