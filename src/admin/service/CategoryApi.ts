import axios from "axios";

export const getCategories = async (valueInput = "") => {
    return await axios.get(`http://localhost:8080/api/categories/findall`, {
        params: {
            valueInput: valueInput,
        }
    })
}