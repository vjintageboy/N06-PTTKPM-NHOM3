import { useEffect, useState } from "react";
import {
    getAllSubjects,
    addNewSubject,
    updateSubject,
    deleteSubject,
    getAllDepartment,
} from "../../services/api";
import { Button, Input, Popconfirm, Table } from "antd";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import AddNewSubject from "./addNewSubject";
import UpdateSubject from "./updateSubject";
const SubjectTable = () => {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [listSubjects, setListSubjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [departments, setDepartmemts] = useState([]);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Mã môn học",
            dataIndex: "code",
            key: "code",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Tên môn học",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "số tín chỉ",
            dataIndex: "credits",
            key: "credits",
        },

        {
            title: "Khoa",
            dataIndex: "department",
            key: "department",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa môn học"}
                        description={"Bạn có chắc chắn muốn xóa môn học này ?"}
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
    const fetchSubjects = async () => {
        const res = await getAllSubjects();
        if (res.data) {
            setListSubjects(res.data);
        }
    };
    const fetchDepartments = async () => {
        const res = await getAllDepartment();
        if (res.data) {
            setDepartmemts(res.data);
        }
    };
    const handleDelete = async (id) => {
        await deleteSubject(id);
        fetchSubjects();
    };

    const data = listSubjects.map((subject) => {
        return {
            id: subject._id,
            code: subject.code,
            name: subject.name,
            credits: subject.credits,
            department: subject.department ? subject.department.name : "",
        };
    });
    useEffect(() => {
        fetchSubjects();
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
                        placeholder="Nhập tên hoặc mã môn học"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        type="primary"
                        onClick={() => fetchSubjects(searchQuery)}
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
            <AddNewSubject
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchSubjects={fetchSubjects}
                departments={departments}
            />
            <UpdateSubject
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchSubjects={fetchSubjects}
                departments={departments}
                dataUpdate={dataUpdate}
            />
        </>
    );
};

export default SubjectTable;
