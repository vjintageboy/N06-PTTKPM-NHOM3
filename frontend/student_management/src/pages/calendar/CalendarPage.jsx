import React, { useState } from 'react';
import { Layout, Tabs, Table, DatePicker, Select, Button, Input, Form, Tag, Spin, Typography, Card, Space, Divider } from 'antd';
import { CalendarOutlined, SearchOutlined, BookOutlined, ClockCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const CalendarPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Dữ liệu mẫu cho lịch học
  const lichHocData = [
    {
      key: '1',
      maLop: 'CSE101',
      tenMon: 'Nhập môn lập trình',
      thoiGian: 'Thứ 2 (7:00 - 10:00)',
      phongHoc: 'A2-301',
      giangVien: 'TS. Nguyễn Văn A',
      trangThai: 'Đang diễn ra',
    },
    {
      key: '2',
      maLop: 'MAT202',
      tenMon: 'Đại số tuyến tính',
      thoiGian: 'Thứ 3 (13:00 - 15:30)',
      phongHoc: 'B1-502',
      giangVien: 'TS. Trần Thị B',
      trangThai: 'Sắp diễn ra',
    },
    {
      key: '3',
      maLop: 'ENG305',
      tenMon: 'Tiếng Anh chuyên ngành',
      thoiGian: 'Thứ 5 (7:00 - 9:30)',
      phongHoc: 'C2-401',
      giangVien: 'ThS. Phạm Văn C',
      trangThai: 'Đang diễn ra',
    },
  ];

  // Dữ liệu mẫu cho lịch thi
  const lichThiData = [
    {
      key: '1',
      maLop: 'CSE101',
      tenMon: 'Nhập môn lập trình',
      ngayThi: '15/05/2025',
      gioThi: '08:00 - 10:00',
      phongThi: 'H1-301',
      hinhThucThi: 'Trắc nghiệm',
    },
    {
      key: '2',
      maLop: 'MAT202',
      tenMon: 'Đại số tuyến tính',
      ngayThi: '20/05/2025',
      gioThi: '13:00 - 15:00',
      phongThi: 'H2-401',
      hinhThucThi: 'Tự luận',
    },
    {
      key: '3',
      maLop: 'ENG305',
      tenMon: 'Tiếng Anh chuyên ngành',
      ngayThi: '25/05/2025',
      gioThi: '07:30 - 09:30',
      phongThi: 'H3-201',
      hinhThucThi: 'Vấn đáp',
    },
  ];

  // Cột cho bảng lịch học
  const lichHocColumns = [
    {
      title: 'Mã lớp',
      dataIndex: 'maLop',
      key: 'maLop',
      width: 100,
    },
    {
      title: 'Tên môn học',
      dataIndex: 'tenMon',
      key: 'tenMon',
      width: 200,
    },
    {
      title: 'Thời gian',
      dataIndex: 'thoiGian',
      key: 'thoiGian',
      width: 150,
      render: (text) => (
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Phòng học',
      dataIndex: 'phongHoc',
      key: 'phongHoc',
      width: 120,
      render: (text) => (
        <span>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Giảng viên',
      dataIndex: 'giangVien',
      key: 'giangVien',
      width: 180,
      render: (text) => (
        <span>
          <TeamOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: (text) => {
        let color = text === 'Đang diễn ra' ? 'green' : text === 'Sắp diễn ra' ? 'blue' : 'gray';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
  ];

  // Cột cho bảng lịch thi
  const lichThiColumns = [
    {
      title: 'Mã lớp',
      dataIndex: 'maLop',
      key: 'maLop',
      width: 100,
    },
    {
      title: 'Tên môn học',
      dataIndex: 'tenMon',
      key: 'tenMon',
      width: 200,
    },
    {
      title: 'Ngày thi',
      dataIndex: 'ngayThi',
      key: 'ngayThi',
      width: 120,
      render: (text) => (
        <span>
          <CalendarOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Giờ thi',
      dataIndex: 'gioThi',
      key: 'gioThi',
      width: 120,
      render: (text) => (
        <span>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Phòng thi',
      dataIndex: 'phongThi',
      key: 'phongThi',
      width: 120,
      render: (text) => (
        <span>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Hình thức thi',
      dataIndex: 'hinhThucThi',
      key: 'hinhThucThi',
      width: 150,
      render: (text) => {
        let color = text === 'Trắc nghiệm' ? 'blue' : text === 'Tự luận' ? 'green' : 'orange';
        return (
          <Tag color={color}>
            {text}
          </Tag>
        );
      },
    },
  ];

  const handleSearch = (values) => {
    setLoading(true);
    // Mô phỏng thời gian tìm kiếm
    setTimeout(() => {
      setLoading(false);
      console.log('Tìm kiếm với giá trị:', values);
    }, 1000);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '20px 50px' }}>
        <Title level={2}>
          <CalendarOutlined style={{ marginRight: 12 }} />
          Tra cứu lịch học và lịch thi
        </Title>
        <Text type="secondary">Tra cứu thông tin lịch học, lịch thi theo môn học hoặc thời gian</Text>

        <Divider />

        <Tabs defaultActiveKey="1" size="large">
          <TabPane
            tab={
              <span>
                <BookOutlined />
                Lịch học
              </span>
            }
            key="1"
          >
            <Card style={{ marginBottom: 16 }}>
              <Form 
                form={form} 
                name="lichHocForm" 
                layout="inline" 
                onFinish={handleSearch} 
                style={{ marginBottom: 16 }}
              >
                <Form.Item name="keyword" style={{ width: 280 }}>
                  <Input 
                    prefix={<SearchOutlined />} 
                    placeholder="Nhập mã lớp, tên môn học hoặc giảng viên" 
                  />
                </Form.Item>
                <Form.Item name="thoiGian" style={{ width: 240 }}>
                  <RangePicker placeholder={['Từ ngày', 'Đến ngày']} />
                </Form.Item>
                <Form.Item name="trangThai" style={{ width: 160 }}>
                  <Select placeholder="Trạng thái">
                    <Option value="all">Tất cả</Option>
                    <Option value="dang-dien-ra">Đang diễn ra</Option>
                    <Option value="sap-dien-ra">Sắp diễn ra</Option>
                    <Option value="da-ket-thuc">Đã kết thúc</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Spin spinning={loading}>
              <Table
                columns={lichHocColumns}
                dataSource={lichHocData}
                bordered
                pagination={{ pageSize: 10 }}
                scroll={{ x: 900 }}
              />
            </Spin>
          </TabPane>

          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Lịch thi
              </span>
            }
            key="2"
          >
            <Card style={{ marginBottom: 16 }}>
              <Form 
                form={form} 
                name="lichThiForm" 
                layout="inline" 
                onFinish={handleSearch} 
                style={{ marginBottom: 16 }}
              >
                <Form.Item name="keyword" style={{ width: 280 }}>
                  <Input 
                    prefix={<SearchOutlined />} 
                    placeholder="Nhập mã lớp hoặc tên môn học" 
                  />
                </Form.Item>
                <Form.Item name="ngayThi" style={{ width: 240 }}>
                  <RangePicker placeholder={['Từ ngày', 'Đến ngày']} />
                </Form.Item>
                <Form.Item name="hinhThucThi" style={{ width: 160 }}>
                  <Select placeholder="Hình thức thi">
                    <Option value="all">Tất cả</Option>
                    <Option value="trac-nghiem">Trắc nghiệm</Option>
                    <Option value="tu-luan">Tự luận</Option>
                    <Option value="van-dap">Vấn đáp</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            <Spin spinning={loading}>
              <Table
                columns={lichThiColumns}
                dataSource={lichThiData}
                bordered
                pagination={{ pageSize: 10 }}
                scroll={{ x: 900 }}
              />
            </Spin>
          </TabPane>
        </Tabs>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Hệ thống quản lý đào tạo Trường Phenikaa © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default CalendarPage;