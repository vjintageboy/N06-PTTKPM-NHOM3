import React from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, Typography, Divider, Button } from 'antd';
import { UserAddOutlined, TeamOutlined, AppstoreAddOutlined, BellOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const DashboardPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
     

            {/* Content */}
            <Content style={{ padding: '0 50px', marginTop: 30 }}>
                <Title level={2}>Chào mừng bạn đến với Hệ thống Quản lý Trường Phenikaa</Title>

                {/* Thống kê tổng quan */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Số lượng sinh viên"
                                value={3200}
                                prefix={<UserAddOutlined />}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Số giảng viên"
                                value={150}
                                prefix={<TeamOutlined />}
                                valueStyle={{ color: '#cf1322' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Số lớp học"
                                value={120}
                                prefix={<AppstoreAddOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Thông báo mới"
                                value={5}
                                prefix={<BellOutlined />}
                                valueStyle={{ color: '#faad14' }}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Thông báo mới */}
                <Divider orientation="left">Thông báo mới</Divider>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card title="Thông báo kỳ thi">
                            <p>Học sinh cần chuẩn bị cho kỳ thi cuối kỳ vào tháng sau. Vui lòng kiểm tra lịch thi trên hệ thống.</p>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Đăng ký tuyển sinh">
                            <p>Chúng tôi mở đăng ký tuyển sinh năm học mới. Các học sinh có thể đăng ký qua hệ thống trực tuyến.</p>
                        </Card>
                    </Col>
                </Row>

                {/* Hành động nhanh */}
                <Divider orientation="left">Hành động nhanh</Divider>
                <Row gutter={16}>
                    <Col span={8}>
                        <Button type="primary" block>
                            Thêm Sinh Viên
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" block>
                            Quản Lý Môn Học
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button type="primary" block>
                            Xem Thông Báo
                        </Button>
                    </Col>
                </Row>
            </Content>

           
        </Layout>
    );
};

export default DashboardPage;
