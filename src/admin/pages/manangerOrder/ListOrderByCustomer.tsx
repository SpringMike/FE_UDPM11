import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getAllOrder } from '../../service/ManagerOrderAdmin';
import { IShowOrder } from '../../type/ShowOrderType';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<IShowOrder> = [
    {
        title: 'Name',
        dataIndex: 'id',
    },
    {
        title: 'Age',
        dataIndex: 'status',
    },
];


// const columns: ColumnsType<DataType> = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//     },
// ];



const ListOrderByCustomer = () => {

    const [showOrder, setShowOrder] = useState([] as IShowOrder[])
    useEffect(() => {
        getAllOrder().then((res) => {
            setShowOrder(res.data)
        })
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<IShowOrder[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: IShowOrder[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={showOrder} />
        </div>
    );
}

export default ListOrderByCustomer