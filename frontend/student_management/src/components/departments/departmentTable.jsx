import { useEffect, useState } from "react";
import {
    deleteDepartment,
    getAllDepartment,
    getAvailableManagers,
    searchDepartments,
} from "../../services/api";
import { Button, Input, Popconfirm, Table } from "antd";
import AddNewDepartment from "./addNewDepartmentUser";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import UpdateDepartment from "./updateDepartment";

const DepartmentTable = () => {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [listDepartments, setListDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [managers, setManagers] = useState([]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Mã Khoa",
            dataIndex: "code",
            key: "code",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Tên Khoa",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Quản lý",
            dataIndex: "manager",
            key: "manager",
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Popconfirm
                        placement="leftTop"
                        title={"Xác nhận xóa khoa"}
                        description={"Bạn có chắc chắn muốn xóa khoa này ?"}
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
    const fetchManagers = async () => {
        const res = await getAvailableManagers();

        if (res && res.data) {
            setManagers(res.data);
        }
    };

    const fetchDepartments = async (query = "") => {
        const res = await searchDepartments(query);
        if (res.data) {
            setListDepartments(res.data);
        }
        fetchManagers();
    };
    const handleDelete = async (id) => {
        await deleteDepartment(id);
        fetchDepartments();
    };

    const data = listDepartments.map((department) => {
        return {
            id: department._id,
            code: department.code,
            name: department.name,
            manager: department.manager ? department.manager.name : "",
        };
    });
    useEffect(() => {
        fetchDepartments("");
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
                        placeholder="Nhập tên hoặc mã khoa"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        type="primary"
                        onClick={() => fetchDepartments(searchQuery)}
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
            <AddNewDepartment
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchDepartments={fetchDepartments}
                managers={managers}
                setManagers={setManagers}
            />
            <UpdateDepartment
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchDepartments={fetchDepartments}
                managers={managers}
                setManagers={setManagers}
            />
        </>
    );
};
export default DepartmentTable;
