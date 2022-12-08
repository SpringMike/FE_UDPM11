import axios from "axios";
import React from "react";
import {IProductVariant} from "../type/ImportInvoiceType";
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const addProduct = (data: any) => {
    return axios.post('http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products', data,{headers})
}


export const deleteVariantsById=(listId:Array<React.Key>)=>{
    return axios.delete(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products/variants/${listId}`,{headers})

}
export const updateProduct=(productInfo:any)=>{
    return axios.put('http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products',productInfo,{headers})
}
export const getProducts = (data: any) => {
    return axios.post('http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products/filter', data,{headers})
}

export const countProductByFilter=(data:any)=>{
    return axios.post('http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products/count',data,{headers})
}
export const getProductById=(id:number)=>{

    return axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products/admin/${id}`,{headers})
}
export const deleteProductById=(id:number)=>{

    return axios.delete(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products/${id}`,{headers})


}
export const deleteProductsById=(listId:Array<React.Key>)=>{
    return axios.delete(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/products/${listId}`,{headers})


}