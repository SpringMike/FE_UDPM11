import { Button, Col, InputNumber, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    getDetailImportInvoice, getHistoryStatusImportInvoice,
    getImportReturn,
    returnImportInvoice,
    updateStatusReturnInvoice
} from "../../service/ImportInvoiceApi";
import {IDetailImportInvoice, IHistoryStatus, IImportReturnMyTableData} from "../../type/ImportInvoiceType";
import {default as NumberFormat} from "react-number-format";
import "../../styles/inputNumber.css"
import { ColumnProps } from "antd/es/table";
import ToastCustom from "../../features/toast/Toast";
import { LeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import moment from "moment/moment";


interface ReturnImport {
    detailsImportId: number,
    quantity: number,
}

const CreateReturnImportInvoice = () => {

    const { code } = useParams();

    const [importReturn, setImportReturn] = useState<IImportReturnMyTableData[]>([]);
    const [detailInvoices, setDetailInvoices] = useState<IDetailImportInvoice>();

    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const [invoiceStatusHistory, setInvoiceStatusHistory] = useState<IHistoryStatus[]>([])
    const [isDisable, setIsDisable] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        getImportReturn(code as string).then(result => {
            const newResult = result.data.map((obj: IImportReturnMyTableData) => ({ ...obj, inputQuantity: 0 }))
            setImportReturn(newResult.filter((obj: IImportReturnMyTableData) => obj.quantity > 0))
        })
        getDetailImportInvoice(code as string).then(result => {
            setDetailInvoices(result.data)
            getHistoryStatusImportInvoice(result.data?.anImport.id as number).then((result) => {
                setInvoiceStatusHistory(result.data)
            })
        })
    }, [])

    useEffect(() =>{
        const invoiceStatusHistoryList = invoiceStatusHistory.filter((obj: IHistoryStatus) => obj.statusName !== "T???o phi???u tr??? h??ng")
        if (invoiceStatusHistoryList.length === 3) {
            var a = moment(Date.now())
            var b = moment(invoiceStatusHistoryList[2].createdAt)
            console.log(a.diff(b,'days')+1)
            console.log(b)
            if ((a.diff(b,'days')+1) > 3){
                setIsDisable(true)
            }
        }
    },[invoiceStatusHistory])

    const onInputChange = (key: string, index: number, value: number) => {
        const newData = [...importReturn];
        (newData as any)[index][key] = value
        setImportReturn(newData);
    };

    useEffect(() => {
        if (importReturn.length > 0) {
            let totalQuantity = 0;
            let totalPrice = 0;
            for (let i = 0; i < importReturn.length; i++) {
                if (importReturn[i].inputQuantity !== 0) {
                    totalQuantity += importReturn[i].inputQuantity
                    totalPrice += importReturn[i].importPrice * importReturn[i].inputQuantity
                }
            }
            setTotalPrice(totalPrice)
            setTotalQuantity(totalQuantity)
        }
    }, [importReturn])


    const columnsImportReturnInvoice: ColumnProps<IImportReturnMyTableData>[] = [
        {
            title: 'M?? SKU',
            key: "code",
            dataIndex: 'code',
            width: '15%',
        },
        {
            title: 'T??n s???n ph???m',
            key: "name",
            dataIndex: 'name',
            width: '35%',
        },
        {
            title: 'S??? l?????ng',
            dataIndex: 'quantity',
            key: "inputQuantity",
            width: '15%',
            render: (data: number, record, index) => (
                <>

                    <InputNumber size="small" min={0} max={data} defaultValue={0} onChange={(values) => {
                        onInputChange("inputQuantity", index, values as number)
                    }} />
                    <span style={{ marginRight: 10, marginLeft: 10 }}>/</span>
                    <NumberFormat displayType='text' value={data} thousandSeparator={true} />
                </>
            )
        },
        {
            title: 'Gi??',
            dataIndex: 'importPrice',
            key: "importPrice",
            render: (data: number) => (
                <NumberFormat value={data} thousandSeparator={true} displayType='text' />
            ),
            width: '15%'
        },
        {
            title: 'Th??nh ti???n',
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (data: number) =>
            (
                <NumberFormat value={data} thousandSeparator={true} displayType='text' />
            ),
            width: '20%'
        },
    ];

    const user = useSelector((state: RootState) => state?.user);


    const onSubmit = () => {


        const list = [{} as ReturnImport];
        list.splice(0, 1)
        importReturn.map((obj) => {
            if (obj.inputQuantity > 0) {
                list.push({ detailsImportId: obj.detailsImportId as number, quantity: obj.inputQuantity as number })
            }
        })
        const importId = detailInvoices?.anImport.id as number
        const returnImport = {
            importId: importId,
            detailsReturnImports: list,
            createDate: Date.now(),
            accountId: user.id
        }

        returnImportInvoice(returnImport, detailInvoices?.anImport.inventoryId as number).then(() => {
        console.log("DONE ------", user.id);
            updateStatusReturnInvoice(importId, "returnInvoice", user.id).then(() => {
                ToastCustom.fire({
                    icon: 'success',
                    title: 'Tr??? h??ng th??nh c??ng'
                }).then()
                navigate(`/purchase_orders/details/${detailInvoices?.anImport.code}`)
            })
        })
    }
    return (
        <div className='p-5'>
            <h2 style={{ fontSize: '15px' }} >
                <Link to={`/purchase_orders/details/${detailInvoices?.anImport.code}`}>
                    <LeftOutlined /> ????n nh???p h??ng
                </Link>
            </h2>
            <div>

            </div>
            <div style={{ marginTop: '45px' }}>
                <Row gutter={24}>
                    <Col span={18}>
                        <div className="block" style={{ padding: 0 }}>
                            <div style={{ padding: 20, paddingBottom: 5, marginBottom: '5px' }}>
                                <p style={{ marginBottom: 0, fontSize: "16px" }}><b>Th??ng tin s???n ph???m tr???</b></p>
                            </div>
                            <hr />
                            <div style={{ padding: 20 }}>
                                {
                                    importReturn.length > 0 ?
                                        (
                                            <Table
                                                rowKey="code"
                                                columns={columnsImportReturnInvoice}
                                                dataSource={importReturn}
                                                pagination={false}
                                            />
                                        ) : (
                                            <div>???? tr??? h???t h??ng</div>
                                        )
                                }
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="block" style={{ padding: 0 }}>
                            <div style={{ padding: 20, paddingBottom: 5, marginBottom: '5px' }}>
                                <p style={{ marginBottom: 0, fontSize: "16px" }}><b>Nh?? cung c???p</b></p>
                            </div>
                            <div style={{ padding: 20, paddingTop: 10 }}>
                                {
                                    detailInvoices &&
                                    (<b style={{ color: '#1890ff' }}>{detailInvoices.supplier.name}</b>)
                                }
                            </div>
                        </div>
                        <div className="block" style={{ padding: 0 }}>
                            <div style={{ padding: 20, paddingBottom: 5, marginBottom: '5px' }}>
                                <p style={{ marginBottom: 0, fontSize: "16px" }}><b>Chi nh??nh ho??n tr???</b></p>
                            </div>
                            <div style={{ padding: 20, paddingTop: 10 }}>
                                {
                                    detailInvoices &&
                                    (<b style={{ color: '#1890ff' }}>{detailInvoices.inventoryName}</b>)
                                }
                            </div>
                        </div>
                        <div className="block" style={{ padding: 0 }}>
                            <div style={{ padding: 20, paddingBottom: 5, marginBottom: '5px' }}>
                                <p style={{ marginBottom: 0, fontSize: "16px" }}><b>Th??ng tin ho?? ????n tr??? h??ng</b></p>
                            </div>
                            <div style={{ padding: 20, paddingTop: 10 }}>
                                {
                                    <>
                                        <p>S??? l?????ng ho??n tr???: {totalQuantity}  </p>
                                        <p>T???ng gi?? tr??? h??ng tr???: <NumberFormat displayType='text' value={totalPrice}
                                                                                thousandSeparator={true}/></p>
                                        <Button disabled={!(importReturn.length > 0 ) || totalQuantity === 0 || isDisable} onClick={onSubmit} style={{margin: 0}} type='primary'>Tr??? h??ng</Button>
                                    </>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    )
}
export default CreateReturnImportInvoice