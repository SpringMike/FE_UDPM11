/* eslint-disable react-hooks/exhaustive-deps */
import  {useCallback, useEffect, useState} from "react";
import {IImportInvoice} from "../../type/ImportInvoiceType";
import {getImportInvoices} from "../../service/ImportInvoiceApi";
import {Button, Spin, Table} from "antd";

import {Link, useNavigate} from "react-router-dom";
import {Tabs} from 'antd';
import {Input} from 'antd';
import '../../styles/Tab.css'
import {debounce} from "@mui/material";
import {PlusOutlined} from "@ant-design/icons";
import {ImportInvoiceColumn} from "../../datatablesource/ImportInvoice";
import React from "react";


const ListImportInvoice = () => {

    const navigate = useNavigate();
    const [importInvoices, setImportInvoices] = useState<IImportInvoice[]>([])
    const [importInvoicesIsDone, setImportInvoicesIsDone] = useState<IImportInvoice[]>([])
    const [importInvoicesIsReturn, setImportInvoicesIsReturn] = useState<IImportInvoice[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [keyword, setKeyword] = useState('');
    const [spin, setSpin] = useState(true)

    const debounceDropDown = useCallback(debounce((nextValue: string) => loadData(nextValue), 700), [])

    function handleInputOnchange(e: any) {
        setIsLoading(false)
        const {value} = e.target;
        setKeyword(value);
        debounceDropDown(value);
    }

    const loadData = (value: string) => {
        getImportInvoices(value).then((r) => {
            setImportInvoicesIsDone(r.data.filter((result: IImportInvoice) => !result.isDone))
            setImportInvoicesIsReturn(r.data.filter((result: IImportInvoice) => result.isReturn))
            setImportInvoices(r.data)
            setIsLoading(true)

            setSpin(false)

        })
    }

    useEffect(() => {
        loadData(keyword)
        document.title = "Đơn nhập hàng"

    }, [])
    type PositionType = 'right';

    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        right: <Input onChange={(e) => handleInputOnchange(e)} style={{padding: '8px', marginTop: 10}}
                      className="tabs-extra-demo-button"
                      placeholder="Tìm kiếm theo mã đơn hàng, mã nhà cung cấp, tên kho"/>
    };

    return (
        <Spin spinning={spin}>
             <Input onChange={(e) => handleInputOnchange(e)} style={{padding: '8px', marginTop: 10}}
                      className="tabs-extra-demo-button"
                      placeholder="Tìm kiếm theo mã đơn hàng, mã nhà cung cấp, tên kho"/>
            <div className='p-5'>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '25px',
                    alignItems: "center"
                }}>
                    <h1 style={{fontSize: '30px', margin: 0, marginRight: 10}}>Đơn nhập hàng</h1>
                    <Link to="/purchase_orders/create">
                        <Button type="primary"><PlusOutlined/> Tạo mới đơn hàng</Button>
                    </Link>
                </div>

                <Tabs style={{display: 'block'}} tabBarExtraContent={OperationsSlot} defaultActiveKey="1">
                    <Tabs.TabPane tab="Tất cả cả đơn hàng" key="1">
                        {
                            importInvoices.length > 0 && <Table dataSource={importInvoices}
                                                                columns={ImportInvoiceColumn.filter(col => col.dataIndex !== 'isReturn')}
                                                                rowKey="code"
                                                                pagination={{defaultPageSize: 10}}
                                                                onRow={(record) => {
                                                                    return {
                                                                        onClick: event => navigate({pathname: `details/${record.code}`}),
                                                                    }
                                                                }}
                                                                loading={!isLoading}
                                // rowSelection={rowSelection}
                            />
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đang giao dịch" key="2">
                        {
                            importInvoicesIsDone.length > 0 && <Table dataSource={importInvoicesIsDone}
                                                                      columns={ImportInvoiceColumn.filter(col => col.dataIndex !== 'isReturn')}
                                                                      rowKey="code"
                                                                      pagination={{defaultPageSize: 10}}
                                                                      onRow={(record) => {
                                                                          return {
                                                                              onClick: event => navigate({pathname: `details/${record.code}`}),
                                                                          }
                                                                      }}
                                                                      loading={!isLoading}
                                // rowSelection={rowSelection}
                            />
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Trả hàng" key="3">
                        {
                            importInvoicesIsReturn.length > 0 && <Table dataSource={importInvoicesIsReturn}
                                                                        columns={ImportInvoiceColumn.filter(col => col.dataIndex !== 'isReturn')}
                                                                        rowKey="code"
                                                                        pagination={{defaultPageSize: 10}}
                                                                        onRow={(record) => {
                                                                            return {
                                                                                onClick: event => navigate({pathname: `details/${record.code}`}),
                                                                            }
                                                                        }}
                                                                        loading={!isLoading}
                                // rowSelection={rowSelection}
                            />
                        }
                    </Tabs.TabPane>

                </Tabs>
            </div>
        </Spin>
    )
}
export default ListImportInvoice