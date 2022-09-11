import { ObjectId } from "mongoose";
import { IUser } from "./user.types";

export interface HttpError extends Error{
 status?: number
}
export type ResponseMethod = {
    statusCode: number;
    message?: string | undefined;
    data?: object | undefined
    errors?: object | undefined
}
export interface JwtToken {
    id: ObjectId,
    username: IUser['username']
}
export type FindDoc<T> = T | null | undefined