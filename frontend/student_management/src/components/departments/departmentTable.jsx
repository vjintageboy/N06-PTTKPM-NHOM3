import { useEffect, useState } from "react";
import { deleteDepartment, getAllDepartment } from "../../services/api";
import { Button, Popconfirm, Space, Table } from "antd";
import AddNewDepartment from "./addNewDepartmentUser";
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from "@ant-design/icons";
import UpdateDepartment from "./updateDepartment";

const DepartmentTable = () => {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [listDepartments, setListDepartments] = useState([]);

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
                        onConfirm={() => deleteDepartment(record.id)}
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

    const fetchDepartments = async () => {
        const res = await getAllDepartment();
        if (res.data) {
            setListDepartments(res.data);
        }
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
        fetchDepartments();
    }, []);
    return (
        <>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setOpenModalCreate(true)}
            >
                Thêm mới
            </Button>
            <Table columns={columns} dataSource={data} />
            <AddNewDepartment
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchDepartments={fetchDepartments}
            />
            <UpdateDepartment
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchDepartments={fetchDepartments}
            />
        </>
    );
};
export default DepartmentTable;
