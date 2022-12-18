import RevenueChart from "./RevenueChart";


import React, {Fragment, useState} from "react";
import {DatePicker} from "antd";
import {Grid, Typography} from "@mui/material";
import {RangePickerProps} from "antd/es/date-picker";
import moment from "moment/moment";
import * as Antd from "antd";

function ReportPage(){
    let defaultStartTime = new Date();
    defaultStartTime.setDate(defaultStartTime.getDate() - 7)
    const defaultEndTime = new Date();
    const [startTime, setStartTime] = useState<Date | undefined>(defaultStartTime);
    const [endTime, setEndTime] = useState<Date | undefined>(defaultEndTime);
    const { RangePicker } = DatePicker;
    const onTimeChange: RangePickerProps['onChange'] = (dates:any, dateStrings:any) => {
        setStartTime( (dateStrings[0] === "") ? null : dateStrings[0])
        setEndTime( (dateStrings[1] === "") ? null : dateStrings[1])
    }

    return (
        <Fragment>
            <Typography component="h2" variant="h4" style={{marginLeft:45}} gutterBottom>Báo cáo</Typography>
            <div className='p-5 pt-2'>
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
            <Grid  container style={{marginTop: 10}}>
                <Grid item xs={12} key={'revenue'}>
                    <RevenueChart startTime={startTime} endTime={endTime}/>
                </Grid>
            </Grid>
            </div>
        </Fragment>
    );
}
export default ReportPage