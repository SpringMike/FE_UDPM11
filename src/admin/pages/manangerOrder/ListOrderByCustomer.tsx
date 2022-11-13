import { Button, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getAllOrder, updateStatusOrderByAdmin } from '../../service/ManagerOrderAdmin';
import { IShowOrder } from '../../type/ShowOrderType';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import * as Antd from 'antd'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
        },
    ];
    const newColumn = [
        ...columns,
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <div><button>Xác nhận</button> <button style={{ marginRight: 16 }}>Huỷ đơn</button> <Button shape="circle" icon={<EyeOutlined />} /></div>,
        },
    ]
    const [showOrder, setShowOrder] = useState([] as IShowOrder[])
    const [newColumns, setNewColumns] = useState(newColumn as ColumnsType<IShowOrder>)

    useEffect(() => {
        getAllOrder().then((res) => {
            setShowOrder(res.data)
        })
        localStorage.removeItem('test2')
    }, [])

    const [loading, setLoading] = useState(false);
    // const load = () => (
    // <div style={{ width: '100%' ,height:'100%', border: '1px dotted black', display: "flex", padding: 50, justifyContent: "center" }}>
    //   {loading ? <Antd.Spin spinning={true}></Antd.Spin>: <PlusOutlined />}
    // </div>
    //   );
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const [selectedRows, setSelectedRows] = useState<IShowOrder[]>([]);
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: IShowOrder[]) => {
            setSelectedRows(selectedRows);
            console.log("selectedRows: ", selectedRows);
            let listId: number[] = [];
            selectedRows.map((e) => {
                listId.push(e.id);
            });
            setSelectedId(listId);
        }
    };
    const onChangeTab = (key: string) => {
        console.log(key);
        if (key === "1") {
            const newColumn = [
                ...columns,
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: () => <div><button style={{ marginRight: 16 }}>Xác nhận</button> <button style={{ marginRight: 16 }}>Huỷ đơn</button> <Button shape="circle" icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        } else if (key === "2") {
            const newColumn = [
                ...columns,
                {
                    title: 'Action',
                    dataIndex: '',
                    key: 'x',
                    render: () => <div><button style={{ marginRight: 16 }}>Shipper đã lấy hàng</button> <Button shape="circle" icon={<EyeOutlined />} /></div>,
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
                    render: () => <div><Button shape="circle" icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        }
    };



    const columns1: GridColDef[] = [
        // { field: 'id_cart_item', headerName: 'Cart Item Id', width: 70 },
        // { field: 'id_product_variant', headerName: 'Product Variant Id', width: 70 },
        { field: 'id', headerName: 'Ảnh', width: 70, headerAlign: 'center', align: 'center', },
        { field: 'status', headerName: 'Trang Thai', width: 70, headerAlign: 'center', align: 'center', },
    ];

    const onRowsSelectionHandler = (ids: any) => {
        const idsCItems: string[] = [];
        const selectedRowsData = ids.map((id: any) => showOrder.find((row) => row.id === id));
        selectedRowsData.forEach((e: any) => {
            let { id } = e;
            idsCItems.push(id)
        });
        localStorage.setItem('test2', JSON.stringify(idsCItems))
        // console.log(selectedRowsData);
    };


    const updateStatus = (status: any) => {
        console.log( JSON.parse(localStorage.getItem('test2') || '{}'))
        console.log(status);
        updateStatusOrderByAdmin(status, JSON.parse(localStorage.getItem('test2') || '{}')).then((res) => {
            console.log(res.data);
        })
    };


    const hasSelected = rowSelection != null;

    return (


        <div >
            <Tabs defaultActiveKey="1" onChange={onChangeTab}>
                <Tabs.TabPane tab="Chờ xác nhận" key="1">
                    <Button type="primary" onClick={
                        () => {
                            updateStatus(6)
                        }
                    }  disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }}>
                        Xác nhận
                    </Button>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={showOrder}
                            columns={columns1}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(showOrder) => showOrder.id}
                            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                            checkboxSelection
                        />
                    </div>
                    {/* <Table rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} /> */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ lấy hàng" key="2">
                    <Button type="primary" onClick={
                        () => {
                            updateStatus(6)
                        }
                    } disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }} >
                        Shipper đã lấy hàng
                    </Button>
                    <div></div>
                    <Table rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đang giao hàng" key="3">
                    <Table rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thành công" key="4">
                    <Table rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thất bại" key="5">
                    <Table rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã huỷ" key="6">
                    <Table rowSelection={rowSelection} columns={newColumns} dataSource={showOrder} />
                </Tabs.TabPane>
            </Tabs>

        </div>
    );
}

export default ListOrderByCustomer