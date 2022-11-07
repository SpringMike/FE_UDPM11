import axios from "axios";
import base_url_public from "./BaseApiPublic";


export const getHistoryOrder = async (accessToken: string) => {

    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/history/`, config)
    );
};


export const getOrderItemHistory = async (id_order: number, accessToken: string) => {

    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/history/${id_order}`, config)
    );
};