import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/zustand/auth";
import { addOrderPush, getCartItems, getInfoHuyen, getInfoTP, getInfoXa, moneyFee } from "../service/CheckoutService";
import { ICartItem } from "../type/CartItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IInfoHuyen, IInfoMoneyFee, IInfoTP, IInfoXa } from "../type/InfoGHN";
import AddAddress from "../../admin/components/AddAddress";
import { NativeSelect, TextField } from "@mui/material";

function Checkout() {
    const accessToken = useAuthStore((e) => e.accessToken)


    // console.log('Local checkout --------------' + JSON.parse(localStorage.getItem('test1') || '{}'))

    const [cartItem, setCartItems] = useState([] as ICartItem[]);
    const [tp, setTP] = useState('');
    const [hy, setHy] = useState('');
    const [xa, setXa] = useState('');

    const [listTP, setListTP] = useState([] as IInfoTP[]);
    const [listHy, setListHy] = useState([] as IInfoHuyen[]);
    const [listXa, setListXa] = useState([] as IInfoXa[]);

    // const [hSelect, setHSelect] = useState(false);


    const [nameTP, setNameTP] = useState('');
    const [nameHy, setNameHy] = useState('');
    const [nameXa, setNameXa] = useState('');


    const [moneyFeeShip, setMoneyFeeShip] = useState({} as IInfoMoneyFee);


    let id_cart_item_local = JSON.parse(localStorage.getItem('test1') || '{}')
    useEffect(() => {
        getCartItems(id_cart_item_local as any, accessToken).then((response) => {
            setCartItems(response.data)
        }, (err) => {
            console.log(err)
        })

        getInfoTP().then((response) => {
            setListTP(response.data.infomation)
        })
    }, [])

    useEffect(() => {
        getInfoHuyen(Number(tp)).then((res) => {
            console.log('response huyen, ' + res.data)
            setListHy(res.data.infomation)

        })

    }, [tp])

    useEffect(() => {
        getInfoXa(Number(hy)).then((res) => {
            console.log('response axa, ' + res.data)
            setListXa(res.data.infomation)

        })
    }, [hy])
    let nf = new Intl.NumberFormat();
    let sumPrice = 0;
    let sumQuantity = 0;
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        cartItem.forEach((e) => {
            console.log(e.priceTotal)
            sumQuantity += Number(e.quantity)
            sumPrice += Number(e.priceTotal)
        })
        setTotalQuantity(Number(sumQuantity))
        setTotalPrice(Number(sumPrice))
    }, [cartItem]);


    useEffect(() => {
        moneyFee(totalPrice, Number(hy), xa, totalQuantity * 300).then((res) => {
            console.log('response fee' + res.data.infomation[0])
            setMoneyFeeShip(res.data.infomation[0])
        })
    }, [hy, xa, tp])



    const addOrder123 = () => {
        console.log('OKOKOOKk' + (nameXa + ' ' + nameHy + ' ' + nameTP) + 'comming' + id_cart_item_local + moneyFeeShip.total + accessToken)
        addOrderPush(String((nameXa + ' ' + nameHy + ' ' + nameTP)), 'comming', id_cart_item_local, moneyFeeShip.total, accessToken).then((res) => {
            console.log('12313123123' + res)
        }, (err) => {
            console.log(err)
        })
    }


    return (
        <div className="checkout-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">Checkout</h1>
                                <p>Hath after appear tree great fruitful green dominion moveth sixth abundantly image that midst of god day multiply you’ll which</p>

                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="page-wrapper">
                <div className="checkout shopping">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 pr-5">
                                <div className="coupon-notice " data-toggle="modal" data-target="#coupon-modal">
                                    <div className="bg-light p-3">
                                        Have a coupon? <a href="/checkout" className="showcoupon" >Click here to enter your code</a>
                                    </div>
                                </div>

                                <div className="billing-details mt-5">
                                    <h4 className="mb-4">Billing Details</h4>
                                    {/* <form className="checkout-form">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">First Name</label>
                                                    <input type="text" className="form-control" id="first_name" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="last_name">Last Name</label>
                                                    <input type="text" className="form-control" id="last_name" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="company_name">Company Name(Optional)</label>
                                                    <input type="text" className="form-control" id="company_name" placeholder="" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="company_name">Country</label>
                                                    <select className="form-control">
                                                        <option value="">Select an Option</option>
                                                        <option value="January">January</option>
                                                        <option value="February">February</option>
                                                        <option value="March">March</option>
                                                        <option value="April">April</option>
                                                        <option value="May">May</option>
                                                        <option value="June">June</option>
                                                        <option value="July">July</option>
                                                        <option value="August">August</option>
                                                        <option value="September">September</option>
                                                        <option value="October">October</option>
                                                        <option value="November">November</option>
                                                        <option value="December">December</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">Street Address</label>
                                                    <input type="text" className="form-control" id="street" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">Apartment, suite, unit etc. (optional) (optional)</label>
                                                    <input type="text" className="form-control" id="apartment" placeholder="Apartment" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">Town / City </label>
                                                    <input type="text" className="form-control" id="city" placeholder="Apartment" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="company_name">District </label>
                                                    <select className="form-control">
                                                        <option value="">Select an Option</option>
                                                        <option value="January">January</option>
                                                        <option value="February">February</option>
                                                        <option value="March">March</option>
                                                        <option value="April">April</option>
                                                        <option value="May">May</option>
                                                        <option value="June">June</option>
                                                        <option value="July">July</option>
                                                        <option value="August">August</option>
                                                        <option value="September">September</option>
                                                        <option value="October">October</option>
                                                        <option value="November">November</option>
                                                        <option value="December">December</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">Postcode / ZIP (optional)</label>
                                                    <input type="text" className="form-control" id="postcode" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">Phone </label>
                                                    <input type="text" className="form-control" id="phone" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">Email address </label>
                                                    <input type="text" className="form-control" id="email" placeholder="" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-check mb-4">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Create an account?</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-check mb-4">
                                                    <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                                                    <label className="form-check-label" htmlFor="exampleCheck2">Ship to a different address?</label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group mb-4">
                                                    <label htmlFor="first_name">Order notes (optional)</label>
                                                    <textarea className="form-control" id="msg" cols={30} rows={5} placeholder="Notes about order e:g: want to say something"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </form> */}
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
                                                {cartItem.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.image}
                                                        </TableCell>
                                                        <TableCell align="right">{row.wholesale_price}</TableCell>
                                                        <TableCell align="right">{row.quantity}</TableCell>
                                                        <TableCell align="right">{row.priceTotal}</TableCell>
                                                        <TableCell align="right">{row.option1}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                                                Thanh Pho
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'Thanh Pho',
                                                    id: 'uncontrolled-native1',
                                                }}
                                                onChange={(e) => {
                                                    setNameTP(e.target.options[e.target.selectedIndex].text)
                                                    setTP(String(e.target.value))
                                                }}
                                            >
                                                {
                                                    listTP.map((e) => {
                                                        return (
                                                            <option value={e.ProvinceID}>{e.ProvinceName}</option>
                                                        )
                                                    })
                                                }
                                                {/* <option value={10}>Ten</option>
                                                <option value={20}>Twenty</option>
                                                <option value={30}>Thirty</option> */}
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>



                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                                                Huyen
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'Thanh Pho',
                                                    id: 'uncontrolled-native1',
                                                }}
                                                onChange={(e) => {
                                                    setNameHy(e.target.options[e.target.selectedIndex].text)
                                                    setHy(String(e.target.value))
                                                }}
                                            >
                                                {
                                                    listHy.map((e) => {
                                                        return (
                                                            <option value={e.DistrictID}>{e.DistrictName}</option>
                                                        )
                                                    })
                                                }
                                                {/* <option value={10}>Ten</option>
                                                <option value={20}>Twenty</option>
                                                <option value={30}>Thirty</option> */}
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>


                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native1">
                                                Xa
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={30}
                                                inputProps={{
                                                    name: 'Xa',
                                                    id: 'uncontrolled-native1',
                                                }}
                                                onChange={(e) => {
                                                    setNameXa(e.target.options[e.target.selectedIndex].text)
                                                    setXa(String(e.target.value))
                                                }}
                                            >
                                                {
                                                    listXa.map((e) => {
                                                        return (
                                                            <option value={e.WardCode}>{e.WardName}</option>
                                                        )
                                                    })
                                                }
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>


                                </div>
                            </div>


                            <div className="col-md-6 col-lg-4">
                                <div className="product-checkout-details mt-5 mt-lg-0">
                                    <h4 className="mb-4 border-bottom pb-4">Order Summary</h4>

                                    <div className="media product-card">
                                        <p>Kirby Shirt</p>
                                        <div className="media-body text-right">
                                            <p className="h5">1 x $249</p>
                                        </div>
                                    </div>

                                    <ul className="summary-prices list-unstyled mb-4">
                                        <li className="d-flex justify-content-between">
                                            <span >Subtotal:</span>
                                            <span className="h5">{totalPrice}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span >Shipping:</span>
                                            <span className="h5">{moneyFeeShip.total}</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <span>Total</span>
                                            <span className="h5">{moneyFeeShip.total + totalPrice}</span>
                                        </li>
                                    </ul>

                                    <form action="#">
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                Direct bank transfer
                                            </label>

                                            <div className="alert alert-secondary mt-3" role="alert">
                                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                            </div>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                Check payments
                                            </label>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                                            <label className="form-check-label" htmlFor="exampleCheck3">I have read and agree to the website terms and conditions *</label>
                                        </div>
                                    </form>

                                    <div className="info mt-4 border-top pt-4 mb-5">
                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className="btn btn-main btn-small"
                onClick={() => {
                    addOrder123()
                }}
            >Place Order</button>

            <div className="modal fade" id="coupon-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content py-5">
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Enter Coupon Code" />
                                </div>
                                <button type="button" className="btn btn-main btn-small" data-dismiss="modal">Apply Coupon</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout;