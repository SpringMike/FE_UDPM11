import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import { showCart } from "../service/SignleProduct";
import { ICartItem } from "../type/CartItem";

const Cart = () => {
    let nf = new Intl.NumberFormat();
    const idUser = useAuthStore((e) => e.id);
    const accessToken = useAuthStore((e) => e.accessToken);
    let sumPrice=0;
    console.log('access', idUser)
    const [cartItems, setCartItems] = useState([] as ICartItem[]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
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

    console.log('cat9qwsdaudashd', cartItems)



    return (
        <div className="checkout-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">Cart</h1>
                                Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which

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
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Dessert (100g serving)</TableCell>
                                                    <TableCell align="right">Calories</TableCell>
                                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cartItems.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.quantity}</TableCell>
                                                        <TableCell align="right">{nf.format(row.priceTotal)}</TableCell>
                                                        <TableCell align="right">{nf.format(row.wholesale_price)}</TableCell>
                                                        <TableCell align="right">{row.option1}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

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
                                <a href="#" className="btn btn-main btn-small">Proceed to checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Cart

