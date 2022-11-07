

export interface IHistory {
    key: React.Key;
    id: number,
    total_price: number,
    total_quantity: number;
    status: number;
    type: number;
    fee_money: number;
    created_time: string;
    totalPrice: number;
}


export interface IOrderItem {
    key: React.Key;
    id: number,
    id_order: number,
    image: string,
    name: string;
    option1: string;
    option2: string;
    option3: string;
    price: number;
    total_price: number;
    quantity: number;
}

