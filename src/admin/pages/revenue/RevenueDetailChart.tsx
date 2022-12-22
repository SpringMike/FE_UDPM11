import React, {useEffect, useState} from "react";
import {
    Button,
    Divider,
    Grid,
    SortDirection,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {DateTimeFilterProps, ListRevenueChartResponse, RevenueChartResponse} from "../../type/RevenueType";
import moment from "moment/moment";
import {getRevenueChartApi, getRevenueChartDetailsApi} from "../../service/ReportService";
import {ApexOptions} from "apexcharts";
import Paper from "@mui/material/Paper";
import {Link} from "react-router-dom";

import {DatePicker} from "antd";
import ReactApexChart from "react-apexcharts";
import TableCellSort from "../../components/TableCellSort";
import * as Antd from "antd";

function RevenueDetailChart (){
    const sizePage = 10;
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1)

    const [sortDirection, setSortDirection] = useState<SortDirection>();
    const [sortBy, setSortBy] = useState<string>();


    let defaultStartTime = new Date();
    defaultStartTime.setDate(defaultStartTime.getDate() - 7)
    const defaultEndTime = new Date();

    const [startTime, setStartTime] = useState<Date | undefined>(defaultStartTime);
    const [endTime, setEndTime] = useState<Date | undefined>(defaultEndTime);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterRequest, setFilterRequest] = useState<DateTimeFilterProps>({});
    const [listRevenueReport, setListRevenueReport] = useState<ListRevenueChartResponse>();
    const [totalRows, setTotalRows] = useState(0);
    const [revenueCharts, setRevenueCharts] = useState<Array<RevenueChartResponse>>([]);

    const formatDateYear = (date: Date, errorText?: string): string => {
        if (moment(date).isValid()) {
            return moment(date).format("YYYY-MM-DD");
        }
        return errorText ? errorText : "Chưa có ngày tháng";
    }
    const formatNumber = (number: number) => {
        return number.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const getRevenueChart = async ()=>{
            filterRequest.startTime = startTime !== undefined ? formatDateYear(startTime) : undefined;
            filterRequest.endTime = endTime  !== undefined ? formatDateYear(endTime) : undefined;
            const finalRequest = {
                ...filterRequest,
                timeType:'day'
            };
            const response = await getRevenueChartApi( finalRequest);
            setRevenueCharts(response.data);
    }
    useEffect(() =>{
        getRevenueChart().then(r => {});
    },[startTime,endTime])

    const filterRevenueReports = async () => {
            filterRequest.startTime = startTime  !== undefined ? formatDateYear(startTime) : undefined;
            filterRequest.endTime = endTime  !== undefined ? formatDateYear(endTime) : undefined;
            const finalRequest = {
                ...filterRequest,
                page: page,
                limit: sizePage,
                sortBy: sortBy,
                sortDirection: sortDirection
            };
            const response = await getRevenueChartDetailsApi( finalRequest);
            setListRevenueReport(response.data);
            setTotalPage(response.data.metadata.total )
            const totalPage = Math.ceil(response.data.metadata.total / sizePage);
            setTotalRows(response.data.metadata.total)
            if (page > totalPage){
                setPage(1)
            }
    };
    useEffect(() => {
        filterRevenueReports();
    }, [filterRequest, page, startTime, endTime, sortDirection, sortBy]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const createSortHandler = (property: string) => {
        let direction: SortDirection;
        if (property == sortBy) {
            direction = sortDirection == 'desc' ? 'asc' : 'desc';
        } else {
            direction = 'desc';
        }
        setPage(1);
        setSortBy(property);
        setSortDirection(direction);
    };
    const date = revenueCharts  ? revenueCharts.map(re => moment(re.date).format("DD/MM/YYYY")) : [];
    const options: ApexOptions = {
        chart: {
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels:{
            enabled:false
        },
        tooltip:{
            y: {
                title: {
                    formatter: (val) => val
                },
            },
            z: {
                title: 'Doanh thu: '
            },

        },
        xaxis: {
            categories: date,
            labels: {
                rotate:0,
                maxHeight: 150,
                style: {
                    fontSize: '11px'
                },
                hideOverlappingLabels: false
            },
            tickAmount: 17,
        },
        yaxis: {
            labels:{
                formatter: function(val, index) {
                    return formatNumber(val);
                },
                style: {
                    fontSize: '12px'
                },
            },

        }
    };

    const series = listRevenueReport ? [
        {
            name: "Doanh thu",
            data:  revenueCharts.map(value => value.netRevenue)
        }
    ] : [];
    const { RangePicker } = DatePicker;

    const onTimeChange = (dates: any, dateStrings: any) => {
        setStartTime( (dateStrings[0] === "") ? null : dateStrings[0])
        setEndTime( (dateStrings[1] === "") ? null : dateStrings[1])
    }
    return (
        <div className='p-5'>
        <Grid container spacing={3} >
            <Link to="/admin/tracking">Danh sach bao cao </Link>
            <Grid item xs={12} mt={2} component={Paper}>
                <Typography component="h5" variant="h5" gutterBottom>Doanh thu theo thời gian</Typography>
                <Antd.DatePicker.RangePicker
                    defaultValue={[moment(startTime), moment(endTime)]}
                    style={{width: "50%"}}
                    ranges={{
                        'Hôm nay': [moment().startOf('day'), moment().endOf('day')],
                        'Tuần này': [moment().startOf('week'), moment().endOf('week')],
                        'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                        'Năm nay': [moment().startOf('year'), moment().endOf('year')],
                    }}
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={onTimeChange}
                />
                {listRevenueReport && listRevenueReport.responses.length > 0 ? <ReactApexChart
                    height={400}
                    options={options}
                    series={series}
                    type="bar"
                /> : <div style={{
                    display: "flex",
                    height: 300,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <strong>
                        Báo cáo này không đủ dữ liệu nên không có biểu đồ
                    </strong>
                </div>}
            </Grid>
            <Grid item xs={12} component={Paper} style={{marginTop: 10,paddingBottom:25}}>
                <Divider style={{  marginTop: 10, marginBottom: 10}}/>
                <Table aria-label="referral table" style={{padding: 10}}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Ngày</TableCell>
                            <TableCellSort
                                keyCell={"orderCount"}
                                labelCell={"Số lượng đơn hàng"}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                createSortHandler={createSortHandler}
                            />
                            <TableCellSort
                                keyCell={"totalAmount"}
                                labelCell={"Doanh thu"}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                createSortHandler={createSortHandler}
                            />
                            <TableCellSort
                                keyCell={"returnAmount"}
                                labelCell={"Trả lại hàng"}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                createSortHandler={createSortHandler}
                            />
                            <TableCellSort
                                keyCell={"realRevenue"}
                                labelCell={"Doanh thu thực"}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                createSortHandler={createSortHandler}
                            />
                            <TableCellSort
                                keyCell={"shippingFee"}
                                labelCell={"Vận chuyển"}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                createSortHandler={createSortHandler}
                            />
                            <TableCellSort
                                keyCell={"netRevenue"}
                                labelCell={"Tổng doanh thu"}
                                sortBy={sortBy}
                                sortDirection={sortDirection}
                                createSortHandler={createSortHandler}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listRevenueReport != null &&
                            <TableRow style={{ backgroundColor: '#C6E5FF',}}>
                                <TableCell align="left">Tổng</TableCell>
                                <TableCell align="center">
                                    <strong>{formatNumber(listRevenueReport.totalOrderCount)}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{formatNumber(listRevenueReport.totalOrderAmount)}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{formatNumber(listRevenueReport.totalReturnOrderAmount)}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{formatNumber(listRevenueReport.totalRealRevenue)}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{formatNumber(listRevenueReport.totalShippingFee)}</strong>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>{formatNumber(listRevenueReport.totalNetRevenue)}</strong>
                                </TableCell>

                            </TableRow>}
                        {listRevenueReport != null && listRevenueReport.responses && listRevenueReport.responses.map((revenue, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    <Link to={`#`}>{moment(revenue.date).format("DD/MM/YYYY")}</Link>
                                </TableCell>
                                <TableCell align="center">
                                    {formatNumber(revenue.orderCount)}
                                </TableCell>
                                <TableCell align="center">
                                    {formatNumber(revenue.totalOrderAmount)}
                                </TableCell>
                                <TableCell align="center">
                                    {formatNumber(revenue.returnOrderAmount)}
                                </TableCell>
                                <TableCell align="center">
                                    {formatNumber(revenue.realRevenue)}
                                </TableCell>
                                <TableCell align="center">
                                    {formatNumber(revenue.shippingAmount)}
                                </TableCell>
                                <TableCell align="center">
                                    {formatNumber(revenue.netRevenue)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        </TableRow>
                        <Antd.Pagination responsive style={{marginTop: 10, marginRight: 10}}
                                         pageSize={10} showSizeChanger showQuickJumper
                                         defaultCurrent={1} total={totalPage} onChange={handleChangePage}
                                         pageSizeOptions={[10, 20, 50]}/>
                    </TableFooter>
                </Table>

            </Grid>
        </Grid>
        </div>
    );

}
export default RevenueDetailChart