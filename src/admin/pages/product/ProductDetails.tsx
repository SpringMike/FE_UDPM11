import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import React, { memo, useEffect, useState } from "react";
import * as Antd from "antd";
import { Col, Dropdown, Menu, MenuProps, Row, Space } from "antd";
import Moment from "react-moment";
import { DeleteOutlined, DownOutlined, InfoCircleOutlined, LeftOutlined } from "@ant-design/icons";
import * as Mui from '@mui/material'
import { deleteProductById, deleteVariantsById, getProductById } from "../../service/ProductApi";
import { IVariant, Product } from "../../type/ProductType";
import Swal from "sweetalert2";
import ToastCustom from "../../features/toast/Toast";
import UpdateProduct from './UpdateProduct'

import { Category } from "../../type/CategoryType";

export interface ProductInfo {
    product: Product,
    variants: IVariant[],
    categories: Category[],

}

const ProductDetails = () => {

    const { id, backcode } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [focusVariant, setFocusVariant] = useState<IVariant>()
    searchParams.get('backcode')

    // const [product, setProduct] = useState<Product>()
    // const [variants, setVariants] = useState<IVariant[]>()
    // const [categories, setCategories] = useState<Category[]>([])
    const [isUpdate, setIsUpdate] = useState(false)
    const [productInfo, setProductInfo] = useState<ProductInfo>()
    const [page, setPage] = useState(1)
    const [openDes, setOpenDes] = useState(false)
    const openDescription = () => {
        setOpenDes(true)
    }
    const setActionUpdate = (status: boolean) => {
        setIsUpdate(status)
    }
    const navigate = useNavigate()
    const loadData = () => {
        getProductById(Number(id)).then(res => {
            // setProduct(data.product)
            // setVariants(data.variants)
            // setFocusVariant(data.variants[0])
            setProductInfo(res.data)
            setFocusVariant(res.data.variants[0])

        })
            .catch(error => {
                console.log(error);

            })
    }

    const handleDeleteProduct = (id: number | undefined) => {
        Swal.fire({
            title: 'B???n c?? ch???c?',
            text: "B???n kh??ng th??? h???i ph???c l???i d??? li???u!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed && id) {
                deleteProductById(id).then(res => {
                    ToastCustom.fire({
                        icon: 'success',
                        title: 'X??a th??nh c??ng'
                    })
                    navigate('/products')
                })
                    .catch(error => {
                        ToastCustom.fire(
                            {
                                icon: 'error',
                                title: 'X??a Th???t b???i'
                            }
                        )
                    })
            }
        })

    }
    useEffect(() => {

        loadData()
    }, [])
    useEffect(() => {
        if (!isUpdate) loadData()

    }, [isUpdate])


    const handleMenuClick: MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                if (productInfo?.product?.id) {
                    handleDeleteProduct(productInfo?.product?.id)

                } else {
                    ToastCustom.fire(
                        {
                            icon: 'warning',
                            title: 'S???n ph???m kh??ng t???n t???i trong kho ko th??? x??a'

                        }
                    )
                }
                break
            case '2':
                if (productInfo?.product?.id) {

                    setIsUpdate(true)
                } else {
                    ToastCustom.fire(
                        {
                            icon: 'warning',
                            title: 'S???n ph???m kh??ng t???n t???i trong kho kh??ng th??? s???a'

                        }
                    )
                }

                break
        }
    };
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    key: 1,
                    label: <Antd.Button style={{ width: '100%' }} type="text" danger>X??a S???n
                        ph???m<DeleteOutlined /></Antd.Button>,

                },
                {
                    key: 2,
                    label: <Antd.Button style={{ width: '100%' }} type="text">S???a s???n
                        ph???m<InfoCircleOutlined /></Antd.Button>,


                },
            ]}
        />
    );

    const Product = () => {
        var product = productInfo?.product
        return (
            <Mui.Paper style={{ height: 350 }}>
                <div style={{ background: "white" }}>
                    <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', paddingBottom: 0 }}>
                        <div>
                            Th??ng tin s???n ph???m
                        </div>
                        <div>
                            <Dropdown overlay={menu}>
                                <div style={{ width: "190px", fontSize: '14px', textAlign: 'center' }}>
                                    <Space>
                                        Thao t??c kh??c
                                        <DownOutlined />
                                    </Space>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    <hr />
                    <div style={{ padding: '20px' }}>
                        <Row>
                            <Col span={12}>
                                <Row>
                                    <Col span={8}>
                                        <p>T??n s???n ph???m: </p>
                                    </Col>
                                    <Col span={12}>
                                        <b>{product?.name}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <p>M?? s???n ph???m: </p>
                                    </Col>
                                    <Col span={12}>
                                        <Antd.Tag color='orange'>{product?.code}</Antd.Tag>
                                    </Col>
                                </Row>

                            </Col>
                            <Col span={12}>
                                <Row>
                                    <Col span={8}>
                                        <p>Ng??y t???o: </p>
                                    </Col>
                                    <Col span={12}>
                                        <Moment format="DD/MM/YYYY HH:mm:ss">
                                            {product?.createAt}
                                        </Moment>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <p>Ng??y c???p nh???t: </p>
                                    </Col>
                                    <Col span={12}>
                                        <Moment format="DD/MM/YYYY HH:mm:ss">
                                            {product?.updateAt}
                                        </Moment>


                                    </Col>
                                </Row>

                            </Col>

                        </Row>

                        <p style={{ marginTop: 20 }}>M?? t???:</p>
                        <p style={{
                            height: 113,
                            overflow: "hidden",
                            maxHeight: 113,
                            textOverflow: 'ellipsis',
                            marginBottom: 0
                        }}>{product?.description}</p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'right',
                            fontStyle: 'italic',
                            margin: 0,
                            padding: 0
                        }} onClick={openDescription}>Xem th??m&gt;&gt;</div>
                    </div>

                </div>
            </Mui.Paper>

        )
    }
    const Variants = memo((props: any) => {
        const variantCol = [
            {
                title: 'M?? SP',
                dataIndex: 'code',
                key: 'code',
                width: '15%',
                render: (code: string) => {
                    return (<Antd.Tag color='orange'> {code}</Antd.Tag>)
                }
            },
            {
                title: 'T??n s???n ph???m',
                dataIndex: 'name',
                key: 'name',


            },
            //  {
            //     title: 'T???n kho',
            //     dataIndex: 'code',
            //     key: 'code',
            //     width: '15%',


            // }, {
            //     title: 'T???ng',
            //     dataIndex: 'code',
            //     key: 'code',
            //     width: '15%',


            // }
        ]
        const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
        const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
        const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: IVariant[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys)
            const selected:number[] = selectedRows.map((ojb)=>{ return Number(ojb.id)})
            setSelectedRowIds(selected)
          }
        const rowSelection = {
            selectedRowKeys,
            onChange:onSelectChange
        };
        const hasSelected = selectedRowKeys.length > 0;
        const handleOnDeleteVariants = () => {
            Swal.fire({
                title: 'B???n c?? ch???c?',
                text: "B???n kh??ng th??? h???i ph???c l???i d??? li???u!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete!'
            }).then((result) => {
                console.log(selectedRowKeys)
                if (result.isConfirmed) {
                    deleteVariantsById(selectedRowIds).then((response: any) => {
                        ToastCustom.fire({
                            icon: 'success',
                            title: 'X??a phi??n b???n th??nh c??ng'
                        })
                        loadData()
                    }
                    )
                        .catch((error: any) => {
                            ToastCustom.fire({
                                icon: 'error',
                                title: 'C?? l???i x???y ra'
                            }).then()
                        })
                }

            })


        }

        return (
            <div>
                <div style={{ background: "white", padding: 20 }}>
                    <div>
                        <Antd.Row style={{}}>
                            <Antd.Col span={8} style={{ padding: 0, margin: 0 }}>
                                <div style={{ height: '100%', paddingTop: 5 }}>C??c phi??n b???n:</div>
                            </Antd.Col>
                            <Antd.Col span={8}>
                                {hasSelected ? <span>??ang ch???n {selectedRowKeys.length} phi??n b???n</span> : null}

                            </Antd.Col>
                            <Antd.Col span={8} style={{ display: 'flex', justifyContent: 'right' }}>
                                <Antd.Button disabled={!hasSelected} icon={<DeleteOutlined />} danger
                                    onClick={handleOnDeleteVariants}>X??a</Antd.Button>

                            </Antd.Col>
                        </Antd.Row>
                    </div>


                    <hr />


                    <Antd.Table dataSource={props.variants}
                        sticky
                        columns={variantCol}
                        rowKey="id"
                        bordered
                        pagination={{
                            pageSize: 6, current: page, onChange(page, pageSize) {
                                setPage(page)
                            },
                        }}
                        style={{ height: 450 }}

                        onRow={(record, index) => {

                            return {
                                onClick: event => {
                                    props.setVariant(record)
                                }
                            }
                        }}
                        rowSelection={rowSelection}
                    >

                    </Antd.Table>
                </div>

            </div>

        )
    })
    const VariantDetails = (props: any) => {

        return (
            <>

                <Mui.Paper sx={{ p: 3, height: 535 }}>

                    <div>Th??ng tin chi ti???t</div>
                    <hr />
                    <div style={{ marginLeft: '20%', marginRight: '20%', marginTop: 10 }}>
                        <Antd.Image height={'80%'} width={"100%%"}
                            src={focusVariant?.image ? focusVariant.image : 'https://phapluat.me/images/noimage.jpg'}></Antd.Image>
                    </div>
                    <Antd.Row style={{ marginTop: 30 }}>

                        <Antd.Col span={12}><p>T??n s???n ph???m:</p></Antd.Col>
                        <Antd.Col span={12}><b>{props.variant?.name}</b></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={12}><p>M?? s???n ph???m:</p></Antd.Col>
                        <Antd.Col span={12}><Antd.Tag color='orange'> {props.variant?.code}</Antd.Tag></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={12}><p>Gi?? nh???p:</p></Antd.Col>
                        <Antd.Col
                            span={12}><b>{(props.variant?.importPrice + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={12}><p>Gi?? b??n l???:</p></Antd.Col>
                        <Antd.Col
                            span={12}><b>{(props.variant?.salePrice + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></Antd.Col>

                    </Antd.Row>
                    <Antd.Row>
                        <Antd.Col span={12}><p>C??n n???ng:</p></Antd.Col>
                        <Antd.Col
                            span={12}><b>{(props.variant?.wholesalePrice + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></Antd.Col>

                    </Antd.Row>
                </Mui.Paper>

            </>


        )
    }


    const View = () => {
        return (

            <div>
                <div>
                    <h2 style={{ fontSize: '15px' }}>
                        <Link to="/products">
                            <LeftOutlined /> Danh s??ch s???n ph???m
                        </Link>
                        {
                            (searchParams.get('backcode')?.toString() == 'statistic') ? <Link to="/statistics">
                                <LeftOutlined /> Th???ng k??
                            </Link> : null
                        }
                    </h2>
                </div>


                <Mui.Grid container spacing={2} sx={{ mb: 10 }}>
                    <Mui.Grid item xs={8} sx={{ mb: 2 }}>
                        <Product />

                    </Mui.Grid>
                    <Mui.Grid item xs={4}>

                        <Mui.Grid item sx={{}}>
                            <Mui.Paper style={{ width: '100%', height: 150, padding: 20 }}>
                                <div>Danh m???c s???n ph???m</div>
                                <hr></hr>
                                {productInfo?.categories ?
                                    productInfo.categories.map((category, index) => {

                                        return (
                                            <Antd.Tag key={category.id} color={'blue'}>{category.name}</Antd.Tag>

                                        )
                                    }) : null
                                }


                            </Mui.Paper>
                            <Mui.Paper style={{ width: '100%', height: 190, padding: 20, marginTop: 20 }}>
                                <div>Th??ng tin kh??c</div>
                                <hr></hr>


                            </Mui.Paper>
                        </Mui.Grid>
                    </Mui.Grid>


                    <Mui.Grid item xs={8}>

                        <Variants setVariant={setFocusVariant} variants={productInfo?.variants} />
                    </Mui.Grid>
                    <Mui.Grid item xs={4}>

                        {focusVariant ? <VariantDetails variant={focusVariant} /> : null}
                    </Mui.Grid>


                </Mui.Grid>
            </div>

        )
    }
    return (

        <div className='p-5'>
            <Antd.Modal width={1000} title="M?? t??? s???n ph???m" visible={openDes} footer={null} onCancel={() => {
                setOpenDes(false)
            }}>
                <textarea style={{ width: '100%', height: '500px', padding: 10 }}
                    disabled={true}>{productInfo?.product.description}</textarea>
            </Antd.Modal>

            {(isUpdate && productInfo?.product) ? <UpdateProduct
                product={productInfo?.product} variants={productInfo?.variants} categories={productInfo?.categories}
                setIsUpdate={setActionUpdate}></UpdateProduct>
                : <View></View>}
        </div>
    )
}
export default ProductDetails