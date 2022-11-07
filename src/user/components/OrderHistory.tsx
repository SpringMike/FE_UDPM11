import { Checkbox, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IHistory, IOrderItem } from "../type/History";
import { getHistoryOrder } from "../service/HistoryOrder";
const OrderHistory = () => {
    const idUser = useAuthStore((e) => e.id);
    const accessToken = useAuthStore((e) => e.accessToken);

    const [history, setHistory] = useState([] as IHistory[]);
    const [orderItem, setOrderItem] = useState([] as IOrderItem[]);
    useEffect(() => {
        getHistoryOrder(accessToken).then((res: any) => {
            console.log(res.data)
            setHistory(res.data)
        })
    }, [])
    const [expandedRows, setExpandedRows] = useState([] as IHistory[]);

    // State variable to keep track which row is currently expanded.
    const [expandState, setExpandState] = useState({});

    // const handleEpandRow = (event: any, userId: any) => {
    //     const currentExpandedRows = expandedRows;
    //     const isRowExpanded = currentExpandedRows.includes(userId);

    //     let obj = {};
    //     isRowExpanded ? (obj[userId] = false) : (obj[userId] = true);
    //     setExpandState(obj);

    //     // If the row is expanded, we are here to hide it. Hence remove
    //     // it from the state variable. Otherwise add to it.
    //     const newExpandedRows = isRowExpanded ?
    //         currentExpandedRows.filter(id => id !== userId) :
    //         currentExpandedRows.concat(userId);

    //     setExpandedRows(newExpandedRows);
    // }



    return (
        <div className="checkout-container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">Order</h1>
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
                <Container>
                    <Row>
                        <Col>
                            <h1> Users({history.length})</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Table responsive variant="dark">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>e-mail</th>
                                        <th>Gender</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        history.map((user) =>
                                            <>
                                                <tr key={user.id}>
                                                    <td>
                                                        {user['total_price']}
                                                    </td>
                                                    <td>
                                                        {user['total_quantity']}
                                                    </td>
                                                    <td>
                                                        {user['status']}
                                                    </td>
                                                    <td>
                                                        {user['fee_money']}
                                                    </td>
                                                    <td>
                                                        {user['totalPrice']}
                                                    </td>

                                                    {/* <td>
                                                        <Button

                                                            variant="link"
                                                            onClick={event => handleEpandRow(event, user.id)}>
                                                            {
                                                                expandState[user.id] ?
                                                                    'Hide' : 'Show'
                                                            }
                                                        </Button>
                                                    </td> */}
                                                </tr>
                                                {/* <>
                                                    {
                                                        expandedRows.includes(user.id) ?
                                                            <tr>
                                                                <td colspan="6">
                                                                    <div style={{ backgroundColor: '#343A40', color: '#FFF', padding: '10px' }}>
                                                                        <h2> Details </h2>
                                                                        <ul>
                                                                            <li>
                                                                                <span><b>Full Name:</b></span> {' '}
                                                                                <span> {user['first_name']} {' '} {user['last_name']} </span>
                                                                            </li>
                                                                            <li>
                                                                                <span><b>Company:</b></span> {' '}
                                                                                <span> {user.company} </span>
                                                                            </li>
                                                                            <li>
                                                                                <span><b>Department:</b></span> {' '}
                                                                                <span> {user.department} </span>
                                                                            </li>
                                                                            <li>
                                                                                <span><b>Ip:</b></span> {' '}
                                                                                <span> {user['ip_address']} </span>
                                                                            </li>
                                                                            <li>
                                                                                <span><b>Best Movie:</b></span> {' '}
                                                                                <span> {user.movies} </span>
                                                                            </li>
                                                                            <li>
                                                                                <span><b>About:</b></span> {' '}
                                                                                <span> {user.about} </span>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr> : null
                                                    }
                                                </> */}
                                            </>
                                        )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}
export default OrderHistory

