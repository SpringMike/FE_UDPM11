import axios from "axios";
import React from "react";
import {IProductVariant} from "../type/ImportInvoiceType";
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const addProduct = (data: any) => {
    return axios.post('http://localhost:8080/api/products', data,{headers})
}


export const deleteVariantsById=(listId:Array<React.Key>)=>{
    return axios.delete(`http://localhost:8080/api/products/variants/${listId}`,{headers})

}
export const updateProduct=(productInfo:any)=>{
    return axios.put('http://localhost:8080/api/products',productInfo,{headers})
}
export const getProducts = (data: any) => {
    return axios.post('http://localhost:8080/api/products/filter', data,{headers})
}

export const countProductByFilter=(data:any)=>{
    return axios.post('http://localhost:8080/api/products/count',data,{headers})
}
export const getProductById=(id:number)=>{

    return axios.get(`http://localhost:8080/api/products/admin/${id}`,{headers})
}
export const deleteProductById=(id:number)=>{

    return axios.delete(`http://localhost:8080/api/products/${id}`,{headers})


}
export const deleteProductsById=(listId:Array<React.Key>)=>{
    return axios.delete(`http://localhost:8080/api/products/${listId}`,{headers})


}