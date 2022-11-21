import { Button, Checkbox, Modal, Table, Tabs, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { getAllOrderReturn, getOrderReturnItemsByIdOrder, updateStatusReturnOrderByAdmin } from '../../service/ManagerOrderAdmin';
import { OrderReturnResponse, OrderReturnItemResponse } from '../../type/OrderReturn';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { text } from 'stream/consumers';
import { removeAllListeners } from 'process';
import Swal from 'sweetalert2';
import Tag from 'antd/es/tag';


const OrderReturnMananger = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    })
    const columns: ColumnsType<OrderReturnResponse> = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 50,
        },
        {
            title: 'Mã hoá đơn mua',
            dataIndex: 'id_order_purchase',
            width: 50,
        },
        {
            title: 'Người Mua',
            dataIndex: 'account_name',
        },
        {
            title: 'Lý do trả hàng',
            dataIndex: 'note',
        },
        {
            title: 'Tổng số lượng',
            dataIndex: 'totalQuantityReturn',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPriceReturn',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'statusReturn',
            render: (statusReturn) => <div>   <Tag color="cyan" hidden={!(statusReturn === 12)}>Chờ xem xét</Tag>
                <Tag color="cyan" hidden={!(statusReturn === 13)}>Shop đợi nhận hàng hoàn</Tag>
                <Tag color="red" hidden={!(statusReturn === 14)}>Từ chối yêu cầu</Tag>
                <Tag color="cyan" hidden={!(statusReturn=== 15)}>Shop đã nhận được hàng hoàn</Tag>
                <Tag color="cyan" hidden={!(statusReturn === 16)}>Shop đã hoàn tiền</Tag>
            </div>
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'createDate',
        }
    ];
    const columnsForOrderItem: ColumnsType<OrderReturnItemResponse> = [
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
            dataIndex: 'optionProduct',
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
            dataIndex: 'totalPrice',
        }
    ];
    const newColumn: ColumnsType<OrderReturnResponse> = [
        ...columns,
        {
            title: 'Hành động',
            dataIndex: 'id',
            key: 'x',
            render: (id) => <div>
                <Button type="ghost" color='info' onClick={() => { updateStatus(13, id) }} style={{ marginRight: 16 }}>Đồng ý</Button >
                <Button danger onClick={() => { updateStatus(11, id) }} style={{ marginRight: 14 }}>Từ chối</Button >
                <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} />
            </div>,
        },
    ]
    const [showOrder, setShowOrder] = useState([] as OrderReturnResponse[])
    const [showOrderItems, setShowOrderItems] = useState([] as OrderReturnItemResponse[])
    const [showOrderByStatus, setShowOrderByStatus] = useState([] as OrderReturnResponse[])
    const [newColumns, setNewColumns] = useState(newColumn as ColumnsType<OrderReturnResponse>)
    const [listId, setListId] = useState([] as number[])
    const [reload, setReload] = useState(false);
    const [reloadTableItem, setReloadTableItem] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setReload(true);
        getAllOrderReturn().then((res) => {
            const newResult = res.data.map((obj: OrderReturnResponse, index: number) => ({ ...obj, key: index }))
            setShowOrder(newResult)
            const newShowOrder: OrderReturnResponse[] = []
            newResult.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 12) {
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
        getOrderReturnItemsByIdOrder(idOrder).then((res) => {
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
    const [selectedRows, setSelectedRows] = useState<OrderReturnResponse[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (
        newSelectedRowKeys: React.Key[],
        selectedRows: OrderReturnResponse[]
    ) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(selectedRows);
        let getListId: number[] = []
        selectedRows.map((obj: OrderReturnResponse) => { getListId.push(obj.id) })
        setListId(getListId)
        console.log(getListId)
    };

    const rowSelection = {
        selectedRowKeys,
        onselect: selectedRowKeys,
        onChange: onSelectChange,
    };

    let newShowOrder: OrderReturnResponse[] = []

    const hasSelected = selectedRows.length > 0;
    const onChangeTab = (key: string) => {
        if (key === "12") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 12) {
                    newShowOrder.push(e)
                }
            })
            console.log(newShowOrder)
            setShowOrderByStatus(newShowOrder)
            const newColumn: ColumnsType<OrderReturnResponse> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div>
                        <Button type="primary" onClick={() => { updateStatus(13, id) }} ghost style={{ marginRight: 16 }}>Đồng ý</Button >
                        <Button danger onClick={() => { updateStatus(14, id) }} style={{ marginRight: 16 }}>Từ chối</Button >
                        <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} />
                    </div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "13") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 13) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<OrderReturnResponse> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div>
                        <Button type="primary" onClick={() => { updateStatus(15, id) }} ghost style={{ marginRight: 16 }}>Đã nhân được hàng</Button>
                        <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} />
                    </div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "14") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 14) {
                    newShowOrder.push(e)
                }
            })

            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<OrderReturnResponse> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div>
                        <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} />
                    </div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "15") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 15) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<OrderReturnResponse> = [
                ...columns,
                {
                    title: 'Hành động',
                    dataIndex: 'id',
                    key: 'x',
                    render: (id) => <div><Button type="primary" onClick={() => { updateStatus(16, id) }} ghost style={{ marginRight: 16 }}>Đã hoàn tiền</Button>
                        <Button shape="circle" onClick={() => { showModal(id) }} icon={<EyeOutlined />} /></div>,
                },
            ]
            setNewColumns(newColumn)
        }
        if (key === "16") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 16) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)

            const newColumn: ColumnsType<OrderReturnResponse> = [
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
        setReload(false);
        updateStatusReturnOrderByAdmin(status_id, idOrder).then((res) => {
            console.log(res.data);
            setReload(true);
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật trạng thái thành công '
            })
            getAllOrderReturn().then((res) => {
                const newResult = res.data.map((obj: OrderReturnResponse, index: number) => ({ ...obj, key: index }))
                setShowOrder(newResult)
                const newShowOrder: OrderReturnResponse[] = []
                newResult.map((e: OrderReturnResponse) => {
                    if (status_id == 14) {
                        if (e.statusReturn === 12) {
                            newShowOrder.push(e)
                        }
                    } else if (status_id == 15) {
                        if (e.statusReturn === 13) {
                            newShowOrder.push(e)
                        }
                    } else {
                        if (e.statusReturn === (status_id - 1)) {
                            newShowOrder.push(e)
                        }
                    }
                })
                setShowOrderByStatus(newShowOrder)
                setReload(false);
            }, (err) => {
                setReload(false);
                console.log('OUT', err);
                Toast.fire({
                    icon: 'error',
                    title: 'Cập nhật trạng thái thất bại '
                })
            });
        })
    };
    return (
        <><div>
            <Tabs defaultActiveKey="5" onChange={onChangeTab}>
                <Tabs.TabPane tab="Các yêu cầu trả hàng" key="12">
                    <Table key={1} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ nhận hàng" key="13">
                    <Table key={1} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã nhận được hàng" key="15">
                    <Table key={1} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã hoàn tiền" key="16">
                    <Table key={1} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã từ chối" key="14">
                    <Table key={1} columns={newColumns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
            </Tabs>
        </div>
            <Modal title="Chi Tiết Đơn Hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} >
                <Table columns={columnsForOrderItem} dataSource={showOrderItems} loading={{ spinning: reloadTableItem }} />;
            </Modal></>
    );
}

export default OrderReturnMananger