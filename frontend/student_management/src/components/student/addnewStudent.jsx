import { useState } from "react";
import {
    Divider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Select,
} from "antd";
import { addNewStudent } from "../../services/api";

const AddNewStudent = (props) => {
    const { openModalCreate, setOpenModalCreate, fetchStudents, departments } =
        props;

    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {
            studentID,
            name,
            email,
            dateOfBirth,
            department,
            enrollmentYear,
        } = values;
        setIsSubmit(true);
        const res = await addNewStudent(
            studentID,
            name,
            email,
            dateOfBirth,
            department,
            enrollmentYear
        );
        console.log(values);

        if (res && res.data) {
            message.success("Tạo mới sinh viên thành công");
            form.resetFields();
            setOpenModalCreate(false);
            fetchStudents();
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
                title="Thêm mới sinh viên"
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
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Mã sinh viên"
                        name="studentID"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mã sinh viên!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên sinh viên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên sinh viên!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Ngày sinh"
                        name="dateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập ngày sinh!",
                            },
                        ]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Khoa"
                        name="department"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập chọn khoa!",
                            },
                        ]}
                    >
                        <Select placeholder="Select department">
                            {departments.map((department) => (
                                <Select.Option
                                    key={department._id}
                                    value={department._id}
                                >
                                    {department.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Năm nhập học"
                        name="enrollmentYear"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập năm nhập học!",
                            },
                        ]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewStudent;
