import { Document } from "mongoose";

export interface IUser extends Document {
    fullname: string;
    username: string;
    password: string;
    accessToken?: string;
    email?: string;
    mobile?:string;
    avatar?: string;
}