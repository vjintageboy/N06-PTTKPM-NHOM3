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
import { addNewDepartment, getAvailableManagers } from "../../services/api";
import { Option } from "antd/es/mentions";

const AddNewDepartment = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;

    const [isSubmit, setIsSubmit] = useState(false);
    const [managers, setManagers] = useState([]);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { code, name, manager } = values;
        setIsSubmit(true);
        const res = await addNewDepartment(code, name, manager);
        if (res && res.data) {
            message.success("Tạo mới khoa thành công");
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchDepartments();
        } else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message,
            });
        }
        setIsSubmit(false);
    };
    const fetchManagers = async () => {
        const res = await getAvailableManagers();

        if (res && res.data) {
            setManagers(res.data);
        }
    };
    useEffect(() => {
        fetchManagers();
    }, [managers]);

    return (
        <>
            <Modal
                title="Thêm mới khoa"
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

export default AddNewDepartment;
