import axios from "axios";
import React from "react";
import base_url from "../pages/api/BaseApi";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};



export const getStaffs = async () => {
    return await axios.get(`${base_url}/staffs/findAll`, { headers })
}


export const createStaff = async (staff: object) => {
    return await axios.post(`${base_url}/staffs`, staff, { headers })
}


export const deleteStaff = async (listId: React.Key[]) => {
    return await axios.put(`${base_url}/staffs/delete`, listId, { headers })
}

export const updateStatusStaff = async (listId: React.Key[], status: string) => {
    return await axios.post(`${base_url}/staffs/updateStatus/${status}`, listId, { headers })
}

export const getStaffById = async (id: number) => {
    return await axios.get(`${base_url}/staffs/${id}`, { headers })
}

export const updateStaffById = async (status: Boolean, roleId: Number, id: number) => {
    return await axios.put(`${base_url}/staffs/${status}/${roleId}/${id}`, { headers })
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