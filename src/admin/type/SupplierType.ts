export interface ISupplier {
    key: React.Key;
    id:number,
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    isDelete: boolean;
    accountId: string;
    updateAt: string;
    createdAt: string;
    statusTransaction: boolean;
}
export type TypeSupplier = {
    id: number,
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    accountId: number;
}