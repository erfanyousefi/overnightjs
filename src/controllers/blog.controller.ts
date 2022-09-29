import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { Controller, Delete, Post, Get, ClassMiddleware } from "@overnightjs/core";
import { FindDoc } from "../types/public.type";
import { BlogIdDto, CreateBlogDto } from "../dtos/blog.dto";
import { BlogService } from "../services/blog.service";
import { IBlog } from "../types/blog.type";
import { AuthMiddleware } from "../middlewares/authMiddleware";

@Controller("blog")
@ClassMiddleware(AuthMiddleware)
export class BlogController {
    private blogService: BlogService = new BlogService()
    @Post()
    async createBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const blogDto: CreateBlogDto = plainToClass(CreateBlogDto, req.body);
            const blog: IBlog = await this.blogService.create(blogDto);
            return res.status(201).json({
                statusCode: 201,
                message: "created",
                data: { blog }
            })
        } catch (error) {
            next(error)
        }
    }
    @Get()
    async GetAllBlogs(req: Request, res: Response, next: NextFunction) {
        try {
            const blogs: IBlog[] = await this.blogService.fetchAll();
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blogs
                }
            })
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }
    @Get("find/:id")
    async GetBlogByID(req: Request, res: Response, next: NextFunction) {
        try {
            const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params)
            const blog: FindDoc<IBlog> = await this.blogService.fetchByID(blogDto);
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blog
                }
            })
        } catch (error) {
            next(error)
        }
    }
    @Delete("delete/:id")
    async RemoveBlogByID(req: Request, res: Response, next: NextFunction) {
        try {
            const blogDto: BlogIdDto = plainToClass(BlogIdDto, req.params)
            const message: string = await this.blogService.removeByID(blogDto);
            return res.status(200).json({
                statusCode: 200,
                message
            })
        } catch (error) {
            next(error)
        }
    }
}