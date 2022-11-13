import axios from "axios";
import base_url_public from "./BaseApiPublic";


export const getHistoryOrder = async (status_id: number, accessToken: string) => {

    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/history/by/${status_id}`, config)
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

export const updateStatusDeliverySuccessful = async (status_id: number, id_order: number, accessToken: string) => {
    let config = {
        headers: {
            token: accessToken
        }
    }
    return (
        await axios.get(`${base_url_public}/history/update/${id_order}?status_id=${status_id}`, config)
    );
};