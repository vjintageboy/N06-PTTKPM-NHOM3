import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../services/api";
import avt from "../../assets/student-avt/male-avt.avif";
import { Card, Row, Col, Typography, Divider } from "antd";
import StudentGradesOvrTable from "./studentGradeOvr";
import { UserContext } from "../../context/userContext";
import GradeStatistics from "../../components/grades/GradeStatistics";

const { Title, Text } = Typography;

const StudentDetailPage = () => {
    const { slug } = useParams();
    const [studentData, setStudentData] = useState({});
    const { user } = useContext(UserContext);
    const callStudent = async (id) => {
        const res = await getStudentById(id);

        setStudentData(res);
    };
    useEffect(() => {
        if (user.role === "admin" || user.role === "manager") {
            callStudent(slug);
        } else {
            callStudent(user.student);
        }
    }, []);

    const student = {
        avatar: `${avt}`,
        studentId: `${studentData.studentID}`,
        fullName: "Nguyễn Cao",
        firstName: `${studentData.name}`,
        gender: "Nam",
        birthDate: `${studentData.dateOfBirth}`,
        email: `${studentData.email}`,
        class: "K16-CNTT_4",
        faculty: studentData.department
            ? studentData.department.name
            : "Chưa cập nhật",
        department: "Công nghệ thông tin",
        status: "Đang học",
        trainingSystem: "Đại học chính quy",
        program: "Công nghệ thông tin",
        course: "2022-2026",
        trainingCode: "DH_K16.40",
    };
    return (
        <>
            <Card>
                <Title level={3} style={{ color: "#002c5f" }}>
                    THÔNG TIN CƠ BẢN
                </Title>
                <Divider style={{ borderTop: "3px solid #e56429" }} />
                <Row gutter={16}>
                    <Col span={6}>
                        <img
                            src={student.avatar}
                            alt="avatar"
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    </Col>
                    <Col span={18}>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <Text strong>Mã SV</Text>
                                <br />
                                <Text>{student.studentId}</Text>
                            </Col>
                            {/* <Col span={8}>
                                <Text strong>Họ và đệm</Text>
                                <br />
                                <Text>{student.fullName}</Text>
                            </Col> */}
                            <Col span={8}>
                                <Text strong>Tên</Text>
                                <br />
                                <Text>{student.firstName}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Ngày sinh</Text>
                                <br />
                                <Text>{student.birthDate}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Email</Text>
                                <br />
                                <Text>{student.email}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Lớp</Text>
                                <br />
                                <Text>{student.class}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Khoá đào tạo</Text>
                                <br />
                                <Text>{student.trainingCode}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Khoa quản lý</Text>
                                <br />
                                <Text>{student.faculty}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Ngành</Text>
                                <br />
                                <Text>{student.department}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Niên khoá</Text>
                                <br />
                                <Text>{student.course}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Trạng thái</Text>
                                <br />
                                <Text>{student.status}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Chức vụ</Text>
                                <br />
                                <Text>Sinh viên</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Giới tính</Text>
                                <br />
                                <Text>{student.gender}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Hệ đào tạo</Text>
                                <br />
                                <Text>{student.trainingSystem}</Text>
                            </Col>
                            <Col span={8}>
                                <Text strong>Chương trình đào tạo</Text>
                                <br />
                                <Text>{student.program}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider style={{ borderTop: "3px solid #e56429" }} />
            </Card>
            <GradeStatistics
                studentId={user.role === "student" ? user.student : slug}
            />
            <StudentGradesOvrTable studentData={studentData} />
        </>
    );
};

export default StudentDetailPage;
