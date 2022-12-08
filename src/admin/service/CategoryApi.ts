import axios from "axios";

export const getCategories = async (valueInput = "") => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/categories/findall`, {
        params: {
            valueInput: valueInput,
        }
    })
}