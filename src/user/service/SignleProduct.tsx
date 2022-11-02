import axios from "axios";
import React from "react";
import { useAuthStore } from "../../hooks/zustand/auth";
import base_url_public from "./BaseApiPublic";

// createCart(userDetail: UserDetail, insId: string, amount: number): Promise<CreateCartResponse> {
//     const config = {
//       headers: {
//         token: userDetail.accessToken,
//       }
//     }
//     const url = '/ins/order'
//     return axiosClient.post(url, {insId, amount}, config)
//   },


let config = {
    headers: {
        token: String(localStorage.getItem('UDPM11-accessToken'))
    }
}
console.log(localStorage.getItem('UDPM11-accessToken'))

export const getProductOption = async (id: number, op1: any, op2: any, op3: any) => {
    return (
        await axios.get(`${base_url_public}/product/getProductVarient/${id}?op1=${op1}&op2=${op2}&op3=${op3}`)
    );
};

export const addToCart = async (quantity: number, id_product_varient: number) => {

    return (
        await axios.post(`${base_url_public}/cart/`, { quantity, id_product_varient }, config)
    );
};