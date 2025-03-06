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
import { getAvailableManagers, updateDepartment } from "../../services/api";

const UpdateDepartment = (props) => {
    const {
        openModalUpdate,
        setOpenModalUpdate,
        dataUpdate,
        setDataUpdate,
        managers,
        setManagers,
    } = props;

    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { id, code, name, manager } = values;
        console.log(manager);

        setIsSubmit(true);
        const res = await updateDepartment(id, code, name, manager);
        console.log(res);

        if (res && res.data) {
            message.success("Cập nhật khoa thành công");
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
                        <Select placeholder="Select manager">
                            {managers.map((manager) => (
                                <Select.Option
                                    key={manager._id}
                                    value={manager._id}
                                >
                                    {manager.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateDepartment;
