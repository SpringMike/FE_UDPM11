import axios from "axios";


let configValue: string | undefined = process.env.REACT_APP_API
const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
};
export const createImport = async (im: object) => {
    return await axios.post(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/`, im,{headers})
}
export const getImportInvoices = async (value: string) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/findAll?searchValue=${value}`,{headers})
}
export const getDetailImportInvoice = async (code: string) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/getDetails/${code}`,{headers})
}
export const updateStatusInvoice = async (importId: number, status: string, accountId: number) => {
    return await axios.put(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/updateStatus?id=${importId}&status=${status}&accountId=${accountId}`,{ title: "Update trạng thái" },{headers})
}
export const updateStatusReturnInvoice = async (importId: number, status: string, accountId: number) => {
    return await axios.put(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/updateStatusReturn?id=${importId}&status=${status}&accountId=${accountId}`,{ title: "Update trạng thái trả hàng" },{headers})
}
export const getHistoryStatusImportInvoice = async (importId: number) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/getStatusHistory/${importId}`,{headers})
}

export const getImportReturn = async (code: string) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/getReturnImport/${code}`,{headers})
}

export const returnImportInvoice = async (obj: object, inventoryId: number) => {
    return await axios.post(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/return_import/${inventoryId}`, obj,{headers})
}

export const getDetailsImportReturn = async (code: string) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/getDetailsReturnImport/${code}`,{headers})
}

export const getCurrentQuantityInventory = async (id: number) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/inventories/getCurrentQuantityInventory/${id}`,{headers})
}

export const getImportInvoiceBySupplier = async (id: number) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/imports/getImportInvoiceBySuppler/${id}`,{headers})
}

export const getProductVariant = async (pageNumber: number, searchValue: string) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/product-variants/findProductVariant?pageNumber=${pageNumber}&pageSize=7&searchValue=${searchValue}`,{headers})
}
export const getCountTotalProductVariant = async (searchValue: string) => {
    return await axios.get(`http://180.93.175.189:8085/BE_UDPM_11_V1_war/api/product-variants/count-total?searchValue=${searchValue}`,{headers})
}