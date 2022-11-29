import RevenueChart from "./RevenueChart";


import React, {Fragment, useState} from "react";
import {DatePicker} from "antd";
import {Grid, Typography} from "@mui/material";

function ReportPage(){
    let defaultStartTime = new Date();
    defaultStartTime.setDate(defaultStartTime.getDate() - 7)
    const defaultEndTime = new Date();
    const [startTime, setStartTime] = useState<Date | undefined>(defaultStartTime);
    const [endTime, setEndTime] = useState<Date | undefined>(defaultEndTime);
    const { RangePicker } = DatePicker;
    const onChangeRangePicker = (dates: any, dateStrings: any) => {
        setStartTime( (dateStrings[0] === "") ? null : dateStrings[0])
        setEndTime( (dateStrings[1] === "") ? null : dateStrings[1])
    }
    return (
        <Fragment>
            <Typography component="h2" variant="h4" gutterBottom>Báo cáo</Typography>
            <RangePicker showTime onChange={onChangeRangePicker} />
            <Grid  container style={{marginTop: 10}}>
                <Grid item xs={12} key={'revenue'}>
                    <RevenueChart startTime={startTime} endTime={endTime}/>
                </Grid>
            </Grid>
        </Fragment>
    );
}
export default ReportPage