import { Button, Checkbox, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getAllOrder, updateStatusOrderByAdmin } from '../../service/ManagerOrderAdmin';
import { IShowOrder } from '../../type/ShowOrderType';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { text } from 'stream/consumers';


const ListOrderByCustomer = () => {

    const columns: ColumnsType<IShowOrder> = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Người Mua',
            dataIndex: 'account_name',
        },
        {
            title: 'Tổng số lượng',
            dataIndex: 'total_quantity',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total_price',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
        },
        {
            title: 'Ngày Mua',
            dataIndex: 'created_time',
        }
    ];
    const newColumn = [
        ...columns,
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <div><Button type="primary" ghost style={{ marginRight: 16 }}>Xác nhận</Button >
                <Button danger style={{ marginRight: 16 }}>Huỷ đơn</Button >
                <Button shape="circle" icon={<EyeOutlined />} /></div>,
        },
    ]
    const [showOrder, setShowOrder] = useState([] as IShowOrder[])
    const [newColumns, setNewColumns] = useState(newColumn as ColumnsType<IShowOrder>)
    const [listId, setListId] = useState([] as number[])
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setReload(true);
        getAllOrder().then((res) => {
            const newResult = res.data.map((obj: IShowOrder, index: number) => ({ ...obj, key: index }))
            setShowOrder(newResult)
            console.log(res.data)
            setReload(false);
        }, (err) => {
            setReload(false);
            console.log('OUT', err);
        });

    },[])


    const [loading, setLoading] = useState(false);
    // const load = () => (
    // <div style={{ width: '100%' ,height:'100%', border: '1px dotted black', display: "flex", padding: 50, justifyContent: "center" }}>
    //   {loading ? <Antd.Spin spinning={true}></Antd.Spin>: <PlusOutlined />}
    // </div>
    //   );
    const start = (status_id: number) => {
        setLoading(true);
        updateStatusOrderByAdmin(status_id, listId).then((res) => {
            setLoading(false);
            console.log( res.data);
        })
        
    };

    const [selectedRows, setSelectedRows] = useState<IShowOrder[]>([]);
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (
        newSelectedRowKeys: React.Key[],
        selectedRows: IShowOrder[]
    ) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(selectedRows);
        let getListId: number[] = []
        selectedRows.map((obj: IShowOrder) => { getListId.push(obj.id) })
        setListId(getListId)
        console.log(getListId)
    };

    const rowSelection = {
        selectedRowKeys,
        onselect: selectedRowKeys,
        onChange: onSelectChange,
    };


    const hasSelected = selectedRows.length > 0;
    const onChangeTab = (key: string) => {
        console.log(key);
        if (key === "5") {
            const newColumn = [
                ...columns,
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: () => <div><Button type="primary" ghost style={{ marginRight: 16 }}>Xác nhận</Button >
                        <Button danger style={{ marginRight: 16 }}>Huỷ đơn</Button >
                        <Button shape="circle" icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        } else if (key === "6") {
            const newColumn : ColumnsType<IShowOrder> = [
                ...columns,
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: () => <div><Button type="primary" ghost style={{ marginRight: 16 }}>Shipper đã lấy hàng</Button> <Button shape="circle" icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        } else {
            const newColumn = [
                ...columns,
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: () => <div><Button shape="circle" type="primary" icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        }
    };

    const updateStatus = (status_id: number) => {

        updateStatusOrderByAdmin(status_id, listId).then((res) => {

        })
    };
    return (
        <div >
            <Tabs defaultActiveKey="1" onChange={onChangeTab} >
                <Tabs.TabPane tab="Chờ xác nhận" key="5">
                    <Button type="primary" loading={loading} onClick={() => start(6)} disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }}>
                        Xác nhận
                    </Button>
                    <div></div>
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ lấy hàng" key="6">
                    <Button type="primary" loading={loading} onClick={() => start(7)} disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }} >
                        Shipper đã lấy hàng
                    </Button>
                    <div></div>
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đang giao hàng" key="7">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thành công" key="8">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thất bại" key="9">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã huỷ" key="[10,11]">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
            </Tabs>

        </div>
    );
}

export default ListOrderByCustomer