import { IUser } from "./user.types";

declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}