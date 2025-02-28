import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { getGradeOfStudent } from "../../services/api";

const { Title } = Typography;

const StudentGradeOvr = (props) => {
    const { studentData } = props;
    const [grades, setGrades] = useState([]);
    const fetchGrades = async () => {
        const response = await getGradeOfStudent(studentData._id); // API lấy danh sách điểm

        if (response && response.data) {
            setGrades(response.data);
        }
    };

    useEffect(() => {
        fetchGrades();
    }, [studentData]);

    // Xử lý dữ liệu cho bảng
    const processedData = grades.map((grade, index) => ({
        key: index,
        subject: grade.subject.name,
        score4: grade.grade4,
        score10: grade.averageScore,
        status: grade.status === "Retake" ? "Học lại" : "Đạt",
    }));
    // Cột của bảng
    const columns = [
        {
            title: "Môn học",
            dataIndex: "subject",
            key: "subject",
        },
        {
            title: "Hệ 4",
            dataIndex: "score4",
            key: "score4",
        },
        {
            title: "Hệ 10",
            dataIndex: "score10",
            key: "score10",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) =>
                status === "Học lại" ? (
                    <span style={{ color: "red" }}>{status}</span>
                ) : (
                    <span style={{ color: "green" }}>{status}</span>
                ),
        },
    ];

    return (
        <div style={{ padding: 20 }}>
            {/* <Title level={4}>Bảng Điểm</Title> */}
            <Table
                columns={columns}
                dataSource={processedData}
                pagination={false}
                bordered
            />
        </div>
    );
};

export default StudentGradeOvr;
