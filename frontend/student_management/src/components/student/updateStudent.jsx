import { useEffect, useState } from "react";
import {
    Divider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Select,
} from "antd";
import { updateStudent } from "../../services/api";

const UpdateStudent = (props) => {
    const {
        openModalUpdate,
        setOpenModalUpdate,
        fetchStudents,
        departments,
        dataUpdate,
    } = props;

    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {
            id,
            studentID,
            name,
            email,
            dateOfBirth,
            department,
            enrollmentYear,
        } = values;
        setIsSubmit(true);
        console.log(values);
        const res = await updateStudent(
            id,
            studentID,
            name,
            email,
            dateOfBirth,
            department,
            enrollmentYear
        );

        if (res && res.data) {
            message.success("Cập nhật môn học thành công");
            form.resetFields();
            setOpenModalUpdate(false);
            fetchStudents();
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message,
            });
        }
        setIsSubmit(false);
    };
    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [dataUpdate]);

    return (
        <>
            <Modal
                title="Cập nhật sinh viên"
                open={openModalUpdate}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => setOpenModalUpdate(false)}
                okText={"Lưu"}
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
                        label="ID"
                        name="id"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập ID!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
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

export default UpdateStudent;
