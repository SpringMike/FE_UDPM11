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
    return await axios.put(`${base_url}/manager-oder/update-multiple/${status_id}`, { list_id_order }, { headers })
}

