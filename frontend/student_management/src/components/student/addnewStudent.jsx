import { useState } from "react";
import {
    Divider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Select,
    Upload,
    Image,
} from "antd";
import { addNewStudent } from "../../services/api";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const AddNewStudent = (props) => {
    const { openModalCreate, setOpenModalCreate, fetchStudents, departments } =
        props;

    const [isSubmit, setIsSubmit] = useState(false);
    const [form] = Form.useForm();

    // State để lưu ảnh
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) =>
        setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // Hàm xử lý khi submit form
    const onFinish = async (values) => {
        setIsSubmit(true);

        // Tạo formData để gửi lên server
        const formData = new FormData();
        formData.append("studentID", values.studentID);
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("gender", values.gender);
        formData.append("dateOfBirth", values.dateOfBirth);
        formData.append("department", values.department);
        formData.append("enrollmentYear", values.enrollmentYear);
        if (fileList) {
            formData.append("image", fileList[0].originFileObj); // Gửi file ảnh
            console.log(fileList);
        }

        // Gọi API
        const res = await addNewStudent(formData);
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
                        label="Email"
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
                        label="Giới tính"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn giới tính!",
                            },
                        ]}
                    >
                        <Select placeholder="Chọn giới tính">
                            <Select.Option value="male">Nam</Select.Option>
                            <Select.Option value="female">Nữ</Select.Option>
                        </Select>
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
                                message: "Vui lòng chọn khoa!",
                            },
                        ]}
                    >
                        <Select placeholder="Chọn khoa">
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

                    {/* Upload ảnh */}
                    <Form.Item label="Ảnh sinh viên">
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList.length == 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: "none",
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) =>
                                        setPreviewOpen(visible),
                                    afterOpenChange: (visible) =>
                                        !visible && setPreviewImage(""),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewStudent;
