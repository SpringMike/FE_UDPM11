import React from "react";
import Moment from "react-moment";

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
            return gender  ? <p style={{ color: 'blue' }}>Nam</p> :
                <p style={{ color: 'red' }}>Nữ</p>
        },
    },
    {
        title: "Chức vụ",
        dataIndex: "roleId",
        key: "roleId",
        render: (roleId: Number) => {
            return roleId == 1 ? <p style={{ color: 'blue' }}>ADMIN</p> :
                <p style={{ color: 'red' }}>STAFF</p>
        },
    },
    {
        title: "Trạng thái",
        dataIndex: "statusAccount",
        key: "status",
        render: (status: boolean) => {
            return status ? <p style={{ color: 'blue' }}>Hoạt động</p> :
                <p style={{ color: 'red' }}>Khoá tài khoản</p>
        },


    }
];