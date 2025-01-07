import React, { useState } from "react";

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
const { Header, Sider, Content } = Layout;
const SideBar = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await callLogout();
        if (res) {
            message.success("Đăng xuất thành công");
            localStorage.removeItem("access_token");
            navigate("/login");
        } else {
            message.error(res.message);
        }
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1">
                        <HomeOutlined />
                        <span>Trang chủ</span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="2">
                        <ProfileOutlined />
                        <span>Profile</span>
                        <Link to="/profile" />
                    </Menu.Item>
                    <Menu.Item key="3">
                        <AppstoreOutlined />
                        <span>Khoa</span>
                        <Link to="/departments" />
                    </Menu.Item>
                    <Menu.Item key="4">
                        <UserOutlined />
                        <span>Sinh viên</span>
                        <Link to="/students" />
                    </Menu.Item>
                    <Menu.Item key="5">
                        <BookOutlined />
                        <span>Môn học</span>
                        <Link to="/subjects" />
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận đăng xuất"}
                            description={"Bạn có chắc chắn muốn đăng xuất ?"}
                            onConfirm={() => handleLogout()}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <LogoutOutlined />
                            <span>Đăng xuất</span>
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
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
            </Layout>
        </Layout>
    );
};
export default SideBar;
