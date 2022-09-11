import { validateSync, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/public.type";

export function ApiErrorHandler(error: HttpError,req: Request, res: Response, next: NextFunction){
    const errorCode: number = error?.status || 500;
    const message: string = error?.message || "InternalServerError";
    res.status(errorCode).json({
        ...error,
        status: errorCode,
        message,
    })
}
export function NotfoundErrorHandler(req: Request, res: Response, next: NextFunction){
    const errorCode: number = 404;
    const message: string = "NotFoundPage";
    res.status(errorCode).json({
        status: errorCode,
        message
    })
}


export function errorHandler(dto: any) {
    const errors: ValidationError[] = validateSync(dto)
    let errorTexts: any[] = []
    for (const errorItem of errors) {
        errorTexts = errorTexts.concat(errorItem.constraints)
    }
    if (errorTexts.length > 0) throw { status: 400, errors: errorTexts, message: "validation Error" }
    return errorTexts
}