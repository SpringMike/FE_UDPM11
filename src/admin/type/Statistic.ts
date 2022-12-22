export interface StatisticsFilter {
    inventoryId: number,
    supplierId: number,
    startDate: number,
    endDate: number,
    sortBy: string,
    sortDir: boolean,
    keySearch: string,
    tag: number,
    page: number,
    size: number,
    type: number,
    statisticsType: number,
    viewType: number
}

export interface StatisticsIventoryFilter {
    inventoryId: number,
    startDate: number,
    endDate: number,
    sortBy: string,
    sortDir: boolean,
    keySearch?: string,
    tag: number,
    page: number,
    size: number,
    type: number,
    statisticsType: number,
    viewType: number

}

export interface Inventory {
    id: number;
    code: string;
    name: string;
    address: string;
    createAt: string;
    updateAt: string;
    isDelete: boolean;
}

export interface ImportStatistic {
    inventoryId: number,
    supplierId: number,
    accountId: number,
    importId: number,
    importCode: string,
    detailsImportId: number,
    productVariantId: number,
    importPrice: number,
    importNumber: number,
    totalPrice: number,
    deliveryDate: string,
    createAt: string,
    code: string,
    name: string,
    productId: number,
    productName: string,
    returnNumber: number,
    receiveNumber: number,
    avgPrice: number
}

export interface InventoryStatistic {
    "productVariantId": number,
    "productVariantCode": string,
    "productVariantName": string,
    "productId": number,
    "productCode": string,
    "importNumber": number,
    "returnNumber": number,
    "exportNumber": number,
    "quantity": number
}

export interface sortOption {
    key: string,
    value: string
}

export interface typeOption {
    key: number,
    value: string
}


export const ImportSortOptions: sortOption[] = [
    {key: 'name', value: 'Tên sản phẩm'},
    {key: 'receive_number', value: 'Số lượng nhập'},
    {key: 'return_number', value: 'Số lượng trả hàng'},
    {key: 'import_number', value: 'Số lượng nhập dự kiến'},
    {key: 'import_price', value: 'Giá nhập'},
    {key: 'total_price', value: 'Tổng tiền'},
    {key: 'create_at', value: 'Thời gian nhập'}
]

export const ExportSortOptions: sortOption[] = [
    {key: 'name', value: 'Tên sản phẩm'},
    {key: 'receive_number', value: 'Số lượng nhập'},
    {key: 'return_number', value: 'Số lượng trả hàng'},
    {key: 'export_number', value: 'Số lượng'},
    {key: 'import_price', value: 'Giá nhập'},
    {key: 'total_price', value: 'Tổng tiền'},
    {key: 'create_at', value: 'Thời gian xuất'}
]
export const InventorySortOptions: sortOption[] = [
    {key: 'product_variant_name', value: 'Tên sản phẩm'},
    {key: 'product_variant_code', value: 'Mã sản phẩm'},
    {key: 'quantity', value: 'Số lượng tồn'},
    {key: 'import_number', value: 'Số lượng nhập'},
    {key: 'return_number', value: 'Số lượng trả'},
    {key: 'export_number', value: 'Số lượng xuất'},

]
export const InventoryTypeOption: typeOption[] = [
    {key: 1, value: 'Tất cả sản phẩm'},
    {key: 2, value: 'Sản phẩm cụ thể'}


]
export const TypeOptions: typeOption[] = [
    {key: 1, value: 'Nhập kho'},


]
export const ViewTypeOptions: typeOption[] = [
    {key: 1, value: 'Gộp theo sản phẩm'},
    {key: 2, value: 'Mở rộng theo phiếu nhập'}


]