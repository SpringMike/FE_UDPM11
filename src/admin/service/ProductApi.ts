import axios from "axios";

export const addProduct = (data: any) => {
    return axios.post('http://localhost:8080/api/products', data)
}