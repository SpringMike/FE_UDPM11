import axios from "axios";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const getRevenueChartApi = (request: any) => {
    return axios.get(`http://localhost:8080/api/tracking/revenue`, {
        headers, params: request
    })
}
export const getRevenueChartDetailsApi = (request: any) => {
    return axios.get(`http://localhost:8080/api/tracking/details/revenue`, {
        headers, params: request
    })
}