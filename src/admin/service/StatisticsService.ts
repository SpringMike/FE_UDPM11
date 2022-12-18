import axios from "axios"
import {StatisticsFilter} from "../type/Statistic"
import base_url from "./BaseApi";

var token = localStorage.getItem("token")
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};

export const getStaffs = async () => {
    return await axios.get(`${base_url}/api/staffs/findAll`, {headers})
}
export const getStatisticsImport = async (filter: StatisticsFilter) => {
    return await axios.post(`${base_url}/api/statistics/imports`, filter,{headers})
}
export const getStatisticsImportExtend =async (filter: StatisticsFilter) => {
    return await axios.post(`${base_url}/api/statistics/imports/extend`, filter,{headers})

}
export const getStatisticsInventory = async (filter: StatisticsFilter) => {
    return await axios.post(`${base_url}/api/statistics/inventories`, filter,{headers})
}
export const getInventoryById = async (id: number) => {
    return await axios.get(`${base_url}/inventories/${id}`, {headers})
}
