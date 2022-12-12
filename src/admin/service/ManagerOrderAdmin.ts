import axios from "axios";
import base_url from "./BaseApi";

let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};



export const getAllOrder = async () => {
    return await axios.get(`${base_url}/api/manager-oder/findAll`, { headers })
}

export const updateStatusOrderByAdmin = async (status_id: number, list_id_order: number[], action_by: String) => {
    return await axios.put(`${base_url}/api/manager-oder/update-multiple/${status_id}?action_by=${action_by}`, list_id_order, { headers })

}
export const getOrderItemsByIdOrder = async (id_order: number) => {
    return await axios.get(`${base_url}/api/manager-oder/showItem/${id_order}`, { headers })
}


export const findAllOrderByStatus = async (status_id: number) => {
    return await axios.put(`${base_url}/api/manager-oder/findAll/by/${status_id}`, { headers })
}


// order return
export const getAllOrderReturn = async () => {
    return await axios.get(`${base_url}/api/manager-oder/findAll/orderReturn`, { headers })
}

export const updateStatusReturnOrderByAdmin = async (status_id: number, id_order: number) => {
    return await axios.put(`${base_url}/api/manager-oder/update-return-status/${status_id}?idOrderReturn=${id_order}`, { headers })

}
export const getOrderReturnItemsByIdOrder = async (id_order_return: number) => {
    return await axios.get(`${base_url}/api/manager-oder/showItem/orderReturn/${id_order_return}`, { headers })
}

// search

export const searchOrderAll = async (query: String) => {
    return await axios.get(`${base_url}/api/manager-oder/searchAllOrder?query=${query}`, { headers })
}
export const searchOrderReturnAll = async (query: String) => {
    return await axios.get(`${base_url}/api/manager-oder/searchOrdersReturn?query=${query}`, { headers })
}
