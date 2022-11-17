import axios from "axios";
import base_url from "./BaseApi";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};



export const getAllOrder = async () => {
    return await axios.get(`${base_url}/manager-oder/findAll`, { headers })
}

export const updateStatusOrderByAdmin = async (status_id: number, list_id_order: number[]) => {
    return await axios.put(`${base_url}/manager-oder/update-multiple/${status_id}`, list_id_order, { headers })

}
export const getOrderItemsByIdOrder = async (id_order: number) => {
    return await axios.get(`${base_url}/manager-oder/showItem/${id_order}`, { headers })
}


export const findAllOrderByStatus = async (status_id: number) => {
    return await axios.put(`${base_url}/manager-oder/findAll/by/${status_id}`, { headers })
}


// order return
export const getAllOrderReturn = async () => {
    return await axios.get(`${base_url}/manager-oder/findAll/orderReturn`, { headers })
}

export const updateStatusReturnOrderByAdmin = async (status_id: number, id_order: number) => {
    return await axios.put(`${base_url}/manager-oder/update-return-status/${status_id}?idOrderReturn=${id_order}`, { headers })

}
export const getOrderReturnItemsByIdOrder = async (id_order_return: number) => {
    return await axios.get(`${base_url}/manager-oder/showItem/orderReturn/${id_order_return}`, { headers })
}