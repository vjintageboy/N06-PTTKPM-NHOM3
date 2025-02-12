// src/pages/SubjectRegistration.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import {
    getAvailableSubjects,
    getRegisteredSubjects,
    registerSubject,
} from "../../services/api";

const SubjectRegistration = () => {
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [registeredSubjects, setRegisteredSubjects] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hàm tải danh sách Subject chưa đăng ký
    const fetchAvailableSubjects = async () => {
        try {
            const data = await getAvailableSubjects();

            setAvailableSubjects(data.subjects || []);
        } catch (error) {
            console.error(error);
            message.error("Lỗi khi tải danh sách môn học chưa đăng ký");
        }
    };

    // Hàm tải danh sách Subject đã đăng ký
    const fetchRegisteredSubjects = async () => {
        try {
            const data = await getRegisteredSubjects();

            setRegisteredSubjects(data.registeredCourses || []);
        } catch (error) {
            console.error(error);
            message.error("Lỗi khi tải danh sách môn học đã đăng ký");
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchAvailableSubjects();
        fetchRegisteredSubjects();
    }, []);

    // Kết hợp hai danh sách với trạng thái
    const combinedSubjects = [
        ...availableSubjects.map((subject) => ({
            ...subject,
            status: "Chưa đăng ký",
        })),
        ...registeredSubjects.map((subject) => ({
            ...subject,
            status: "Đã đăng ký",
        })),
    ];

    // Hàm đăng ký môn học
    const handleRegister = async (subjectId) => {
        setLoading(true);
        try {
            const data = await registerSubject(subjectId);
            message.success(data.message || "Đăng ký thành công");
            // Cập nhật lại danh sách sau khi đăng ký
            fetchAvailableSubjects();
            fetchRegisteredSubjects();
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || "Đăng ký thất bại";
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // Định nghĩa cột cho bảng
    const columns = [
        { title: "Mã môn học", dataIndex: "code", key: "code" },
        { title: "Tên môn học", dataIndex: "name", key: "name" },
        { title: "Khoa", dataIndex: "department", key: "department" },
        { title: "Số tín chỉ", dataIndex: "credits", key: "credits" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => <span>{text}</span>,
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) =>
                record.status === "Chưa đăng ký" ? (
                    <Button
                        type="primary"
                        onClick={() => handleRegister(record._id)}
                        loading={loading}
                    >
                        Đăng ký
                    </Button>
                ) : (
                    <span>Đã đăng ký</span>
                ),
        },
    ];

    return (
        <div style={{ padding: "24px" }}>
            <h2>Đăng ký môn học</h2>
            <Table
                dataSource={combinedSubjects}
                columns={columns}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default SubjectRegistration;
