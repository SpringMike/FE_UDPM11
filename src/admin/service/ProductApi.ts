import axios from "axios";
import React from "react";
import {IProductVariant} from "../type/ImportInvoiceType";

export const addProduct = (data: any) => {
    return axios.post('http://localhost:8080/api/products', data)
}


export const deleteVariantsById=(listId:Array<React.Key>)=>{
    return axios.delete(`http://localhost:8080/api/products/variants/${listId}`)

}
export const updateProduct=(productInfo:any)=>{
    return axios.put('http://localhost:8080/api/products',productInfo)
}
export const getProducts = (data: any) => {
    return axios.post('http://localhost:8080/api/products/filter', data)
}

export const countProductByFilter=(data:any)=>{
    return axios.post('http://localhost:8080/api/products/count',data)
}
export const getProductById=(id:number)=>{

    return axios.get(`http://localhost:8080/api/products/admin/${id}`)
}
export const deleteProductById=(id:number)=>{

    return axios.delete(`http://localhost:8080/api/products/${id}`)


}
export const deleteProductsById=(listId:Array<React.Key>)=>{
    return axios.delete(`http://localhost:8080/api/products/${listId}`)


}