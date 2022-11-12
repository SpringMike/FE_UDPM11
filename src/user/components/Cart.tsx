import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import { showCart } from "../service/SignleProduct";
import { ICartItem } from "../type/CartItem";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
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
        { field: 'image' , headerName: 'Name', width: 200},
        // { field: 'image', headerName: 'Image', width: 70 },
        { field: 'option1', headerName: 'Options', width: 200, align: "center"},
        { field: 'quantity', headerName: 'Quantity', editable: true, width: 130,align: "center" },
        { field: 'wholesale_price', headerName: 'Wholesale Price', width: 130,align: "center" },
        { field: 'priceTotal', headerName: 'Price Total', width: 130,align: "center" },
        { field: 'firstName', headerName: 'First name', width: 130,align: "center" },
        { field: 'lastName', headerName: 'Last name', width: 130,align: "center" },
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
                                <h1 className="mb-3">Cart</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Cart</li>
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
                                                    <button type="button" className="btn btn-black btn-small" name="apply_coupon" value="Apply coupon">Apply coupon</button>
                                                    <span className="float-right mt-3 mt-lg-0">
                                                        <button type="button" className="btn btn-dark btn-small" name="update_cart" value="Update cart" disabled>Update cart</button>
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
                                <h4 className="mb-4">Cart totals</h4>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Subtotal</h5>
                                        <span>{nf.format(totalPrice)}</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Shipping</h5>
                                        <span>Free</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2">
                                        <h5>Total</h5>
                                        <span>{nf.format(totalPrice)}</span>
                                    </li>
                                </ul>
                                <button className="btn btn-main btn-small"
                                    onClick={() => {
                                        navigate('/checkout')
                                    }}
                                >Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Cart

