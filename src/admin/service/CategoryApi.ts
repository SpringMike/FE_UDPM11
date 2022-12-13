import axios from "axios";
import base_url from "./BaseApi";

export const getCategories = async (valueInput = "") => {
    return await axios.get(`${base_url}/api/categories/findall`, {
        params: {
            valueInput: valueInput,
        }
    })
}