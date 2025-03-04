import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, message } from "antd";
import axios from "axios";
import { getStatistics } from "../../services/api";

const { Title } = Typography;

const GradeStatistics = ({ studentId }) => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!studentId) return;

        const fetchStatistics = async () => {
            const response = await getStatistics(studentId);

            if (response && response.data) {
                setStatistics(response.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [studentId]);

    if (loading) return <Spin size="large" />;
    if (!statistics) return <p>Không có dữ liệu.</p>;

    return (
        <Card title="Thống kê điểm" bordered={false}>
            <Row gutter={24}>
                <Col span={12}>
                    <Title level={5}>Tổng tín chỉ</Title>
                    <p>{statistics.totalCredits}</p>
                    <Title level={5}>Điểm trung bình hệ 10</Title>
                    <p>{statistics.avgScore10}</p>
                    <Title level={5}>Điểm trung bình tích lũy hệ 10</Title>
                    <p>{statistics.accumulatedAvgScore10}</p>
                </Col>
                <Col span={12}>
                    <Title level={5}>Tổng tín chỉ tích lũy</Title>
                    <p>{statistics.totalAccumulatedCredits}</p>
                    <Title level={5}>Điểm trung bình hệ 4</Title>
                    <p>{statistics.avgScore4}</p>
                    <Title level={5}>Điểm trung bình tích lũy hệ 4</Title>
                    <p>{statistics.accumulatedAvgScore4}</p>
                </Col>
            </Row>
        </Card>
    );
};

export default GradeStatistics;
