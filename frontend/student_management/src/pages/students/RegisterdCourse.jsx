import { useEffect, useState } from "react";
import { Table, Button, Typography, Modal, InputNumber, Form } from "antd";
import {
    getRegisteredSubjects,
    addStudentGrade,
    getGradeOfStudent,
} from "../../services/api";

const { Title } = Typography;

const RegisteredCourses = ({ studentData, isAdmin }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [grades, setGrades] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchRegisteredCourses();
        fetchGrades();
    }, [studentData]);

    const fetchRegisteredCourses = async () => {
        setLoading(true);
        const response = await getRegisteredSubjects(studentData._id);
        if (response && response.registeredCourses) {
            setCourses(response.registeredCourses);
        }
        setLoading(false);
    };
    const fetchGrades = async () => {
        const response = await getGradeOfStudent(studentData._id);
        if (response && response.data) {
            setGrades(response.data);
        }
    };

    const handleOpenModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const handleAddGrade = async (values) => {
        if (!selectedCourse) return;

        const student = studentData._id;
        const subject = selectedCourse._id;
        const attendanceScore = values.attendanceScore;
        const midtermScore = values.midtermScore;
        const finalScore = values.finalScore;

        await addStudentGrade(
            student,
            subject,
            attendanceScore,
            midtermScore,
            finalScore
        );
        setIsModalOpen(false);
        fetchRegisteredCourses();
    };

    const columns = [
        {
            title: "Môn học",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số tín",
            dataIndex: "credits",
            key: "credits",
        },
        isAdmin && {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => handleOpenModal(record)}>
                    Nhập điểm
                </Button>
            ),
        },
    ].filter(Boolean);

    const ungradedSubjects = courses.filter((course) => {
        if (!course || !course._id) {
            console.warn("Lỗi dữ liệu môn học:", course);
            return false; // Bỏ qua nếu dữ liệu môn học không hợp lệ
        }

        return !grades.some((grade) => {
            if (!grade || !grade.subject || !grade.subject._id) {
                console.warn("Lỗi dữ liệu điểm:", grade);
                return false; // Bỏ qua nếu dữ liệu điểm không hợp lệ
            }

            return grade.subject._id === course._id;
        });
    });

    return (
        <div style={{ padding: 20 }}>
            <Title level={4}>Môn học đã đăng ký</Title>
            <Table
                columns={columns}
                dataSource={ungradedSubjects}
                loading={loading}
                bordered
            />

            <Modal
                title="Nhập điểm"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddGrade} layout="vertical">
                    <Form.Item
                        name="attendanceScore"
                        label="Điểm chuyên cần"
                        rules={[
                            { required: true, message: "Vui lòng nhập điểm!" },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={10}
                            step={0.1}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="midtermScore"
                        label="Điểm giữa kỳ"
                        rules={[
                            { required: true, message: "Vui lòng nhập điểm!" },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={10}
                            step={0.1}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="finalScore"
                        label="Điểm cuối kỳ"
                        rules={[
                            { required: true, message: "Vui lòng nhập điểm!" },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            max={10}
                            step={0.1}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RegisteredCourses;
