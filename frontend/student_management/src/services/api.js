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
export const changePassword = (userId, currentPassword, newPassword) => {
    return axios.post("/api/auth/change-password", {
        userId,
        currentPassword,
        newPassword,
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
export const searchDepartments = (query) => {
    return axios.get(`/api/departments/search?query=${query}`);
};

// user
export const getAvailableManagers = () => {
    return axios.get("/api/users/managers/available");
};
export const getAllUsers = () => {
    return axios.get("/api/users/");
};
export const addNewUser = (name, email, password, role, student) => {
    return axios.post("/api/users/", {
        name,
        email,
        password,
        role,
        student,
    });
};
export const updateUser = (id, password) => {
    return axios.put(`/api/users/${id}`, {
        password,
    });
};
export const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
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
export const addNewStudent = (formData) => {
    return axios.post("/api/students/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateStudent = (
    id,
    studentID,
    name,
    email,
    gender,
    dateOfBirth,
    department,
    enrollmentYear
) => {
    return axios.put(`/api/students/${id}`, {
        studentID,
        name,
        email,
        gender,
        dateOfBirth,
        department,
        enrollmentYear,
    });
};
export const deleteStudent = (id) => {
    return axios.delete(`/api/students/${id}`);
};
export const getStudentWithoutUser = () => {
    return axios.get("/api/students/students-without-user/");
};
export const getStudentById = (id) => {
    return axios.get(`/api/students/${id}`);
};

// register course

export const getAvailableSubjects = (studentId) => {
    return axios.get(`/api/courseRegistrations/available/${studentId}`);
};
export const getRegisteredSubjects = (studentId) => {
    return axios.get(`api/courseRegistrations/registered/${studentId}`);
};
export const registerSubject = (studentId, subjectId) => {
    return axios.post(`api/courseRegistrations/register/${studentId}`, {
        subjectId,
    });
};
export const cancelRegistration = (studentId, subjectId) => {
    return axios.delete(`api/courseRegistrations/cancel/${studentId}`, {
        data: { subjectId },
    });
};

// grades

export const getGradeOfStudent = (studentID) => {
    return axios.get(`/api/grades/student/${studentID}`);
};
export const getStatistics = (studentID) => {
    return axios.get(`/api/grades/statistics/${studentID}`);
};
export const updateGrade = (
    gradeId,
    attendanceScore,
    midtermScore,
    finalScore
) => {
    return axios.put(`/api/grades/${gradeId}`, {
        attendanceScore,
        midtermScore,
        finalScore,
    });
};
export const addStudentGrade = (
    student,
    subject,
    attendanceScore,
    midtermScore,
    finalScore
) => {
    return axios.post("/api/grades/", {
        student,
        subject,
        attendanceScore,
        midtermScore,
        finalScore,
    });
};
