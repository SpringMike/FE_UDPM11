
export interface IShowOrder {
    key: React.Key;
    id: number,
    account_id: number;
    account_name: string;
    address_id: string;
    note: string;
    total_price: number;
    total_quantity: number;
    status: number;
    type: number;
    created_time: Date;
    code: string;
}