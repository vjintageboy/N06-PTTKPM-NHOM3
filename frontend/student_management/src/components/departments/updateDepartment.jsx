import { useEffect, useState } from "react";
import { Divider, Form, Input, message, Modal, notification } from "antd";
import { updateDepartment } from "../../services/api";

const UpdateDepartment = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
        props;

    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { id, code, name, manager } = values;
        console.log({ id, code, name, manager });

        setIsSubmit(true);
        const res = await updateDepartment(id, code, name, manager);
        if (res && res.data) {
            message.success("Tạo mới khoa thành công");
            form.resetFields();
            setOpenModalUpdate(false);
            await props.fetchDepartments();
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
                title="Cập nhật thông tin khoa"
                open={openModalUpdate}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
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
                        label="Mã khoa"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mã khoa!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tên khoa"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên khoa!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Quản lý"
                        name="manager"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "Vui lòng nhập số điện thoại!",
                        //     },
                        // ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateDepartment;
