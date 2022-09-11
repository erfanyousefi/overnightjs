import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { JwtToken } from "../types/public.type";
const AccessTokenSecretKey = "679D14321FDD3EACF886CE7DEE9FCCBE349397B3"
export class AuthUtils {
    public static hashPassword(password: string) :string {
        const salt: string = genSaltSync(10);
        return hashSync(password, salt);
    }
    public static comparePassword(password: string, hashedPassword: string) :boolean {
        return compareSync(password, hashedPassword)
    }
    public static generateToken(payload: JwtToken) :string {
        const now: number = new Date().getTime();
        const expiresTime: number = 1000 * 60 * 60 * 24;
        
        return sign(payload, AccessTokenSecretKey, {
            expiresIn: now + expiresTime
        })
    }
    public static decodeToken(token: string) :JwtToken {
        return verify(token, AccessTokenSecretKey) as JwtToken
    }
}
