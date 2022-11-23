import { Button, Modal, Table, Tabs, Image, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllOrder, updateStatusOrderByAdmin, getOrderItemsByIdOrder, searchOrderAll } from '../../service/ManagerOrderAdmin';
import { IShowOrder, IShowOrderItems } from '../../type/ShowOrderType';
import { EyeOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { Input } from 'antd';
import { debounce } from '@mui/material';


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
                <Tag color="green" hidden={!(status === 8)}>Giao hàng thành công</Tag>
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
            render: (data: IShowOrder) => <div>
                <Button hidden={!(data.status === 5)} type="primary" onClick={() => { updateStatus(6, data.id) }} ghost style={{ marginRight: 16 }}>Xác nhận</Button >
                <Button hidden={!(data.status === 5)} danger onClick={() => { updateStatus(11, data.id) }} style={{ marginRight: 16 }}>Huỷ đơn</Button >
                <Button hidden={!(data.status === 6)} danger onClick={() => { updateStatus(7, data.id) }} style={{ marginRight: 16 }}>Shipper đã lấy hàng</Button >
                <Button shape="circle" onClick={() => { showModal(data.id) }} icon={<EyeOutlined />} />
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
            render: (data: IShowOrderItems) => <div>{data.option1 + "," + data.option2 + "," + data.option3}</div>
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
    const [showOrder, setShowOrder] = useState([] as IShowOrder[])
    const [showOrderItems, setShowOrderItems] = useState([] as IShowOrderItems[])
    const [showOrderByStatus, setShowOrderByStatus] = useState([] as IShowOrder[])
    const [listId, setListId] = useState([] as number[])
    const [reload, setReload] = useState(false);
    const [reloadTableItem, setReloadTableItem] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState("1");
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        setReload(true);
        getAllOrder().then((res) => {
            const newResult = res.data.map((obj: IShowOrder, index: number) => ({ ...obj, key: index }))
            setShowOrder(newResult)
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
    const debounceDropDown = useCallback(debounce((nextValue: string) => loadData(nextValue), 700), [currentTab])

    const loadData = (value: string) => {
        searchOrderAll(value).then(res => {
            const newResult = res.data.map((obj: IShowOrder, index: number) => ({ ...obj, key: index }))
            setShowOrder(newResult)
            let newShowOrder: IShowOrder[] = []
            console.log(Number(currentTab));
            if (currentTab === "10,11") {
                newShowOrder = [];
                newResult.map((e: IShowOrder) => {
                    if (e.status === 11 || e.status === 10) {
                        newShowOrder.push(e)
                    }
                })
                setShowOrderByStatus(newShowOrder)
            } else {
                newShowOrder = [];
                newResult.map((e: IShowOrder) => {
                    if (e.status === Number(currentTab)) {
                        newShowOrder.push(e)
                    }
                })
                console.log(newShowOrder);
                setShowOrderByStatus(newShowOrder)
            }
            setReload(false);
        }, (err) => {
            console.log(err);
            setReload(false);

        })
    }
    function handleInputOnchange(e: any) {
        setReload(true);
        const { value } = e.target;
        setKeyword(value);
        debounceDropDown(value);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [loading, setLoading] = useState(false);

    // action_by: đợi api security của minh 
    const updateMultiple = (status_id: number) => {
        setLoading(true);
        setReload(true);
        updateStatusOrderByAdmin(status_id, listId, "Nguyen Van Duc").then(() => {
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
                    if (e.status === Number(currentTab)) {
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
        setCurrentTab(key);
        if (key === "5") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 5) {
                    newShowOrder.push(e)
                }
            })
            console.log(newShowOrder)
            setShowOrderByStatus(newShowOrder)
        }
        if (key === "6") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 6) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
        }
        if (key === "7") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 7) {
                    newShowOrder.push(e)
                }
            })

            setShowOrderByStatus(newShowOrder)

        }
        if (key === "8") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 8) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
        }
        if (key === "9") {
            newShowOrder = [];
            showOrder.map((e: IShowOrder) => {
                if (e.status === 9) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
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
        }
    };

    const updateStatus = (status_id: number, idOrder: number) => {
        setReload(true);
        const listId: number[] = []
        listId.push(idOrder)
        updateStatusOrderByAdmin(status_id, listId, "Nguyen Van Duc").then(() => {
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật trạng thái thành công '
            })
            loadData(keyword)
            setReload(false);
        }, (error) => {
            Toast.fire({
                icon: 'error',
                title: 'Cập nhật trạng thái thất bại '
            })
        })
    };
    type PositionType = 'right';

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        right: <Input onChange={(e) => handleInputOnchange(e)} style={{ padding: '8px', marginTop: 10 }}
            className="tabs-extra-demo-button"
            placeholder="Tìm kiếm theo mã đơn hàng, Tên người mua, số điện thoại" />
    };
    return (
        <><div>
            <Tabs defaultActiveKey={currentTab} tabBarExtraContent={OperationsSlot} onChange={onChangeTab}>
                <Tabs.TabPane tab="Tất cả" key="1">
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