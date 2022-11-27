
export interface IShowOrder {
    key: React.Key;
    id: number,
    account_id: number;
    account_name: string;
    address_id: string;
    phone_customer: string;
    note: string;
    total_price: number;
    total_quantity: number;
    status: number;
    type: number;
    created_time: Date;
    createDateString: string;
    code: string;
}
export interface IShowOrderItems {
    id: number;
    quantity: number;
    price: number;
    total_price: number;
    image: string;
    name: string;
    option1: string;
    option2: string;
    option3: string;
    megerOp: string;
}
