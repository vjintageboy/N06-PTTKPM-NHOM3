import { useContext, useState } from "react";
import "./sidebar.scss";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    BookOutlined,
    AppstoreOutlined,
    ProfileOutlined,
    UserOutlined,
    HomeOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, Popconfirm, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";
import { UserContext } from "../../context/userContext";
import logo from "../../assets/phenikaa-logo.jpg";
import { Footer } from "antd/es/layout/layout";
import HeaderComponent from "../header/header";

const { Header, Sider, Content } = Layout;
const SideBar = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const handleLogout = async () => {
        const res = await callLogout();
        if (res) {
            logout();
            message.success("Đăng xuất thành công");
            localStorage.removeItem("access_token");
            navigate("/login");
        } else {
            message.error(res.message);
        }
    };
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    backgroundColor: "rgba(0,32,109,0.85)",
                }}
            >
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[window.location.pathname]}
                    style={{ backgroundColor: "transparent" }}
                >
                    <Menu.Item key="/" className="sideBar-item">
                        <HomeOutlined />
                        <span>Trang chủ</span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="/profile" className="sideBar-item">
                        <ProfileOutlined />
                        <span>Profile</span>
                        <Link to="/profile" />
                    </Menu.Item>
                    {user && user.role === "admin" && (
                        <>
                            <Menu.Item
                                key="/departments"
                                className="sideBar-item"
                            >
                                <AppstoreOutlined />
                                <span>Khoa</span>
                                <Link to="/departments" />
                            </Menu.Item>
                            <Menu.Item key="/students" className="sideBar-item">
                                <UserOutlined />
                                <span>Sinh viên</span>
                                <Link to="/students" />
                            </Menu.Item>

                            <Menu.Item key="/subjects" className="sideBar-item">
                                <BookOutlined />
                                <span>Môn học</span>
                                <Link to="/subjects" />
                            </Menu.Item>
                            <Menu.Item key="/users" className="sideBar-item">
                                <BookOutlined />
                                <span>Tài khoản</span>
                                <Link to="/users" />
                            </Menu.Item>
                        </>
                    )}

                    {user && user.role === "manager" && (
                        <>
                            <Menu.Item key="/students" className="sideBar-item">
                                <UserOutlined />
                                <span>Sinh viên</span>
                                <Link to="/students" />
                            </Menu.Item>
                            <Menu.Item key="/subjects" className="sideBar-item">
                                <BookOutlined />
                                <span>Môn học</span>
                                <Link to="/subjects" />
                            </Menu.Item>
                        </>
                    )}
                    {user && user.role === "student" && (
                        <>
                            <Menu.Item
                                key="/registration"
                                className="sideBar-item"
                            >
                                <BookOutlined />
                                <span>đăng ký môn học</span>
                                <Link to="/registration" />
                            </Menu.Item>
                            <Menu.Item key="/grades" className="sideBar-item">
                                <BookOutlined />
                                <span>Bảng điểm</span>
                                <Link to="/grades" />
                            </Menu.Item>
                        </>
                    )}

                    <Menu.Item
                        key="6"
                        style={{
                            color: "white",
                            fontWeight: "500",
                            fontSize: "16px",
                        }}
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận đăng xuất"}
                            description={"Bạn có chắc chắn muốn đăng xuất ?"}
                            onConfirm={() => handleLogout()}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <div>
                                <LogoutOutlined />
                                <span>Đăng xuất</span>
                            </div>
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div
                        style={{
                            alignItems: "center",
                            display: "flex",
                        }}
                    >
                        <img src={logo} alt="" style={{ width: "180px" }} />
                    </div>
                    <HeaderComponent />
                </Header>

                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {props.children}
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default SideBar;
