import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../services/api";
import avt from "../../assets/student-avt/male-avt.avif";
import { Card, Row, Col, Typography, Divider } from "antd";
import StudentGradesOvrTable from "./studentGradeOvr";

const { Title, Text } = Typography;

const StudentDetailPage = () => {
    const { slug } = useParams();
    // // const [student, setStudent] = useState({});
    // const callStudent = async (id) => {
    //     const res = await getStudentById(id);
    //     console.log(res);

    //     setStudent(res);
    // };
    // useEffect(() => {
    //     callStudent(slug);
    // }, []);

    const student = {
        avatar: `${avt}`, // Thay bằng link ảnh thật
        studentId: "22010014",
        fullName: "Nguyễn Cao",
        firstName: "Chiến",
        gender: "Nam",
        birthDate: "23/01/2003",
        email: "22010014@st.phenikaa-uni.edu.vn",
        class: "K16-CNTT_4",
        faculty: "Khoa Công nghệ Thông tin",
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
                            <Col span={8}>
                                <Text strong>Họ và đệm</Text>
                                <br />
                                <Text>{student.fullName}</Text>
                            </Col>
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
            <StudentGradesOvrTable />
        </>
    );
};

export default StudentDetailPage;
