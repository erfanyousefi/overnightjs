import { validateSync } from "class-validator";
import { BlogModel } from "../models/blog.model";
import { FindDoc } from "../types/public.type";
import { errorHandler } from "../utils/ApiErrorHandler";
import { BlogIdDto, CreateBlogDto } from "../dtos/blog.dto";
import { IBlog } from "../types/blog.type"
export class BlogService {
    async create(blogDto: CreateBlogDto): Promise<IBlog>{
        const errors = validateSync(blogDto);
        const checkedErrors = errorHandler(errors);
        if(checkedErrors.length > 0) throw {status: 400, errors: checkedErrors, message: "validation Error"}
        const blog: IBlog = await BlogModel.create(blogDto)
        return blog
    }
    async fetchAll(): Promise<IBlog[]>{
        const blogs: IBlog[] = await BlogModel.find({});
        return blogs
    }
    async fetchByID(blogId: BlogIdDto): Promise<FindDoc<IBlog>>{
        const blog: FindDoc<IBlog> = await BlogModel.findById(blogId.id)
        console.log(blog);
        
        if(!blog) throw {status: 404, message: "notFound Blog"}
        return blog
    }
    async removeByID(blogId: BlogIdDto): Promise<string>{
        const blog: FindDoc<IBlog>= await this.fetchByID(blogId);
        const deleteResult: any = await BlogModel.deleteOne({_id: blogId.id})
        if(deleteResult.deletedCount > 0) return "deleted blog successfuly";
        return "error: cannot remove blog"
    }
}