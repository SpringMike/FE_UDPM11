import React from "react";

export const SupplierColumn = [
    {
        title: 'Mã nhà cung cấp',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tên nhà cung cấp',
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
        title: "Trạng thái",
        dataIndex: "statusTransaction",
        key: "status",
        render: (status: boolean) => {
            return status ? <p style={{color: 'blue'}}>Đang giao dịch</p> :
            <p style={{color: 'red'}}>Ngừng giao dịch</p>
        },


    }
];