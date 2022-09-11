
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { AuthUtils } from "../utils/AuthUtils";
import { IUser } from "../types/user.types";
import { isJWT } from "class-validator";
declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
} 

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const authorization: string | undefined = req?.headers?.authorization
        if(authorization) {
            const [bearer, token] = authorization.split(" ")
            if(bearer.toLowerCase() !== "bearer")throw {status: 401, message: "authorization token incorrect"};
            if(!isJWT(token))throw {status: 401, message: "token incorrect"};
            const {username, id: _id} = AuthUtils.decodeToken(token as string);
            if(!username || ! _id) throw {status: 401, message: "Unauthorization"}
            const user = await UserModel.findOne({username});
            if(!user) throw {status: 401, message: "Unauthorization"};
            req.user = user
            next()
        }
        else throw {status: 401, message: "Unauthorization"}
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}