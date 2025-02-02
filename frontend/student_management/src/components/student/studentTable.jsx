import { useEffect, useState } from "react";
import {
    deleteStudent,
    getAllDepartment,
    getAllStudent,
} from "../../services/api";
import { Button, Input, Popconfirm, Table } from "antd";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import AddNewStudent from "./addnewStudent";
import UpdateStudent from "./updateStudent";
const StudentTable = () => {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [listStudents, setListStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [departments, setDepartmemts] = useState([]);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (text) => <a>{text}</a>,
            hidden: true,
        },
        {
            title: "Mã sinh viên",
            dataIndex: "studentID",
            key: "studentID",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            title: "Khoa",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Năm nhập học",
            dataIndex: "enrollmentYear",
            key: "enrollmentYear",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa sinh viên"}
                        description={
                            "Bạn có chắc chắn muốn xóa sinh viên này ?"
                        }
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{ cursor: "pointer", margin: "0 20px" }}>
                            <DeleteTwoTone twoToneColor="#ff4d4f" />
                        </span>
                    </Popconfirm>
                    <EditTwoTone
                        twoToneColor="#f57800"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setOpenModalUpdate(true);
                            setDataUpdate(record);
                        }}
                    />
                </>
            ),
        },
    ];
    const fetchStudents = async () => {
        const res = await getAllStudent();
        if (res.data) {
            setListStudents(res.data);
        }
    };
    const fetchDepartments = async () => {
        const res = await getAllDepartment();
        if (res.data) {
            setDepartmemts(res.data);
        }
    };
    const handleDelete = async (id) => {
        await deleteStudent(id);
        fetchStudents();
    };

    const data = listStudents.map((student) => {
        return {
            id: student._id,
            studentID: student.studentID,
            name: student.name,
            email: student.email,
            dateOfBirth: student.dateOfBirth,
            department: student.department ? student.department.name : "",
            enrollmentYear: student.enrollmentYear,
        };
    });
    useEffect(() => {
        fetchStudents();
        fetchDepartments();
    }, []);
    return (
        <>
            <div
                className="header-content"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div
                    className="search"
                    style={{ display: "flex", gap: "10px" }}
                >
                    <Input
                        placeholder="Nhập tên hoặc mã sinh viên"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        type="primary"
                        onClick={() => fetchStudents(searchQuery)}
                    >
                        Tìm kiếm
                    </Button>
                </div>

                <Button
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => setOpenModalCreate(true)}
                >
                    Thêm mới
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "30"],
                }}
            />
            <AddNewStudent
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchStudents={fetchStudents}
                departments={departments}
            />
            <UpdateStudent
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchStudents={fetchStudents}
                departments={departments}
                dataUpdate={dataUpdate}
            />
        </>
    );
};

export default StudentTable;
