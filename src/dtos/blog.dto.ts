import { Expose } from "class-transformer";
import { IsDefined, Matches } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateBlogDto{
    @IsDefined()
    @Expose()
    title: string;
    @IsDefined()
    @Expose()
    text: string;
    @IsDefined()
    @Expose()
    author: string
}
export class BlogIdDto{
    @Matches(RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i))
    id: ObjectId
}