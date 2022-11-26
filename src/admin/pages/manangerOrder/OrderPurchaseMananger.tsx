import { Button, Checkbox, Modal, Table, Tabs, Image, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getAllOrder, updateStatusOrderByAdmin, getOrderItemsByIdOrder, searchOrderAll } from '../../service/ManagerOrderAdmin';
import { IShowOrder, IShowOrderItems } from '../../type/ShowOrderType';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { text } from 'stream/consumers';
import { removeAllListeners } from 'process';
import Swal from 'sweetalert2';
import { Input, Space } from 'antd';

const { Search } = Input;


const OrderPurchaseMananger = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })
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
            title: 'Số điện thoại',
            dataIndex: 'phone_customer',
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
            render: (status) => <div>
                <Tag color="cyan" hidden={!(status === 5)}>Chờ xác nhận</Tag>
                <Tag color="cyan" hidden={!(status === 6)}>Chờ xác ship lấy hàng</Tag>
                <Tag color="cyan" hidden={!(status === 7)}>Đang giao hàng</Tag>
                <Tag color="cyan" hidden={!(status === 8)}>Giao hàng thành công</Tag>
                <Tag color="red" hidden={!(status === 9)}>Giao hàng thất bại</Tag>
                <Tag color="red" hidden={!(status === 10)}>Huỷ bởi người dùng</Tag>
                <Tag color="red" hidden={!(status === 11)}>Huỷ bởi admin</Tag>
            </div>
        },
        {
            title: 'Ngày Mua',
            dataIndex: 'created_time',
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            render: (IShowOrder: IShowOrder) => <div>
                <Button hidden={!(IShowOrder.status === 5)} type="primary" onClick={() => { updateStatus(6, IShowOrder.id) }} ghost style={{ marginRight: 16 }}>Xác nhận</Button >
                <Button hidden={!(IShowOrder.status === 6)} danger onClick={() => { updateStatus(11, IShowOrder.id) }} style={{ marginRight: 16 }}>Huỷ đơn</Button >
                <Button shape="circle" onClick={() => { showModal(IShowOrder.id) }} icon={<EyeOutlined />} />
            </div>,
        },
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
            dataIndex: '',
            render: (IShowOrderItems: IShowOrderItems) => <div>{IShowOrderItems.option1 + "," + IShowOrderItems.option2 + "," + IShowOrderItems.option3}</div>
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
            newResult.map((e: IShowOrder) => {
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
    // action_by: đợi api security của minh 
    const updateMultiple = (status_id: number) => {
        setLoading(true);
        setReload(true);
        updateStatusOrderByAdmin(status_id, listId, "Nguyen Van Duc").then((res) => {
            setLoading(false);
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật trạng thái thành công '
            })
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
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật trạng thái thất bại '
                })
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
        updateStatusOrderByAdmin(status_id, listId, "Nguyen Van Duc").then((res) => {
            setReload(true);
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật trạng thái thành công '
            })
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
                Toast.fire({
                    icon: 'success',
                    title: 'Cập nhật trạng thái thất bại '
                })
                setReload(false);
                console.log('OUT', err);
            });
        })
    };
    const onSearch = (value: string) => {
        searchOrderAll(value).then(res => {
            console.log(res.data);
        }, (err) => {
            console.log(err);
        })
    }
    return (
        <><div>
            <Tabs defaultActiveKey="5" onChange={onChangeTab}>
                <Tabs.TabPane tab="Tất cả" key="20">
                    <Search
                        addonBefore="https://"
                        placeholder="input search text"
                        allowClear
                        onSearch={onSearch}
                        style={{ width: 304 }}
                    />
                    <Table key={1} rowSelection={rowSelection} columns={columns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ xác nhận" key="5">
                    <Button type="primary" ghost loading={loading} onClick={() => updateMultiple(6)} disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }}>
                        Xác nhận
                    </Button>
                    <div></div>
                    <Table key={1} rowSelection={rowSelection} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ lấy hàng" key="6">
                    <Button type="primary" ghost loading={loading} onClick={() => updateMultiple(7)} disabled={!hasSelected} style={{ marginBottom: 16, float: 'right' }}>
                        Shipper đã lấy hàng
                    </Button>
                    <div></div>
                    <Table key={1} rowSelection={rowSelection} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đang giao hàng" key="7">
                    <Table key={1} rowSelection={rowSelection} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thành công" key="8">
                    <Table key={1} rowSelection={rowSelection} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Giao hàng thất bại" key="9">
                    <Table key={1} rowSelection={rowSelection} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã huỷ" key="10,11">
                    <Table key={1} rowSelection={rowSelection} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
            </Tabs>
        </div>
            <Modal title="Chi Tiết Đơn Hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} >
                <Table columns={columnsForOrderItem} dataSource={showOrderItems} loading={{ spinning: reloadTableItem }} />;
            </Modal></>
    );
}

export default OrderPurchaseMananger