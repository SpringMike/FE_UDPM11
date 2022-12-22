export interface IStaff {
    key: React.Key;
    id:number,
    code: string;
    full_name: string;
    email: string;
    address: string;
    phone: string;
    username: string;
    gender: Boolean;
    _delete: boolean;
    update_at: string;
    create_at: string;
    statusAccount: boolean;
    role_id: Number;
    roleId: Number;
    id_account: number;
    accountId:Number;

}


export interface IStaff2 {
    key: React.Key;
    id:number,
    code: string;
    fullName: string;
    email: string;
    address: string;
    phone: string;
    gender: Boolean;
}
export type TypeStaff = {
    id: number,
    code: string;
    name: string;
    email: string;
    address: string;
    username: string;
    gender: Boolean;
    dob: string;
    phone: string;
    roleId: Number;
    accountId:Number;
    statusAccount: boolean;

}


export interface ILoginData {
    username: string;
    password: string;
}
export interface IRoleLable {
    employee?: string;
    admin?: string;
}
export interface IRole {
    key?: React.Key;
    id: number;
    name: string;
    description: string;
}