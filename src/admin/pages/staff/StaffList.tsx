import type { MenuProps } from "antd";
import { Button, Dropdown, Menu, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import {
    DeleteOutlined,
    DownOutlined,
    InfoCircleOutlined,
    StopOutlined,
} from "@ant-design/icons";
import { deleteStaff, getStaffs, updateStatusStaff } from "../../service/StaffApi";
import ToastCustom from "../../features/toast/Toast";
import { IStaff } from "../../type/StaffType";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImportExcel from "./ImportExcel";
import ExportExcel from "./ExportExcel";
import { StaffColumn } from "../../datatablesource/StaffColumn";
import StaffCreate from "./StaffCreate";


const StaffList = () => {

    const { Title } = Typography;

    const [data, setData] = useState([{} as IStaff]);

    const [reload, setReload] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        // setTimeout(() => {
        getStaffs().then((r) => {
            console.log(r)
            setData(r.data.reverse());
            setIsLoading(false);
        });
        // }, 1000)

    }, [reload]);


    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const onUpdateFalseStatus = (listId: React.Key[]) => {
        updateStatusStaff(listId, "false").then(() => {
            ToastCustom.fire({
                icon: "success",
                title: "Sửa trạng thái thành công",
            }).then((r) => { });
            setIsLoading(true);
            setReload(!reload);
            setSelectedRowKeys([]);
        });
    };


    const onUpdateTrueStatus = (listId: React.Key[]) => {
        updateStatusStaff(listId, "true").then(() => {
            ToastCustom.fire({
                icon: "success",
                title: "Sửa trạng thái thành công",
            }).then((r) => { });
            setIsLoading(true);
            setReload(!reload);
            setSelectedRowKeys([]);
        });
    };

    const onDelete = (listId: React.Key[]) => {
        Swal.fire({
            title: "Bạn có chắc?",
            text: "Bạn không thể hồi phục lại dữ liệu!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteStaff(listId).then(() => {
                    ToastCustom.fire({
                        icon: "success",
                        title: "Delete category successfully",
                    }).then((r) => { });
                    setReload(!reload);
                    setIsLoading(true);
                    setSelectedRowKeys([]);
                });
            }
        });
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    let hasSelected = selectedRowKeys.length > 0;

    const handleMenuClick: MenuProps["onClick"] = (e: any) => {
        switch (e.key) {
            case "1":
                onUpdateFalseStatus(selectedRowKeys);
                break;
            case "2":
                onUpdateTrueStatus(selectedRowKeys);
                break;
            case "3":
                onDelete(selectedRowKeys);
                break;
        }
    };


    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: <Link to="#">Khoá tài khoản</Link>,
                    key: "1",
                    icon: <StopOutlined />,
                },
                {
                    label: <Link to="#">Mở tài khoản</Link>,
                    key: "2",
                    icon: <InfoCircleOutlined />,
                },
                {
                    label: <Link to="#">Xóa nhân viên</Link>,
                    key: "3",

                    icon: <DeleteOutlined />,
                },
            ]}
        />
    );

    return (
        <div className="p-5">
            <h1 style={{ fontSize: '30px', marginRight: 10 }}  >Quản lý nhân viên </h1>
            <div
                style={{
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Dropdown overlay={menu} disabled={!hasSelected}>
                        <Button style={{ width: "180px", fontSize: "14px" }} type="primary">
                            <Space>
                                Thao tác
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <span
                        style={{
                            marginLeft: 8,
                            marginRight: 8,
                        }}
                    >
                        {hasSelected ? `Selected ${selectedRowKeys.length} istems` : ""}
                    </span>
                    <ImportExcel reload={() => setReload(!reload)} />

                    <ExportExcel />
                    {/*<div>*/}
                    {/*    <label htmlFor="file-upload" className="custom-file-upload">*/}
                    {/*        <UploadOutlined/>   Xuất excel*/}
                    {/*    </label>*/}
                    {/*    <input  id="file-upload" type="file"/>*/}
                    {/*</div>*/}
                </div>
                <div>
                    <StaffCreate reload={() => setReload(!reload)} />
                </div>
            </div>
            {
                <Table
                    dataSource={data}
                    columns={StaffColumn}
                    rowKey="id"
                    bordered
                    pagination={{ defaultPageSize: 5 }}
                    onRow={(record) => {
                        return {
                            onClick: (event) =>
                                navigate({ pathname: `/staff/details/${record.id}` }),
                        };
                    }}
                    rowSelection={rowSelection}
                />
            }
        </div>
    )
}



export default StaffList;
