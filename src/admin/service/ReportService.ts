import axios from "axios";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const getRevenueChartApi = (request: any) => {
    return axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/tracking/revenue`, {
        headers, params: request
    })
}
export const getRevenueChartDetailsApi = (request: any) => {
    return axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/tracking/details/revenue`, {
        headers, params: request
    })
}