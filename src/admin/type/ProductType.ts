export interface OptionAdd {
    name: string,
    values: Array<string>
}

export interface AddProductInput {
    id?: number | null,
    code?: string | null,
    productId?: number | null
    name: string,
    description: string | null,
    wholesalePrice: number,
    salePrice: number,
    importPrice: number

}
export interface IVariant {
    id?: number | null,
    code?: string | null,
    productId?: number | null
    name: string,
    image?: string ,
    wholesalePrice: number,
    salePrice: number,
    importPrice: number


}

export interface IProductCount {
    id?: number,
    code?: string,
    name: string,
    description?: string | null,
    statusId: number | null,
    supplierId: number | null,
    accountId: number,
    createAt?: string,
    updateAt?: string,
    isDelete?: boolean,
    numberOfVariant: number,
    total: number
}
export interface IProductFilter {
    key:string,
    isDelete: boolean,
    sortBy:string|null,
    isDesc:boolean,
    page:number,
    size:number
}
export interface Product {
    id?: number,
    code?: string,
    name: string,
    description?: string | null,
    statusId: number | null,
    supplierId: number | null,
    accountId: number,
    createAt?: string,
    updateAt?: string,
    isDelete?: boolean

}