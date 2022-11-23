import { Button, Modal, Table, Tabs, Image, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllOrderReturn, getOrderReturnItemsByIdOrder, searchOrderReturnAll, updateStatusReturnOrderByAdmin } from '../../service/ManagerOrderAdmin';
import { OrderReturnResponse, OrderReturnItemResponse } from '../../type/OrderReturn';
import { EyeOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { Input } from 'antd';
import { debounce } from '@mui/material';

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
            dataIndex: 'name_user',
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
            <Tag color="green" hidden={!(statusReturn === 16)}>Shop đã hoàn tiền</Tag>
        </div>
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'createDate',
        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            render: (data:OrderReturnResponse) => <div>
                <Button hidden={!(data.statusReturn === 12)} type="ghost" color='info' onClick={() => { updateStatus(13, data.id) }} style={{ marginRight: 16 }}>Đồng ý</Button >
                <Button hidden={!(data.statusReturn === 12)} danger  onClick={() => { updateStatus(11, data.id) }} style={{ marginRight: 14 }}>Từ chối</Button >
                <Button hidden={!(data.statusReturn === 13)} type="primary" onClick={() => { updateStatus(15, data.id) }} ghost style={{ marginRight: 16 }}>Đã nhân được hàng</Button>
                <Button hidden={!(data.statusReturn === 16)} type="primary" onClick={() => { updateStatus(16, data.id) }} ghost style={{ marginRight: 16 }}>Đã hoàn tiền</Button>
                <Button shape="circle" onClick={() => { showModal(data.id) }} icon={<EyeOutlined />} />
            </div>,
        },
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
   
    const [showOrder, setShowOrder] = useState([] as OrderReturnResponse[])
    const [showOrderItems, setShowOrderItems] = useState([] as OrderReturnItemResponse[])
    const [showOrderByStatus, setShowOrderByStatus] = useState([] as OrderReturnResponse[])
    // const [newColumns, setNewColumns] = useState(newColumn as ColumnsType<OrderReturnResponse>)
    const [listId, setListId] = useState([] as number[])
    const [reload, setReload] = useState(false);
    const [reloadTableItem, setReloadTableItem] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setReload(true);
        getAllOrderReturn().then((res) => {
            const newResult = res.data.map((obj: OrderReturnResponse, index: number) => ({ ...obj, key: index }))
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
    const [currentTab, setCurrentTab] = useState("1");
    const [keyword, setKeyword] = useState('');

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
        setCurrentTab(key)
        if (key === "12") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 12) {
                    newShowOrder.push(e)
                }
            })
            console.log(newShowOrder)
            setShowOrderByStatus(newShowOrder)
        }
        if (key === "13") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 13) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
        }
        if (key === "14") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 14) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
        }
        if (key === "15") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 15) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
        }
        if (key === "16") {
            newShowOrder = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 16) {
                    newShowOrder.push(e)
                }
            })
            setShowOrderByStatus(newShowOrder)
        }
    };

    const updateStatus = (status_id: number, idOrder: number) => {
        setReload(true);
        updateStatusReturnOrderByAdmin(status_id, idOrder).then((res) => {
            console.log(res.data);
            Toast.fire({
                icon: 'success',
                title: 'Cập nhật trạng thái thành công '
            })
            loadData(keyword)
            setReload(false);
        }, (err)=>{
            Toast.fire({
                icon: 'error',
                title: 'Cập nhật trạng thất bại công '
              })
        })
    };
    const debounceDropDown = useCallback(debounce((nextValue: string) => loadData(nextValue), 700), [currentTab])

    const loadData = (value: string) => {
        searchOrderReturnAll(value).then(res => {
            const newResult = res.data.map((obj: OrderReturnResponse, index: number) => ({ ...obj, key: index }))
            setShowOrder(newResult)
            let newShowOrder: OrderReturnResponse[] = []
            console.log(Number(currentTab));
                newShowOrder = [];
                newResult.map((e: OrderReturnResponse) => {
                    if (e.statusReturn === Number(currentTab)) {
                        newShowOrder.push(e)
                    }
                })
                console.log(newShowOrder);
                setShowOrderByStatus(newShowOrder)
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
    type PositionType = 'right';

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        right: <Input onChange={(e) => handleInputOnchange(e)} style={{ padding: '8px', marginTop: 10 }}
            className="tabs-extra-demo-button"
            placeholder="Tìm kiếm theo mã đơn hàng, Tên người mua, số điện thoại" />
    };
    return (
        <><div>
            <Tabs defaultActiveKey="5" onChange={onChangeTab} tabBarExtraContent={OperationsSlot}>
                <Tabs.TabPane tab="Tất cả" key="1">
                    <Table key={1}  columns={columns} dataSource={showOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Các yêu cầu trả hàng" key="12">
                    <Table key={1}  columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ nhận hàng" key="13">
                    <Table key={1}  columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã nhận được hàng" key="15">
                    <Table key={1}  columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã hoàn tiền" key="16">
                    <Table key={1}  columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã từ chối" key="14">
                    <Table key={1}  columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
            </Tabs>
        </div>
            <Modal title="Chi Tiết Đơn Hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} >
                <Table columns={columnsForOrderItem} dataSource={showOrderItems} loading={{ spinning: reloadTableItem }} />;
            </Modal></>
    );
}

export default OrderReturnMananger