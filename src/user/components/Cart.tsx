import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import { showCart } from "../service/SignleProduct";
import { ICartItem } from "../type/CartItem";

const Cart = () => {

    const idUser = useAuthStore((e) => e.id);
    const accessToken = useAuthStore((e) => e.accessToken);

    console.log('access', idUser)
    const [cartItems, setCartItems] = useState([] as ICartItem[]);

    useEffect(() => {
        showCart(Number(idUser), accessToken).then((response) => {
            console.log(response.data)
            setCartItems(response.data)
        },
            (err) => {
                console.log('OUT', err);
            });
    }, []);
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
                                    <table className="table shop_table shop_table_responsive cart" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail"> </th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Total</th>
                                                <th className="product-remove"> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <>
                                                {
                                                    cartItems.map((o) => {
                                                    {console.log(o.id)}
                                                     <a href="">{o.id}</a>
                                                        // <tr className="cart_item">
                                                        //     <td className="product-thumbnail" data-title="Thumbnail">
                                                        //         <a href="/product-single"><img src="assets/images/cart-2.jpg" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" /></a>
                                                        //     </td>
                                                        //     <td className="product-name" data-title="Product">
                                                        //         <a href="#">{o.name}</a>
                                                        //     </td>
                                                        //     <td className="product-price" data-title="Price">
                                                        //         <span className="amount"><span className="currencySymbol">
                                                        //             <pre wp-pre-tag-3=""></pre>
                                                        //         </span>{o.wholesale_price}</span>
                                                        //     </td>
                                                        //     <td className="product-quantity" data-title="Quantity">
                                                        //         <div className="quantity">
                                                        //             <label className="sr-only" >{o.quantity}</label>
                                                        //             <input type="number" id="quantity_5cc58182489a8" className="input-text qty text" step="1" min="0" max="9" name="#" title="Qty" size={4} />
                                                        //         </div>
                                                        //     </td>
                                                        //     <td className="product-subtotal" data-title="Total">
                                                        //         <span className="amount">
                                                        //             <span className="currencySymbol">
                                                        //                 <pre wp-pre-tag-3=""></pre>
                                                        //             </span>{o.priceTotal}</span>
                                                        //     </td>
                                                        //     <td className="product-remove" data-title="Remove">
                                                        //         <a href="#" className="remove" aria-label="Remove this item" data-product_id="30" data-product_sku="">×</a>
                                                        //     </td>
                                                        // </tr>
                                                    })
                                                }
                                            </>

                                        </tbody>


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
                                        <span>$90.00</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Shipping</h5>
                                        <span>Free</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2">
                                        <h5>Total</h5>
                                        <span>$90.00</span>
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