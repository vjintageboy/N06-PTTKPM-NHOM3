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
import { updateUser } from "../../services/api";

const UpdateUser = (props) => {
    const {
        openModalUpdate,
        setOpenModalUpdate,
        fetchUsers,
        departments,
        dataUpdate,
    } = props;

    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { id, password } = values;
        console.log({ id, password });

        setIsSubmit(true);
        const res = await updateUser(id, password);

        if (res && res.data) {
            message.success("Cập nhật người dùng thành công");
            form.resetFields();
            setOpenModalUpdate(false);
            fetchUsers();
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
                title="Cập nhật người dùng"
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
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Họ tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên người dùng!",
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email!",
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateUser;
