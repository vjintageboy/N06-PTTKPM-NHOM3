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
import { updateSubject } from "../../services/api";

const UpdateSubject = (props) => {
    const {
        openModalUpdate,
        setOpenModalUpdate,
        fetchSubjects,
        departments,
        dataUpdate,
    } = props;

    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { id, code, name, credits, department } = values;
        setIsSubmit(true);
        console.log(values);
        const res = await updateSubject(id, code, name, credits, department);

        if (res && res.data) {
            message.success("Cập nhật môn học thành công");
            form.resetFields();
            setOpenModalUpdate(false);
            fetchSubjects();
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
                title="Cập nhật môn học"
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
                        hidden
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
                        label="Mã môn học"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mã môn học!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên môn học"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên môn học!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="số tín chỉ"
                        name="credits"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số tín chỉ!",
                            },
                        ]}
                    >
                        <Input />
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
                </Form>
            </Modal>
        </>
    );
};

export default UpdateSubject;
