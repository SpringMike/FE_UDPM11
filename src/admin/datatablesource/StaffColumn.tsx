import React from "react";
import { Switch } from 'antd';
export const StaffColumn = [
    {
        title: 'Mã nhân viên',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tên nhân viên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: "email",
        key: "email"
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username"
    },
    {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
        render: (gender: Boolean) => {
            return gender ? "Nam" :
                "Nữ"
        },
    },
    {
        title: "Chức vụ",
        dataIndex: "roleId",
        key: "roleId",
        render: (roleId: Number) => {
            return roleId == 1 ? "Quản lý" :
                "Nhân viên"
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "statusAccount",
        key: "status",
        render: (status: boolean) => {
            return status ? <Switch defaultChecked  /> :
                <Switch  />
        },


    }
];