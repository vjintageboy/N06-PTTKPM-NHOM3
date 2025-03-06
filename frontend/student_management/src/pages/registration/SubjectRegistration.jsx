// src/pages/SubjectRegistration.jsx
import React, { useState, useEffect, useContext } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import {
    getAvailableSubjects,
    getRegisteredSubjects,
    registerSubject,
    cancelRegistration,
} from "../../services/api";
import { UserContext } from "../../context/userContext";

const SubjectRegistration = () => {
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [registeredSubjects, setRegisteredSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);
    // Hàm tải danh sách Subject chưa đăng ký
    const fetchAvailableSubjects = async () => {
        try {
            const data = await getAvailableSubjects(user.student._id);

            setAvailableSubjects(data.subjects || []);
        } catch (error) {
            console.error(error);
            message.error("Lỗi khi tải danh sách môn học chưa đăng ký");
        }
    };

    // Hàm tải danh sách Subject đã đăng ký
    const fetchRegisteredSubjects = async () => {
        try {
            const data = await getRegisteredSubjects(user.student._id);

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
    const handleRegister = async (studentId, subjectId) => {
        setLoading(true);
        try {
            const data = await registerSubject(studentId, subjectId);
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
    // Hàm hủy đăng ký môn học
    const handleCancelRegistration = async (studentId, subjectId) => {
        setLoading(true);

        try {
            const data = await cancelRegistration(studentId, subjectId);
            console.log(data);

            message.success(data.message || "Hủy đăng ký thành công");
            // Làm mới danh sách sau khi hủy đăng ký
            fetchAvailableSubjects();
            fetchRegisteredSubjects();
        } catch (error) {
            console.error(error);
            const errMsg =
                error.response?.data?.message || "Hủy đăng ký thất bại";
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // Định nghĩa cột cho bảng
    const columns = [
        { title: "Mã môn học", dataIndex: "code", key: "code" },
        { title: "Tên môn học", dataIndex: "name", key: "name" },
        {
            title: "Khoa",
            dataIndex: "department",
            key: "department",
            render: (department) => department?.name || "Không xác định",
        },
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
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận đăng ký môn học"}
                        description={
                            "Bạn có chắc chắn muốn đăng ký môn học này ?"
                        }
                        onConfirm={() =>
                            handleRegister(user.student._id, record._id)
                        }
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button type="primary" loading={loading}>
                            Đăng ký
                        </Button>
                    </Popconfirm>
                ) : (
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận hủy đăng ký môn học"}
                        description={
                            "Bạn có chắc chắn muốn hủy đăng ký môn học này ?"
                        }
                        onConfirm={() =>
                            handleCancelRegistration(
                                user.student_id,
                                record._id
                            )
                        }
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Button type="primary" danger loading={loading}>
                            Hủy Đăng ký
                        </Button>
                    </Popconfirm>
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
