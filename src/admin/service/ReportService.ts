import axios from "axios";
import base_url from "./BaseApi";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const getRevenueChartApi = (request: any) => {
    return axios.get(`${base_url}/api/tracking/revenue`, {
        headers, params: request
    })
}
export const getRevenueChartDetailsApi = (request: any) => {
    return axios.get(`${base_url}/api/tracking/details/revenue`, {
        headers, params: request
    })
}