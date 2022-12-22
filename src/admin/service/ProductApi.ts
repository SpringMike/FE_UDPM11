import axios from "axios";
import React from "react";
import { IProductVariant } from "../type/ImportInvoiceType";
import base_url from "./BaseApi";
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const addProduct = (data: any) => {
    return axios.post(`${base_url}/api/products`, data, { headers })
}


export const deleteVariantsById = (listId: number[]) => {
    return axios.post(`${base_url}/api/products/variants/`, listId , { headers })

}
export const updateProduct = (productInfo: any) => {
    return axios.put(`${base_url}/api/products`, productInfo, { headers })
}
export const getProducts = (data: any) => {
    return axios.post(`${base_url}/api/products/filter`, data, { headers })
}

export const countProductByFilter = (data: any) => {
    return axios.post(`${base_url}/api/products/count`, data, { headers })
}
export const getProductById = (id: number) => {

    return axios.get(`${base_url}/api/products/admin/${id}`, { headers })
}
export const deleteProductById = (id: number) => {

    return axios.delete(`${base_url}/api/products/${id}`, { headers })


}
export const deleteProductsById = (listId: Array<React.Key>) => {
    return axios.delete(`${base_url}/api/products/${listId}`, { headers })


}