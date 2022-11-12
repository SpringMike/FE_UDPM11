import {Avatar, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import { showCart } from "../service/SignleProduct";
import { ICartItem } from "../type/CartItem";
import {DataGrid, GridColDef, GridColumnHeaderParams, GridValueGetterParams} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import button from "../../admin/UI/Button";
const Cart = () => {
    let nf = new Intl.NumberFormat();
    const idUser = useAuthStore((e) => e.id);
    const accessToken = useAuthStore((e) => e.accessToken);
    let sumPrice = 0;
    console.log('access', idUser)
    const [cartItems, setCartItems] = useState([] as ICartItem[]);
    const [totalPrice, setTotalPrice] = useState(0);
    let navigate = useNavigate()
    useEffect(() => {

        localStorage.removeItem('test1')
        showCart(Number(idUser), accessToken).then((response) => {

            console.log(response.data)
            setCartItems(response.data)
        },
            (err) => {
                console.log('OUT', err);
            });
    }, []);
    useEffect(() => {
        cartItems.forEach((e) => {
            console.log(e.priceTotal)

            sumPrice += Number(e.priceTotal)
        })
        setTotalPrice(Number(sumPrice))
    }, [cartItems]);

    const columns: GridColDef[] = [
        // { field: 'id_cart_item', headerName: 'Cart Item Id', width: 70 },
        // { field: 'id_product_variant', headerName: 'Product Variant Id', width: 70 },
        { field: 'image', headerName: 'Ảnh', width: 70, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                return (
                    <>
                        <Avatar src={params.value}/>
                        {params.value.username}
                    </>
                );
            }
        },
        { field: 'name' , headerName: 'Tên sản phẩm', width: 150, headerAlign: 'center', align: 'center',
                renderCell: (params) => {
                    return (
                        <>
                            {params.value.split('-')[0]}
                        </>
                    );
                }
            },
        { field: 'option1', headerName: 'Màu', width: 70, headerAlign: 'center', align: 'center',},
        { field: 'option2', headerName: 'Kích cỡ', width: 70, headerAlign: 'center', align: 'center',},
        { field: 'option3', headerName: 'Chất liệu', width: 100, headerAlign: 'center', align: 'center',},
        { field: 'quantity', headerName: 'Số lượng', editable: true, width: 130,headerAlign: 'center', align: 'center', },
        { field: 'wholesale_price', headerName: 'Giá tiền (VNĐ)', width: 130, headerAlign: 'center', align: 'center',
                renderCell: (params) => {
                    return (
                        <>
                            {params.value}
                        </>
                    );
                }
            },
        { field: 'priceTotal', headerName: 'Tổng tiền (VNĐ)', width: 150, headerAlign: 'center', align: 'center',
                renderCell: (params) => {
                    return (
                        <>
                            {params.value }
                        </>
                    );
                }
            },
        { field: '', headerName:'Xoá', width: 100, headerAlign: 'center', align: 'center',
            renderCell: (params: GridColumnHeaderParams) => (
                <a type = "button">
                    <span role="img" aria-label="enjoy">
                  💀
                    </span>
                </a>
            ),},
    ];

    const onRowsSelectionHandler = (ids: any) => {
        const selectedRowsData = ids.map((id: any) => cartItems.find((row) => row.id_cart_item === id));
        const idsCItems: string[] = [];
        selectedRowsData.forEach((e: any) => {
            let { id_cart_item } = e;
            idsCItems.push(id_cart_item)
        });
        localStorage.setItem('test1', JSON.stringify(idsCItems))
        console.log(selectedRowsData);
    };



    return (
        <div className="checkout-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">GIỎ HÀNG</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cart shopping page-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="product-list">
                                <form className="cart-form">
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                            rows={cartItems}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            getRowId={(cartItems) => cartItems.id_cart_item}
                                            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                                            checkboxSelection
                                        />
                                    </div>

                                    <table className="table shop_table shop_table_responsive cart" cellSpacing="0">
                                        <tr>
                                            <td colSpan={6} className="actions">
                                                <div className="coupon">
                                                    <input type="text" name="coupon_code" className="input-text form-control" id="coupon_code" value="" placeholder="Coupon code" />
                                                    <button type="button" className="btn btn-black btn-small" name="apply_coupon" value="Apply coupon">Áp dụng phiếu giảm giá</button>
                                                    <span className="float-right mt-3 mt-lg-0">
                                                        <button type="button" className="btn btn-dark btn-small" name="update_cart" value="Update cart" disabled>Cập nhật giỏ hàng</button>
                                                    </span>
                                                </div>
                                                <input type="hidden" id="woocommerce-cart-nonce" name="woocommerce-cart-nonce" value="27da9ce3e8" />
                                                <input type="hidden" name="_wp_http_referer" value="/cart/" />
                                            </td>
                                        </tr>
                                    </table>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-lg-4">
                            <div className="cart-info card p-4 mt-4">
                                <h4 className="mb-4">Tổng số giỏ hàng</h4>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Tổng phụ:</h5>
                                        <span>{nf.format(totalPrice)} VNĐ</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Phí vận chuyển:</h5>
                                        <span>Miễn phí</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2">
                                        <h5>Tổng:</h5>
                                        <span>{nf.format(totalPrice)} VNĐ</span>
                                    </li>
                                </ul>
                                <button className="btn btn-main btn-small"
                                    onClick={() => {
                                        navigate('/checkout')
                                    }}
                                >Tiến hành kiểm tra</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Cart

