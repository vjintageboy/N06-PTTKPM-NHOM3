import { useEffect, useState, useContext } from "react";
import { Table, Typography, Button, Modal, InputNumber, Form } from "antd";
import { getGradeOfStudent, updateGrade } from "../../services/api";
import { UserContext } from "../../context/UserContext";

const { Title } = Typography;

const StudentGradeOvr = ({ studentData }) => {
    const { user } = useContext(UserContext);
    const [grades, setGrades] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchGrades();
    }, [studentData]);

    const fetchGrades = async () => {
        const response = await getGradeOfStudent(studentData._id);
        if (response && response.data) {
            setGrades(response.data);
            console.log(response.data);
        }
    };

    const handleEdit = (grade) => {
        setEditingGrade(grade);
        form.setFieldsValue({
            attendanceScore: grade.attendanceScore,
            midtermScore: grade.midtermScore,
            finalScore: grade.finalScore,
        });
        setIsModalVisible(true);
    };

    const handleSave = async () => {
        const { attendanceScore, midtermScore, finalScore } =
            form.getFieldsValue();
        await updateGrade(
            editingGrade._id,
            attendanceScore,
            midtermScore,
            finalScore
        );
        setIsModalVisible(false);
        fetchGrades();
    };

    const columns = [
        { title: "Môn học", dataIndex: "subject", key: "subject" },
        {
            title: "Chuyên cần",
            dataIndex: "attendanceScore",
            key: "attendanceScore",
        },
        { title: "Giữa kỳ", dataIndex: "midtermScore", key: "midtermScore" },
        { title: "Cuối kỳ", dataIndex: "finalScore", key: "finalScore" },
        { title: "Hệ 4", dataIndex: "score4", key: "score4" },
        { title: "Hệ 10", dataIndex: "score10", key: "score10" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span style={{ color: status === "Học lại" ? "red" : "green" }}>
                    {status}
                </span>
            ),
        },
        user?.role === "admin" && {
            title: "Hành động",
            key: "action",
            render: (_, grade) => (
                <Button onClick={() => handleEdit(grade)}>Chỉnh sửa</Button>
            ),
        },
    ].filter(Boolean);
    // Xử lý dữ liệu cho bảng
    const processedData = grades.map((grade, index) => ({
        _id: grade._id,
        key: index,
        subject: grade.subject.name,
        attendanceScore: grade.attendanceScore,
        midtermScore: grade.midtermScore,
        finalScore: grade.finalScore,
        score4: grade.grade4,
        score10: grade.averageScore,
        status: grade.status === "Retake" ? "Học lại" : "Đạt",
    }));

    return (
        <div style={{ padding: 20 }}>
            <Title level={4}>Bảng Điểm</Title>
            <Table
                columns={columns}
                dataSource={processedData}
                pagination={false}
                bordered
            />
            <Modal
                title="Chỉnh sửa điểm"
                open={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Chuyên cần" name="attendanceScore">
                        <InputNumber
                            min={0}
                            max={10}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item label="Giữa kỳ" name="midtermScore">
                        <InputNumber
                            min={0}
                            max={10}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item label="Cuối kỳ" name="finalScore">
                        <InputNumber
                            min={0}
                            max={10}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StudentGradeOvr;
