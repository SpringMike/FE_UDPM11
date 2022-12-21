import { Button, Modal, Table, Tabs, Image, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useState } from 'react';
import { getAllOrderReturn, getOrderReturnItemsByIdOrder, searchOrderReturnAll, updateStatusReturnOrderByAdmin } from '../../service/ManagerOrderAdmin';
import { OrderReturnResponse, OrderReturnItemResponse } from '../../type/OrderReturn';
import { EyeOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { Input, DatePicker } from 'antd';
import { debounce } from '@mui/material';

const OrderReturnMananger = () => {
    const { RangePicker } = DatePicker;
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
                <Tag color="cyan" hidden={!(statusReturn === 15)}>Shop đã nhận được hàng hoàn</Tag>
                <Tag color="green" hidden={!(statusReturn === 16)}>Shop đã hoàn tiền</Tag>
            </div>
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'createDateString',
            // render: (createDate) => <div>{createDate}</div>

        },
        {
            title: 'Hành động',
            dataIndex: '',
            key: 'x',
            render: (data: OrderReturnResponse) => <div>
                <Button hidden={!(data.statusReturn === 12)} type="ghost" color='info' onClick={() => { updateStatus(13, data.id) }} style={{ marginRight: 16 }}>Đồng ý</Button >
                <Button hidden={!(data.statusReturn === 12)} danger onClick={() => { updateStatus(11, data.id) }} style={{ marginRight: 14 }}>Từ chối</Button >
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
    const [newShowOrder, setNewShowOrder] = useState([] as OrderReturnResponse[])
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
            const newResult = res.data.map((obj: OrderReturnResponse, index: number) => ({ ...obj, key: index, createDateString: new Date(obj.createDate).toLocaleString() }))
            setShowOrder(newResult)
            setNewShowOrder(newResult)
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

    let newShowOrderByStatus: OrderReturnResponse[] = []

    const hasSelected = selectedRows.length > 0;
    const onChangeTab = (key: string) => {
        setCurrentTab(key)
        if (key === "12") {
            newShowOrderByStatus = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 12) {
                    newShowOrderByStatus.push(e)
                }
            })
            console.log(newShowOrderByStatus)
            setShowOrderByStatus(newShowOrderByStatus)
        }
        if (key === "13") {
            newShowOrderByStatus = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 13) {
                    newShowOrderByStatus.push(e)
                }
            })
            setShowOrderByStatus(newShowOrderByStatus)
        }
        if (key === "14") {
            newShowOrderByStatus = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 14) {
                    newShowOrderByStatus.push(e)
                }
            })
            setShowOrderByStatus(newShowOrderByStatus)
        }
        if (key === "15") {
            newShowOrderByStatus = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 15) {
                    newShowOrderByStatus.push(e)
                }
            })
            setShowOrderByStatus(newShowOrderByStatus)
        }
        if (key === "16") {
            newShowOrderByStatus = [];
            showOrder.map((e: OrderReturnResponse) => {
                if (e.statusReturn === 16) {
                    newShowOrderByStatus.push(e)
                }
            })
            setShowOrderByStatus(newShowOrderByStatus)
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
        }, (err) => {
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

    const filterDate = (startDate: any, endDate: any) => {
        let filterPass = true
        const newShowOrder: OrderReturnResponse[] = showOrder.filter(row => {
            filterPass = true
            const date = new Date(row.createDateString)
             if (startDate && endDate) {
                filterPass = filterPass && (new Date(startDate) < date) && (new Date(endDate) > date)
             }
            //if filterPass comes back `false` the row is filtered out
            return filterPass
        }).map((obj: OrderReturnResponse) => ({ ...obj }))
        setNewShowOrder(newShowOrder)
    }
    const [dateFilter, setDateFilter] = useState<{ start: any, end: any }>({ start: null, end: null })
    useEffect(() => {
        filterDate(dateFilter.start, dateFilter.end)
    }, [showOrder])
    useEffect(() => {
        let newShowOrderByStatus: OrderReturnResponse[] = []
        console.log(Number(currentTab));
        newShowOrderByStatus = [];
        showOrder.map((e: OrderReturnResponse) => {
            if (e.statusReturn === Number(currentTab)) {
                newShowOrderByStatus.push(e)
            }
        })
        console.log(newShowOrderByStatus);
        setShowOrderByStatus(newShowOrderByStatus)
    }, [newShowOrder])
    const onChangeRangePicker = (dates: any, dateStrings: any) => {
        setDateFilter({ start: (dateStrings[0] === "") ? null : dateStrings[0], end: (dateStrings[1] === "") ? null : dateStrings[1] })
        filterDate((dateStrings[0] === "") ? null : dateStrings[0], (dateStrings[1] === "") ? null : dateStrings[1])
    }
    type PositionType = 'right';

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        right: <><Input onChange={(e) => handleInputOnchange(e)} style={{ padding: '8px', marginTop: 10, marginBottom: 10 }}
            className="tabs-extra-demo-button"
            placeholder="Tìm kiếm theo mã đơn hàng mua, Tên người mua" />

            <RangePicker showTime onChange={onChangeRangePicker} /></>

    };
    return (
        <><div>
             <><Input onChange={(e) => handleInputOnchange(e)} style={{ padding: '8px', marginTop: 10, marginBottom: 10 }}
            className="tabs-extra-demo-button"
            placeholder="Tìm kiếm theo mã đơn hàng mua, Tên người mua" />

            <RangePicker showTime onChange={onChangeRangePicker} /></>
            <Tabs defaultActiveKey="5" onChange={onChangeTab} >
                <Tabs.TabPane tab="Tất cả" key="1">
                    <Table key={1} columns={columns} dataSource={newShowOrder} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Các yêu cầu trả hàng" key="12">
                    <Table key={1} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Chờ nhận hàng" key="13">
                    <Table key={1} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã nhận được hàng" key="15">
                    <Table key={1} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã hoàn tiền" key="16">
                    <Table key={1} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đã từ chối" key="14">
                    <Table key={1} columns={columns} dataSource={showOrderByStatus} loading={{ spinning: reload }} />
                </Tabs.TabPane>
            </Tabs>
        </div>
            <Modal title="Chi Tiết Đơn Hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} >
                <Table columns={columnsForOrderItem} dataSource={showOrderItems} loading={{ spinning: reloadTableItem }} />;
            </Modal></>
    );
}

export default OrderReturnMananger