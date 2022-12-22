/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Antd from 'antd'
import { Form } from 'antd'

import * as Mui from '@mui/material'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useLayoutEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Table.css";


import { countProductByFilter, deleteProductById, deleteProductsById, getProducts } from '../../service/ProductApi';

import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import ToastCustom from '../../features/toast/Toast';
import { Delete, PreviewOutlined } from '@mui/icons-material';
import { IProductCount, IProductFilter } from "../../type/ProductType";
import { Category } from '../../type/CategoryType';
import { addCategoriesAPI, getAllCategories, getCategoriesName } from '../../service/CategoryApi';

export type RegisterFormData = {
    name: string
    description: string
}

const ListCategories = () => {



    const [form] = Form.useForm();
    let [registerError, setRegisterError] = useState()
    const onFormSubmit = (staff: Category) => {
        addCategoriesAPI(staff).then(() => {
            ToastCustom.fire({
                icon: 'success',
                title: "Thêm danh mục thành công",
            }).then(
                () => {
                    window.location.reload();
                }
            )
            form.resetFields();
        }).catch((err) => {
            const error = err.response.data.message
            ToastCustom.fire({
                icon: 'error',
                title: "Thêm danh mục thất bại thất bại",
                html: `${error}`
            }).then()
        })
    }


    const getCateNameById = (id: number) => {
        getCategoriesName(id).then((res) => {
            setCategories(res.data)
        }).catch((err) => {

        })
    }


    var keyWord = ''
    const { searchKey } = useParams()
    const initFilter: IProductFilter = {
        key: searchKey ? searchKey : '',
        isDelete: false,
        sortBy: 'name',
        isDesc: true,
        page: 1,
        size: 7
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleOk2 = () => {
        setIsModalOpen2(false);
    };

    const handleCancel2 = () => {
        setIsModalOpen2(false);
    };

    const ProductCol = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Tên Danh mục',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mô tả',
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Thao tác",
            key: 'id',
            dataIndex: "id",
            render: (id: number) => {
                return (
                    <>
                        {/* <Antd.Button style={{width: '40%', margin: 5}} danger type={'text'} icon={<Delete/>}
                                     onClick={() => deleteProduct(id)}></Antd.Button> */}
                        <Antd.Button style={{ width: '40%' }} type={'text'} icon={<PreviewOutlined />}
                            onClick={() => {
                                getCateNameById(id)
                                showModal2()
                            }}>
                            {/* <Antd.Button type="primary" onClick={showModal2}>
                                Open Modal
                            </Antd.Button> */}
                        </Antd.Button>


                        <Antd.Modal title="Cập nhập Danh mục" open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
                            <Antd.Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinishFailed={onFinishFailed}
                                // autoComplete="off"
                                form={form}
                                onFinish={onFormSubmit}
                            >
                                <Antd.Form.Item
                                    label="Danh mục"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your categories!' }]}
                                >
                                    <Antd.Input value={categoriesID.name} />
                                </Antd.Form.Item>

                                <Antd.Form.Item
                                    label="Mô tả"
                                    name="description"
                                    rules={[{ required: true, message: 'Please input your description!' }]}
                                >
                                    <Antd.Input.TextArea value={categoriesID.description} />
                                </Antd.Form.Item>

                                <Antd.Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Antd.Button type="primary" htmlType="submit">
                                        Submit
                                    </Antd.Button>
                                </Antd.Form.Item>
                            </Antd.Form>
                        </Antd.Modal>
                    </>
                )
            }
        }
    ]


    const [categories, setCategories] = useState([] as Category[]);
    const [categoriesID, setCategoriesID] = useState({} as Category);
    // -------------------- 
    const [productFilter, setProductFilter] = useState<IProductFilter>(initFilter)

    const [products, setProducts] = useState<Array<IProductCount>>([])
    const [reload, setReload] = useState(true)
    const navigate = useNavigate()
    const [totalPage, setTotalPage] = useState<number>(1);
    const [selectProduct, setSelectProduct] = useState<React.Key[]>([]);
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const loadData = () => {
        setReload(true)

        getAllCategories().then((response) => {
            setCategories(response.data)
            setReload(false)
        }).catch(error => {
            console.log(error);

        })
    }

    const deleteProduct = (id: number) => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn không thể hồi phục lại dữ liệu!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xoá!',
            cancelButtonText: 'Huỷ'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductById(id)
                    .then(res => {
                        ToastCustom.fire({
                            icon: 'success',
                            title: 'Xóa thành công'
                        })
                        loadData()
                    })
                    .catch(error => {
                        ToastCustom.fire(
                            {
                                icon: 'error',
                                title: 'Xóa Thất bại'
                            }
                        )

                    })
            }

        })

    }

    // const addCategories = () => {
    //     Swal.fire({
    //         title: 'Bạn có chắc?',
    //         text: "Bạn không thể hồi phục lại dữ liệu!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Xoá!',
    //         cancelButtonText: 'Huỷ'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             deleteProductById(id)
    //                 .then(res => {
    //                     ToastCustom.fire({
    //                         icon: 'success',
    //                         title: 'Xóa thành công'
    //                     })
    //                     loadData()
    //                 })
    //                 .catch(error => {
    //                     ToastCustom.fire(
    //                         {
    //                             icon: 'error',
    //                             title: 'Xóa Thất bại'
    //                         }
    //                     )

    //                 })
    //         }

    //     })

    // }
    const handleDeleteProduct = () => {
        Swal.fire({
            title: 'Bạn có chắc?',
            text: "Bạn không thể hồi phục lại dữ liệu!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProductsById(selectProduct)
                    .then(res => {
                        ToastCustom.fire({
                            icon: 'success',
                            title: 'Xóa thành công'
                        })
                        loadData()
                    })
                    .catch(error => {
                        ToastCustom.fire(
                            {
                                icon: 'error',
                                title: 'Xóa Thất bại'
                            }
                        )

                    })
            }

        })

    }
    const handleMenuClick: Antd.MenuProps['onClick'] = (e: any) => {
        switch (e.key) {
            case '1':
                handleDeleteProduct()
                break
            case '2':

                break

        }
    };
    const menu = (
        <Antd.Menu
            onClick={handleMenuClick}
            items={[
                {
                    key: 1,
                    label: <Antd.Button style={{ width: '100%' }} type="text" danger>Xóa Sản
                        phẩm<DeleteOutlined /></Antd.Button>,

                },
                // {
                //     label: <Antd.Button style={{ width: '100%' }} type="text" >Sửa sản phẩm<InfoCircleOutlined /></Antd.Button>,
                //     key: 2,


                // },
            ]}
        />
    );


    useLayoutEffect(() => {
        loadData()
    }, [productFilter])

    const onPageChange = (page: number, size: number) => {
        setProductFilter({ ...productFilter, page: page, size: size })

    }

    const showFilter = () => {
        setIsOpenFilter(true)
    }
    const closeFilter = () => {
        setIsOpenFilter(false)
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const Products = () => {
        return (
            <>
                <Antd.Spin tip="Loading..." spinning={reload}>

                    <Antd.Table dataSource={categories}
                        sticky
                        columns={ProductCol}
                        rowKey="id"
                        // bordered
                        pagination={false}
                        // style={{height: 600, maxHeight: 600, overflow: 'scroll'}}
                        // onRow={(record) => {
                        //     return {

                        //     }
                        // }}

                        rowSelection={{
                            selectedRowKeys: selectProduct,
                            onChange(selectedRowKeys, selectedRows, info) {
                                setSelectProduct(selectedRowKeys)
                                // selectProduct=selectedRowKeys
                            },
                        }}

                    />
                </Antd.Spin>

            </>
        )
    }

    return (
        <div className='p-5'>
            <h1 style={{ fontSize: '30px', marginRight: 10 }}>Danh sách sản phẩm </h1>
            <Mui.Grid container spacing={2} sx={{ mb: 2 }}>
                <Mui.Grid item xs={1.5}>
                    <Antd.Dropdown overlay={menu} disabled={selectProduct.length < 1}>
                        <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary">

                            <Antd.Space>
                                Thao tác
                                <DownOutlined />
                            </Antd.Space>
                        </Antd.Button>
                    </Antd.Dropdown>

                </Mui.Grid>
                <Mui.Grid item xs={8.5} sx={{ m: 0 }}>
                    <Antd.Input
                        placeholder='Nhập tên hoặc mã sản phẩm'
                        onChange={(e) => {
                            keyWord = e.target.value.toString()

                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                setProductFilter({ ...productFilter, key: keyWord, page: 1 })
                        }}

                    >

                    </Antd.Input>
                </Mui.Grid>

                {/* <Mui.Grid item xs={1}>
                    <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary" >
                        <Antd.Space>
                            <DownloadOutlined />
                            Xuất file
                        </Antd.Space>
                    </Antd.Button>
                </Mui.Grid> */}
                <Mui.Grid item xs={2}>
                    {/* <Antd.Button style={{ width: "100%", fontSize: '14px', margin: 0 }} type="primary" onClick={() => {
                        navigate('/products/add_product')
                    }}> */}
                    <>
                        <Antd.Button type="primary" onClick={showModal}>
                            <Antd.Space>
                                <PlusOutlined />
                                Thêm mới
                            </Antd.Space>
                        </Antd.Button>
                        <Antd.Modal title="Thêm mới danh mục" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Antd.Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinishFailed={onFinishFailed}
                                // autoComplete="off"
                                form={form}
                                onFinish={onFormSubmit}
                            >
                                <Antd.Form.Item
                                    label="Danh mục"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your categories!' }]}
                                >
                                    <Antd.Input />
                                </Antd.Form.Item>

                                <Antd.Form.Item
                                    label="Mô tả"
                                    name="description"
                                    rules={[{ required: true, message: 'Please input your description!' }]}
                                >
                                    <Antd.Input.TextArea />
                                </Antd.Form.Item>

                                <Antd.Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Antd.Button type="primary" htmlType="submit">
                                        Submit
                                    </Antd.Button>
                                </Antd.Form.Item>
                            </Antd.Form>
                        </Antd.Modal>
                    </>
                    {/* <Antd.Space>
                            <PlusOutlined />
                            Thêm mới
                        </Antd.Space> */}
                    {/* </Antd.Button> */}
                </Mui.Grid>

                <Mui.Grid item xs={12}>
                    <Mui.Paper sx={{ pb: 2 }}>
                        <Products />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <Antd.Pagination responsive style={{ marginTop: 10, marginRight: 10 }}
                                pageSize={productFilter.size} showSizeChanger showQuickJumper
                                defaultCurrent={1} total={totalPage} onChange={onPageChange}
                                pageSizeOptions={[7, 10, 20, 50]} />

                        </div>

                    </Mui.Paper>
                </Mui.Grid>

            </Mui.Grid>


        </div>
    )
}

export default ListCategories