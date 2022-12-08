import React, {useEffect, useState} from "react";
import {DateTimeFilterProps, RevenueChartResponse} from "../../type/RevenueType";
import moment from "moment";
import {getRevenueChartApi} from "../../service/ReportService";
import Paper from "@mui/material/Paper";
import {Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {ApexOptions} from "apexcharts";
import ReactApexChart from "react-apexcharts";


export type DateTimeReportProps ={
    startTime:Date | undefined,
    endTime:Date | undefined
}
function RevenueChart(props: DateTimeReportProps) {
    const {startTime, endTime} = props;

    const [revenueChartItems, setRevenueChartItems] = useState<Array<RevenueChartResponse>>([]);
    const [filterRequest, setFilterRequest] = useState<DateTimeFilterProps>({});

     const formatDateYear = (date: Date, errorText?: string): string => {
        if (moment(date).isValid()) {
            return moment(date).format("YYYY-MM-DD");
        }
        return errorText ? errorText : "Chưa có ngày tháng";
    }
    const formatNumber = (number: number) => {
        return number.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    const getRevenueChart = async () => {
            const startDate = moment(startTime);
            const timeEnd = moment(endTime);
            const diff = timeEnd.diff(startDate);

            const diffDuration = moment.duration(diff);
            filterRequest.startTime = startTime !== undefined ? formatDateYear(startTime) :undefined;
            filterRequest.endTime = endTime !== undefined ? formatDateYear(endTime) : undefined;


            if (diffDuration.asDays() <= 90 && diffDuration.asDays() !==0) {
                filterRequest.timeType = "day";
            } else {
                filterRequest.timeType = "month";
            }
            const response = await getRevenueChartApi(filterRequest);
            setRevenueChartItems(response.data);
    };
    useEffect(() => {
        getRevenueChart().then(r => {
        });
    }, [filterRequest, startTime, endTime]);


    const series = [
        {
            name: "Hiện tại",
            data: revenueChartItems.map(r => {
                return (
                    {
                        x: r?.date,
                        y: r?.netRevenue === null ? 0 : r.netRevenue,
                        lastPeriodDate: r?.lastPeriodDate == null ? null : moment(r?.lastPeriodDate).format("DD/MM/YYYY"),
                    }
                )
            }),
            color: '#2E93fA'
        },
        {
            name: "Kì trước",
            data: revenueChartItems.map(r => {
                return (
                    {
                        x: r?.date,
                        y: r?.lastPeriodNetRevenue === null ? 0 : r.lastPeriodNetRevenue,
                        lastPeriodDate: r?.lastPeriodDate,
                    }
                )
            }),
            color: '#5da7e8'
        },
    ]
    const date = revenueChartItems &&  (revenueChartItems.map(re1 => re1.date))

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'bar',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false,
            },

        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: [5, 7, 5],
            curve: 'straight',
            dashArray: [0, 8, 5],
            colors: ['#2E93fA','#5da7e8']
        },

        markers: {
            size: 5,
            shape: "circle",
            showNullDataPoints: true,
            hover: {
                size: 5
            },
            colors:['#2E93fA','#5da7e8']
        },
        yaxis:{
            labels:{
                formatter: function(val, index) {
                    return formatNumber(val);
                },
                style: {
                    fontSize: '12px'
                },
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                rotate:0,
                maxHeight: 150,
                style: {
                    fontSize: '11px'
                },
                hideOverlappingLabels: false,
                formatter: val => moment(val).format('DD/MM/YYYY')
            },
            axisTicks: {
                show: true,
                height: 10
            },
            tickAmount: 6,
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const data = w.globals.initialSeries[0].data[dataPointIndex];
                let moneyType = " vnđ"
                let lastRevenue = formatNumber(w.globals.initialSeries[1].data[dataPointIndex].y)
                if (data.lastPeriodDate == null){
                    data.lastPeriodDate = "Không có dữ liệu"
                }
                if ( lastRevenue === "0"){
                    lastRevenue = ""
                    moneyType = ""
                }
                return '<div style="padding: 10px">' +
                    '<p><b>Hiện tại</b>: ' + moment(data.x).format('DD/MM/YYYY') +'  <b>' + formatNumber(data.y) + ' vnđ'  +'</b>  </p>' +
                    '<p ><b>Kì trước</b>: ' + data.lastPeriodDate +'  <b>' + lastRevenue + moneyType  +'</b>  </p>' +
                    '</div>';
            }
        },
        grid: {
            borderColor: '#f1f1f1',
        },
    }

    return (
        <Box component={Paper} p={2} height={500}>

            <Grid container>
                <Grid item xs={10}>
                    <Typography component="h6" variant="h6" gutterBottom>DOANH THU WEBSITE
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Link  to={'/admin/tracking/detail/revenue'}>Xem chi tiết
                    </Link>
                </Grid>
            </Grid>
            {
                revenueChartItems && (
                    <ReactApexChart
                        height={350}
                        options={options}
                        series={series}
                        type="line"
                    />
                )
            }

        </Box>
    );
}
export default RevenueChart