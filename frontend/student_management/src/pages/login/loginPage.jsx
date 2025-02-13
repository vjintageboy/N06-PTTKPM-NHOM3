import { Button, Divider, Form, Input, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import "./login.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { login } = useContext(UserContext);

    const onFinish = async (values) => {
        const { email, password } = values;
        setIsSubmit(true);
        const res = await callLogin(email, password);
        setIsSubmit(false);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.token);
            login(res.data.user);
            message.success("Đăng nhập tài khoản thành công!");
            navigate("/");
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message)
                        ? res.message[0]
                        : res.message,
                duration: 5,
            });
        }
    };

    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Chào mừng trở lại!</h2>
                            <p className="text text-normal">Vui lòng đăng nhập để tiếp tục</p>
                            <Divider />
                        </div>
                        <Form
                            name="login"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout="vertical"
                            className="login-form"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email không được để trống!",
                                    },
                                    {
                                        type: 'email',
                                        message: "Email không đúng định dạng!",
                                    }
                                ]}
                            >
                                <Input 
                                    placeholder="name@example.com"
                                    className="custom-input"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Mật khẩu không được để trống!",
                                    },
                                ]}
                            >
                                <Input.Password 
                                    placeholder="Nhập mật khẩu"
                                    className="custom-input"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmit}
                                    className="submit-button"
                                    block
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;