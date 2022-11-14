import React, { useEffect, useState } from "react"
import { useAuthStore } from "../../hooks/zustand/auth";
import { IHistory, IOrderItem } from "../type/History";
import { getHistoryOrder, getOrderItemHistory, updateStatus } from "../service/HistoryOrder";
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
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
import { Avatar, Button, Tabs } from "@mui/material";
import Tab from '@mui/material/Tab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const OrderHistory2 = () => {
    let value_new: number;


    const [value, setValue] = React.useState(0);
    const [currentStatus, setCurrentStatus] = React.useState(5);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(newValue)
        if (newValue == 0) {
            value_new = 5;
        } else if (newValue == 1) {
            value_new = 6
        } else if (newValue == 2) {
            value_new = 7
        } else if (newValue == 3) {
            value_new = 8
        } else if (newValue == 4) {
            value_new = 10
        }

        onClickHistory(value_new)
        setValue(newValue);
        setCurrentStatus(newValue);
    };



    const accessToken = useAuthStore((e) => e.accessToken);
    // let item : IOrderItem;
    const [history, setHistory] = useState([] as IHistory[]);
    const [orderItem, setOrderItem] = useState([] as IOrderItem[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
        getHistoryOrder(5, accessToken).then((res: any) => {
            setLoading(true)
            const newResult = res.data.map((obj: IHistory) => ({ ...obj, order_item: [] }))
            setHistory(newResult)
        })
    }, [])

    const onClickHistory = (status_id: number) => {
        setLoading(false)
        getHistoryOrder(status_id, accessToken).then((res: any) => {
        setLoading(true)
            const newResult = res.data.map((obj: IHistory) => ({ ...obj, order_item: [] }))
            setHistory(newResult)
        })
    }
    const onClickUpdateStatus = (status_id: number, id_order: number) => {
        updateStatus(status_id, id_order, accessToken).then((res) => {
            console.log(res.data);
            console.log(currentStatus);
            onClickHistory(currentStatus)
        }, (err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        history.map((history) => (
            getOrderItemHistory(history.id, accessToken).then((res: any) => {
                setOrderItem(res.data)
                res.data.map((order_item: IOrderItem) => (
                    // console.log(order_item),
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
                    <TableCell align="center">{row.total_quantity}</TableCell>
                    <TableCell align="center">{row.total_price} </TableCell>
                    <TableCell align="center">{row.fee_money} </TableCell>
                    <TableCell align="center">{row.totalPrice} </TableCell>
                    <TableCell align="center">{row.created_time}</TableCell>
                    <TableCell align="center">
                        <Button hidden={value === 2 ? false : true} onClick={() => { onClickUpdateStatus(8, row.id) }}>
                            Đã nhận được hàng</Button>

                        <Button hidden={value === 0 ? false : true} onClick={() => { onClickUpdateStatus(10, row.id) }}>
                            Huỷ đơn hàng</Button>
                    </TableCell>

                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1, alignContent: "center" }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Chi tiết
                                </Typography>
                                <div>Địa chỉ nhận :  {/*{row.diachi}*/}</div>
                                <Table size="small" aria-label="purchases" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={2}>Sản phẩm</TableCell>
                                            <TableCell align="center">Loại</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Đơn giá (VNĐ)</TableCell>
                                            <TableCell align="center">Thành tiền (VNĐ)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {row.order_item?.map((order_item) => (
                                            <TableRow key={order_item.id}>
                                                <TableCell align="left" width={100}>
                                                    {/* <Avatar src={order_item.image} /> */}
                                                    <img src={order_item.image} width={100} />
                                                </TableCell>
                                                <TableCell align="left" component="th" scope="row" >
                                                    {order_item.name.split('-')[0]}
                                                </TableCell>
                                                <TableCell align="center">{order_item.option1 + ',' + order_item.option2 + ',' + order_item.option3}</TableCell>
                                                <TableCell align="center">{order_item.quantity}</TableCell>
                                                <TableCell align="center">{order_item.price}</TableCell>
                                                <TableCell align="center">{order_item.total_price}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell rowSpan={4} colSpan={3} />
                                            <TableCell colSpan={2}>Tổng phụ:</TableCell>
                                            <TableCell align="center">{row.total_price} VNĐ</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>Phí vận chuyển:</TableCell>
                                            <TableCell align="center">{row.fee_money} VNĐ</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>Tổng:</TableCell>
                                            <TableCell align="center">{row.totalPrice} VNĐ</TableCell>
                                        </TableRow>
                                        <TableRow hidden={value === 3 ? false : true}>
                                            <TableCell colSpan={2}></TableCell>
                                            <TableCell align="center"> <Button variant="outlined" color="error">Yêu cầu trả hàng</Button></TableCell>
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
    // ---------------------------------------------------------


    return (
        <div className="checkout-container container">
            <section className="page-header">
                <div className="overly"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="content text-center">
                                <h1 className="mb-3">LỊCH SỬ ĐƠN HÀNG</h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-transparent justify-content-center">
                                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">lịch sử đơn hàng</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Chờ xác nhận" {...a11yProps(0)} />
                            <Tab label="Chờ lấy hàng" {...a11yProps(1)} />
                            <Tab label="Đang giao hàng" {...a11yProps(2)} />
                            <Tab label="Đã nhận được hàng" {...a11yProps(3)} />
                            <Tab label="Đã huỷ" {...a11yProps(4)} />
                        </Tabs>
                    </Box>
                    <Box sx={{ width: '100%' }} hidden={loading}>
                        <LinearProgress />
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">Mã sản phẩm</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Giá tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Phí vận chuyển (VNĐ)</TableCell>
                                            <TableCell align="center">Tổng tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Ngày tạo hoá đơn</TableCell>
                                            <TableCell align="center">Huỷ Đơn</TableCell>
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
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">Mã sản phẩm</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Giá tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Phí vận chuyển (VNĐ)</TableCell>
                                            <TableCell align="center">Tổng tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Ngày tạo hoá đơn</TableCell>
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
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">Mã sản phẩm</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Giá tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Phí vận chuyển (VNĐ)</TableCell>
                                            <TableCell align="center">Tổng tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Ngày tạo hoá đơn</TableCell>
                                            <TableCell align="center">Xác nhận đơn hàng</TableCell>
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
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">Mã sản phẩm</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Giá tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Phí vận chuyển (VNĐ)</TableCell>
                                            <TableCell align="center">Tổng tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Ngày tạo hoá đơn</TableCell>
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
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell align="center">Mã sản phẩm</TableCell>
                                            <TableCell align="center">Số lượng</TableCell>
                                            <TableCell align="center">Giá tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Phí vận chuyển (VNĐ)</TableCell>
                                            <TableCell align="center">Tổng tiền (VNĐ)</TableCell>
                                            <TableCell align="center">Ngày tạo hoá đơn</TableCell>
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
                    </TabPanel>
                </Box>


            </section>
        </div>
    )
}
export default OrderHistory2