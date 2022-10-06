export interface IStaff {
    key: React.Key;
    id:number,
    code: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    username: string;
    password: string;
    gender: Boolean;
    dob: string;
    isDelete: boolean;
    updateAt: string;
    createdAt: string;
    created_by: string;
    modify_by: string;
    statusAccount: boolean;
    roleId: Number;
    accountId:Number;
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