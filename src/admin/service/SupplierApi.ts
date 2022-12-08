import axios from "axios";
import React from "react";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};

export const getSuppliers = async () => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/suppliers/findAll`, {headers})
}
export const createSupplier = async (supplier: object) => {
    return axios.post(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/suppliers`, supplier, {headers})
}
export const deleteSupplier = async (listId: React.Key[]) => {
    return axios.put(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/suppliers/delete`, listId,{headers})
}
export const updateStatusSupplier = async (listId: React.Key[], status: string) => {
    return axios.put(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/suppliers/updateStatus/${status}`, listId,{headers})
}
export const updateSupplier = async (supplier: object) => {
    return axios.put(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/suppliers`, supplier,{headers})
}
export const getSupplierById = async (id: number) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/suppliers/${id}`,{headers})
}

export const getProvince = async () => {
    return await axios.get(`https://provinces.open-api.vn/api/p`)
}

export const getDistrict = async (code: string) => {
    return await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
}
export const getWard = async (code: string) => {
    return await axios.get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
}