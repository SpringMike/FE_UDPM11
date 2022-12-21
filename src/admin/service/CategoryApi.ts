import axios from "axios";
import base_url from "./BaseApi";

const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};



export const getCategories = async (valueInput = "") => {
    return await axios.get(`${base_url}/api/categories/findall`, {params: {valueInput: valueInput}})
}


export const getAllCategories = async () => {
    return await axios.get(`${base_url}/api/categories/getAll`, { headers })
}

export const addCategoriesAPI = async (staff: object) => {
    return await axios.post(`${base_url}/api/categories`, staff, { headers })
}

export const getCategoriesName = async (id: number) => {
    return await axios.get(`${base_url}/api/categories/${id}`, { headers })
}