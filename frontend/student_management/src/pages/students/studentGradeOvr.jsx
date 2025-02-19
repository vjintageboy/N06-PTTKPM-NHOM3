import React from "react";
import { Table, Typography } from "antd";

const { Title } = Typography;

const columns = [
    {
        title: "",
        dataIndex: "label",
        key: "label",
    },
    {
        title: "ĐIỂM TRUNG BÌNH CHUNG",
        children: [
            {
                title: "Hệ 4",
                dataIndex: "gpa4",
                key: "gpa4",
            },
            {
                title: "Hệ 10",
                dataIndex: "gpa10",
                key: "gpa10",
            },
        ],
    },
    {
        title: "ĐIỂM TRUNG BÌNH TÍCH LUỸ",
        children: [
            {
                title: "Hệ 4",
                dataIndex: "cumulativeGpa4",
                key: "cumulativeGpa4",
            },
            {
                title: "Hệ 10",
                dataIndex: "cumulativeGpa10",
                key: "cumulativeGpa10",
            },
        ],
    },
];

const data = [
    {
        key: 1,
        label: "Điểm",
        gpa4: "",
        gpa10: "",
        cumulativeGpa4: "",
        cumulativeGpa10: "",
    },
    {
        key: 2,
        label: "Số môn học lại",
        gpa4: "",
        gpa10: "",
        cumulativeGpa4: "",
        cumulativeGpa10: "",
    },
    {
        key: 3,
        label: "Số môn thi lại",
        gpa4: "",
        gpa10: "",
        cumulativeGpa4: "",
        cumulativeGpa10: "",
    },
    {
        key: 4,
        label: "STC học lại",
        gpa4: "",
        gpa10: "",
        cumulativeGpa4: "",
        cumulativeGpa10: "",
    },
    {
        key: 5,
        label: "STC thi lại",
        gpa4: "",
        gpa10: "",
        cumulativeGpa4: "",
        cumulativeGpa10: "",
    },
    {
        key: 6,
        label: "Tổng STC",
        gpa4: "",
        gpa10: "",
        cumulativeGpa4: "",
        cumulativeGpa10: "",
    },
    {
        key: 7,
        label: "STC tích luỹ",
        gpa4: "",
        gpa10: "",
        cumulativeGpa4: "",
        cumulativeGpa10: "",
    },
];

const StudentGradesOvrTable = () => {
    return (
        <div>
            <Title
                level={4}
                style={{ textAlign: "center", marginBottom: "20px" }}
            >
                Bảng điểm
            </Title>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
            />
        </div>
    );
};

export default StudentGradesOvrTable;
