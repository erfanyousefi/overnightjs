
// export interface RegisterDTO {
//     username: string;
//     fullname: string;
//     password: string;
// }

import { Expose } from "class-transformer";
import { IsDefined, Matches,  } from "class-validator";

export class RegisterDTO {
    @IsDefined()
    @Expose()
    @Matches(RegExp(/[A-Za-z0-9\_\.]{5,20}/))
    username: string;
    @IsDefined()
    @Expose()
    password: string; 
    @IsDefined()
    @Expose()
    @Matches(RegExp(/[\w\s]{5,35}/))
    fullname: string;
}
export class LoginDTO {
    @IsDefined()
    @Expose()
    @Matches(RegExp(/[A-Za-z0-9\_\.]{5,20}/))
    username: string;
    @IsDefined()
    @Expose()
    password: string; 
}