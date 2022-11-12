import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import { IHistory, IOrderItem } from "../type/History";
import { getHistoryOrder, getOrderItemHistory } from "../service/HistoryOrder";
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const OrderHistory2 = () => {
    const idUser = useAuthStore((e) => e.id);
    const accessToken = useAuthStore((e) => e.accessToken);
    // let item : IOrderItem;
    const [history, setHistory] = useState([] as IHistory[]);
    const [orderItem, setOrderItem] = useState([] as IOrderItem[]);

    useEffect(() => {
        getHistoryOrder(accessToken).then((res: any) => {
            const newResult = res.data.map((obj: IHistory) => ({ ...obj, order_item: [] }))
            setHistory(newResult)
        })
    }, [])
    useEffect(() => {
        history.map((history) => (
            getOrderItemHistory(history.id, accessToken).then((res: any) => {
                setOrderItem(res.data)
                res.data.map((order_item: IOrderItem) => (
                    console.log(order_item),
                    history.order_item.push(order_item)
                ))
            })
        ));
    }, [history])

    function Row(props: { row: IHistory }) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} hover>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.total_quantity}</TableCell>
                    <TableCell align="right">{row.total_price}</TableCell>
                    <TableCell align="right">{row.fee_money}</TableCell>
                    <TableCell align="right">{row.totalPrice}</TableCell>
                    <TableCell align="right">{row.created_time}</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Chi tiết
                                </Typography>
                                <div>Địa chỉ nhận :  {/*{row.diachi}*/}</div>
                                <Table size="small" aria-label="purchases" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={2}>Sản phẩm</TableCell>
                                            <TableCell align="center">Loại</TableCell>
                                            <TableCell align="right">Số lượng</TableCell>
                                            <TableCell align="right">Đơn giá ($)</TableCell>
                                            <TableCell align="right">Thành tiền ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.order_item?.map((order_item) => (
                                            <TableRow key={order_item.id}>
                                                <TableCell component="th" scope="row" >
                                                    {order_item.name.split('-')[0]}
                                                </TableCell>
                                                <TableCell>
                                                    <img src={order_item.image} alt="" />
                                                </TableCell>
                                                <TableCell>{order_item.option1 + ',' + order_item.option2 + ',' + order_item.option3}</TableCell>
                                                <TableCell align="right">{order_item.quantity}</TableCell>
                                                <TableCell align="right">{order_item.price}</TableCell>
                                                <TableCell align="right">{order_item.total_price}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell rowSpan={3} colSpan={3}/>
                                            <TableCell colSpan={2}>Subtotal</TableCell>
                                            <TableCell align="right">{row.total_price}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>shipping fee</TableCell>
                                            <TableCell align="right">{row.fee_money}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>Total</TableCell>
                                            <TableCell align="right">{row.totalPrice}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        );
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="checkout-container container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">Order History</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Order History</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Product Name</TableCell>
                                    <TableCell align="right">Options</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Total Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <Row key={row.id} row={row} />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        component="div"
                        count={history.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </section>
        </div>
    )
}
export default OrderHistory2