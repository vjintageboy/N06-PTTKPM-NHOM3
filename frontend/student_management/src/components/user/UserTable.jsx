import { useEffect, useState } from "react";
import { getAllDepartment, getAllUsers, deleteUser } from "../../services/api";
import { Button, Input, Popconfirm, Table } from "antd";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import AddNewUser from "./AddNewUser";
import UpdateUser from "./UpdateUser";
const UserTable = () => {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [listUsers, setListUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [departments, setDepartmemts] = useState([]);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
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
            title: "vai trò",
            dataIndex: "role",
            key: "role",
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
                        title={"Xác nhận xóa người dùng"}
                        description={
                            "Bạn có chắc chắn muốn xóa người dùng này ?"
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
    const fetchUsers = async () => {
        const res = await getAllUsers();
        if (res.data) {
            setListUsers(res.data);
        }
    };
    const fetchDepartments = async () => {
        const res = await getAllDepartment();
        if (res.data) {
            setDepartmemts(res.data);
        }
    };
    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    const data = listUsers.map((user) => {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department ? user.department.name : "",
        };
    });
    useEffect(() => {
        fetchUsers();
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
                        onClick={() => fetchUsers(searchQuery)}
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
            <AddNewUser
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchUsers={fetchUsers}
                departments={departments}
            />
            <UpdateUser
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                fetchUsers={fetchUsers}
                departments={departments}
                dataUpdate={dataUpdate}
            />
        </>
    );
};

export default UserTable;
