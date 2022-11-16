export interface OrderReturnItemResponse {
    name: string;
    image: string;
    optionProduct: string;
    quantity: number;
    price: number;
    totalPrice: number;

}

export interface OrderReturnResponse {
    id: number;
    id_user: number;
    name_user: string;
    note: string;
    id_order_purchase: number;
    createDate: Date;
    statusReturn: number;
    totalPriceReturn: number;
    totalQuantityReturn: number;
}