import {Schema, model} from "mongoose"
import { IUser } from "../types/user.types"
const UserSchema = new Schema<IUser>({
    fullname: {type: String, required: true, trim: true},
    username: {type: String, required: true, trim: true},
    password: {type: String, required: true},
    accessToken: {type: String},
    email: {type: String},
    mobile: {type: String},
})
export const UserModel = model<IUser>('user', UserSchema)