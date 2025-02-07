import { useState, useEffect } from "react";
import {
    Divider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Select,
} from "antd";
import { addNewUser, getStudentWithoutUser } from "../../services/api";

const AddNewUser = (props) => {
    const { openModalCreate, setOpenModalCreate, fetchUsers } = props;

    const [isSubmit, setIsSubmit] = useState(false);
    const [students, setStudents] = useState([]);
    const [role, setRole] = useState("admin");

    const [form] = Form.useForm();
    const fetchStudentWithoutUser = async () => {
        const res = await getStudentWithoutUser();
        if (res && res.data) {
            setStudents(res.data);
        } else {
            message.error("Lỗi lấy danh sách sinh viên");
        }
    };
    useEffect(() => {
        if (role === "student") {
            fetchStudentWithoutUser();
        }
    }, [role]);
    // Xử lý thay đổi vai trò
    const handleRoleChange = (value) => {
        setRole(value);
        // Nếu không phải student thì reset các trường liên quan đến sinh viên
        if (value !== "student") {
            form.setFieldsValue({
                student: undefined,
                name: undefined,
                email: undefined,
            });
        }
    };

    // Khi chọn sinh viên từ dropdown (chỉ áp dụng khi role = student)
    const handleStudentSelect = (studentId) => {
        const selectedStudent = students.find((s) => s._id === studentId);
        if (selectedStudent) {
            form.setFieldsValue({
                // Gán tên theo tên của sinh viên được chọn (có thể dùng để hiển thị hoặc lưu vào hệ thống)
                name: selectedStudent.name,
                email: selectedStudent.email,
                student: selectedStudent._id, // Lưu _id của sinh viên để liên kết trong model User
            });
        }
    };

    const onFinish = async (values) => {
        const { name, email, password, role, student } = values;
        console.log("check values: ", { name, email, password, role, student });
        setIsSubmit(true);
        const res = await addNewUser(name, email, password, role, student);
        console.log(values);

        if (res && res.data) {
            message.success("Tạo mới người dùng thành công");
            form.resetFields();
            setOpenModalCreate(false);
            fetchUsers();
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message,
            });
        }
        setIsSubmit(false);
    };

    return (
        <>
            <Modal
                title="Thêm mới người dùng"
                open={openModalCreate}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: 500, margin: "0 auto" }}
                >
                    {/* Trường chọn vai trò */}
                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn vai trò!",
                            },
                        ]}
                    >
                        <Select onChange={handleRoleChange}>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="manager">
                                Manager
                            </Select.Option>
                            <Select.Option value="student">
                                Student
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    {/* Nếu role là student: hiển thị dropdown chọn sinh viên */}
                    {role === "student" ? (
                        <>
                            <Form.Item
                                label="Chọn Sinh viên"
                                name="student"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng chọn sinh viên!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chọn sinh viên"
                                    onChange={handleStudentSelect}
                                >
                                    {students.map((student) => (
                                        <Select.Option
                                            key={student._id}
                                            value={student._id}
                                        >
                                            {student.name} ({student.studentID})
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {/* Trường tên tự động điền theo thông tin của sinh viên đã chọn và bị disable */}
                            <Form.Item
                                label="Tên"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tên không được để trống!",
                                    },
                                ]}
                            >
                                <Input placeholder="Tên sinh viên" disabled />
                            </Form.Item>
                        </>
                    ) : (
                        // Nếu vai trò không phải student: hiển thị input để nhập tên thủ công
                        <Form.Item
                            label="Tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                    )}

                    {/* Trường email */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Email không hợp lệ!" },
                        ]}
                    >
                        <Input
                            placeholder="Nhập email"
                            disabled={role === "student"}
                        />
                    </Form.Item>

                    {/* Trường password */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewUser;
