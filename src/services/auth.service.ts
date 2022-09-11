import { validateSync } from "class-validator";
import { UserModel } from "../models/user.model";
import { AuthUtils } from "../utils/AuthUtils";
import { IUser } from "../types/user.types";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto"
import { errorHandler } from "../utils/ApiErrorHandler";
export class AuthService {
    async register(userDto: RegisterDTO): Promise<IUser> {
        errorHandler(userDto)
        const existUser = await UserModel.findOne({ username: userDto.username });
        if (existUser) throw { status: 400, message: "this username already exist" }
        const newPassword = AuthUtils.hashPassword(userDto.password)
        userDto.password = newPassword
        const user: IUser = await UserModel.create(userDto)
        return user
    }
    async login(loginDto: LoginDTO): Promise<IUser> {
        errorHandler(loginDto)
        const {username, password} = loginDto;
        const existUser: IUser | null = await UserModel.findOne({ username });
        if (!existUser) throw { status: 401, message: "the username or password is incorrect" }
        const isTrueUser: boolean = AuthUtils.comparePassword(password, existUser.password)
        if (!isTrueUser) throw { status: 401, message: "the username or password is incorrect" }
        const token = AuthUtils.generateToken({ username, id: existUser._id });
        existUser.accessToken = token;
        await existUser.save()
        return existUser
    }
}