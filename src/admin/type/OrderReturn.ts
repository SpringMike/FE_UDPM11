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
    account_id: number;
    account_name: string;
    note: string;
    id_order_purchase: number;
    createDate: Date;
    statusReturn: number;
    totalPriceReturn: number;
    totalQuantityReturn: number;
}