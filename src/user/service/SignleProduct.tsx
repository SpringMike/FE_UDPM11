import axios from "axios";
import React from "react";
import base_url from "../../admin/service/BaseApi";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};



export const getProductOption = async (id: number,op1: any,op2: any,op3: any) => {return (
        await axios.get(`http://localhost:8080/products/getProduct/${id}`, {
            params: {op1: op1,op2: op2,op3: op3},
        })
    ).data;
};