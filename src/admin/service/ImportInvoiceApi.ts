import axios from "axios";
import base_url from "./BaseApi";


let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const createImport = async (im: object) => {
    return await axios.post(`${base_url}/api/imports/`, im,{headers})
}
export const getImportInvoices = async (value: string) => {
    return await axios.get(`${base_url}/api/imports/findAll?searchValue=${value}`,{headers})
}
export const getDetailImportInvoice = async (code: string) => {
    return await axios.get(`${base_url}/api/imports/getDetails/${code}`,{headers})
}
export const updateStatusInvoice = async (importId: number, status: string, accountId: number) => {
    return await axios.put(`${base_url}/api/imports/updateStatus?id=${importId}&status=${status}&accountId=${accountId}`,{ title: "Update trạng thái" },{headers})
}
export const updateStatusReturnInvoice = async (importId: number, status: string, accountId: number) => {
    return await axios.put(`${base_url}/api/imports/updateStatusReturn?id=${importId}&status=${status}&accountId=${accountId}`,{ title: "Update trạng thái trả hàng" },{headers})
}
export const getHistoryStatusImportInvoice = async (importId: number) => {
    return await axios.get(`${base_url}/api/imports/getStatusHistory/${importId}`,{headers})
}

export const getImportReturn = async (code: string) => {
    return await axios.get(`${base_url}/api/imports/getReturnImport/${code}`,{headers})
}

export const returnImportInvoice = async (obj: object, inventoryId: number) => {
    return await axios.post(`${base_url}/api/return_import/${inventoryId}`, obj,{headers})
}

export const getDetailsImportReturn = async (code: string) => {
    return await axios.get(`${base_url}/api/imports/getDetailsReturnImport/${code}`,{headers})
}

export const getCurrentQuantityInventory = async (id: number) => {
    return await axios.get(`${base_url}/inventories/getCurrentQuantityInventory/${id}`,{headers})
}

export const getImportInvoiceBySupplier = async (id: number) => {
    return await axios.get(`${base_url}/api/imports/getImportInvoiceBySuppler/${id}`,{headers})
}

export const getProductVariant = async (pageNumber: number, searchValue: string) => {
    return await axios.get(`${base_url}/api/product-variants/findProductVariant?pageNumber=${pageNumber}&pageSize=7&searchValue=${searchValue}`,{headers})
}
export const getCountTotalProductVariant = async (searchValue: string) => {
    return await axios.get(`${base_url}/api/product-variants/count-total?searchValue=${searchValue}`,{headers})
}