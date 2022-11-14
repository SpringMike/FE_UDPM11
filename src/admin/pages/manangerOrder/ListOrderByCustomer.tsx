import { Button, Checkbox, Modal, Table, Tabs, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getAllOrder, updateStatusOrderByAdmin, getOrderItemsByIdOrder } from '../../service/ManagerOrderAdmin';
import { IShowOrder, IShowOrderItems } from '../../type/ShowOrderType';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { text } from 'stream/consumers';
import { removeAllListeners } from 'process';


const ListOrderByCustomer = () => {

    const columns: ColumnsType<IShowOrder> = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 50,
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
    const columnsForOrderItem: ColumnsType<IShowOrderItems> = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 50,
        },
        {
            title: 'Sản phẩm',
            colSpan: 2,
            dataIndex: 'name',
        },
        {
            title: 'Ảnh',
            colSpan: 0,
            dataIndex: 'image',
            render: (image) => <div><Image width={100} src={image} /></div>
        },
        {
            title: 'Phân loại',
            dataIndex: 'megerOp',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'total_price',
        }
    ];
    const newColumn: ColumnsType<IShowOrder> = [
        ...columns,
        {
            title: 'Hành động',
            dataIndex: 'id',
            key: 'x',
            render: (id) => <div>
                <Button type="primary" onClick={() => { updateStatus(6, id) }} ghost style={{ marginRight: 16 }}>Xác nhận</Button >
                <Button danger onClick={() => { updateStatus(11, id) }} style={{ marginRight: 16 }}>Huỷ đơn</Button >
                <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} />
            </div>,
        },
    ]
    const [showOrder, setShowOrder] = useState([] as IShowOrder[])
    const [showOrderItems, setShowOrderItems] = useState([] as IShowOrderItems[])
    const [showOrderByStatus, setShowOrderByStatus] = useState([] as IShowOrder[])
    const [newColumns, setNewColumns] = useState(newColumn as ColumnsType<IShowOrder>)
    const [listId, setListId] = useState([] as number[])
    const [reload, setReload] = useState(false);
    const [reloadTableItem, setReloadTableItem] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setReload(true);
        getAllOrder().then((res) => {
            const newResult = res.data.map((obj: IShowOrder, index: number) => ({ ...obj, key: index }))
            setShowOrder(newResult)
            const newShowOrder: IShowOrder[] = []
            res.data.map((e: IShowOrder) => {
                if (e.status === 5) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
            console.log(newShowOrder)
            console.log(newResult)
            setReload(false);
        }, (err) => {
            setReload(false);
            console.log('OUT', err);
        });
    }, [])

    const showModal = (idOrder: number) => {
        setIsModalOpen(true);
        setReloadTableItem(true);
        getOrderItemsByIdOrder(idOrder).then((res) => {
            const newResult = res.data.map((obj: IShowOrderItems,) => ({ ...obj, megerOp: obj.option1 + "," + obj.option2 + "," + obj.option3 }))
            setShowOrderItems(res.data)
            setReloadTableItem(false);
        }, (err) => {
            setReloadTableItem(false);
            console.log('OUT', err);
        });
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [loading, setLoading] = useState(false);
    // const load = () => (
    // <div style={{ width: '100%' ,height:'100%', border: '1px dotted black', display: "flex", padding: 50, justifyContent: "center" }}>
    //   {loading ? <Antd.Spin spinning={true}></Antd.Spin>: <PlusOutlined />}
    // </div>
    //   );
    const updateMultiple = (status_id: number) => {
        setLoading(true);
        setReload(true);
        updateStatusOrderByAdmin(status_id, listId).then((res) => {
            setLoading(false);
            getAllOrder().then((res) => {
                const newResult = res.data.map((obj: IShowOrder, index: number) => ({ ...obj, key: index }))
                setShowOrder(newResult)
                const newShowOrder: IShowOrder[] = []
                res.data.map((e: IShowOrder) => {
                    if (e.status === (status_id - 1)) {
                        newShowOrder.push(e)
                    }
                })
                setShowOrderByStatus(newShowOrder)
                console.log(newShowOrder)
                console.log(newResult)
                setReload(false);
            }, (err) => {
                setReload(false);
                console.log('OUT', err);
            });
        })

    };

    const [selectedRows, setSelectedRows] = useState<IShowOrder[]>([]);
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

    let newShowOrder: IShowOrder[] = []

    const hasSelected = selectedRows.length > 0;
    const onChangeTab = (key: string) => {
        if (key === "5") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 5) {
                    newShowOrder.push(e)
                }
            })
            console.log(newShowOrder)
            setShowOrderByStatus(newShowOrder)
            const newColumn: ColumnsType<IShowOrder> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div>
                        <Button type="primary" onClick={() => { updateStatus(6, id) }} ghost style={{ marginRight: 16 }}>Xác nhận</Button >
                        <Button danger onClick={() => { updateStatus(11, id) }} style={{ marginRight: 16 }}>Huỷ đơn</Button >
                        <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} />
                    </div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "6") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 6) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<IShowOrder> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div>
                        <Button type="primary" onClick={() => { updateStatus(7, id) }} ghost style={{ marginRight: 16 }}>Shipper đã lấy hàng</Button>
                        <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} />
                    </div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "7") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 7) {
                    newShowOrder.push(e)
                }
            })

            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<IShowOrder> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div><Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "8") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 8) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<IShowOrder> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div><Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "9") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 9) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<IShowOrder> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div><Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "10,11") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 11 || e.status === 10) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
            console.log(key + newShowOrder)
            const newColumn: ColumnsType<IShowOrder> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div><Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        }
    };

    const updateStatus = (status_id: number, idOrder: number) => {
        const listId: number[] = []
        listId.push(idOrder)
        updateStatusOrderByAdmin(status_id, listId).then((res) => {
            setReload(true);
            getAllOrder().then((res) => {
                const newResult = res.data.map((obj: IShowOrder, index: number) => ({ ...obj, key: index }))
                setShowOrder(newResult)
                const newShowOrder: IShowOrder[] = []
                res.data.map((e: IShowOrder) => {
                    if (status_id === 10 || status_id === 11) {
                        if (e.status === (5)) {
                            newShowOrder.push(e)
                        }
                    } else {
                        if (e.status === (status_id - 1)) {
                            newShowOrder.push(e)
                        }
                    }
                })
                setShowOrderByStatus(newShowOrder)
                setReload(false);
            }, (err) => {
                setReload(false);
                console.log('OUT', err);
            });
        })
    };
    return (
        <><div>
            <Tabs defaultActiveKey="5" onChange={onChangeTab}>
                <Tabs.TabPane tab="Chờ xác nhận" key="5">
                    <Button type="primary" ghost loading={loading} onClick={() => updateMultiple(6)} disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }}>
                        Xác nhận
                    </Button>
                    <div></div>
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ lấy hàng" key="6">
                    <Button type="primary" ghost loading={loading} onClick={() => updateMultiple(7)} disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }}>
                        Shipper đã lấy hàng
                    </Button>
                    <div></div>
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đang giao hàng" key="7">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thành công" key="8">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thất bại" key="9">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã huỷ" key="10,11">
                    <Table key={1} rowSelection={rowSelection} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
            </Tabs>
        </div>
            <Modal title="Chi Tiết Đơn Hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} >
                <Table columns={columnsForOrderItem} dataSource={showOrderItems} loading={{ spinning: reloadTableItem }} />;
            </Modal></>
    );
}

export default ListOrderByCustomer