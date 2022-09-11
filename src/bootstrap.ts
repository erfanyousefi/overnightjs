import { Server } from "@overnightjs/core";
import  * as http from "http"
import express from "express";
import cors from "cors"
import { ApiErrorHandler, NotfoundErrorHandler } from "./utils/ApiErrorHandler";
import { BlogController } from "./controllers/blog.controller";
import "./utils/mongoDBConnection"
import { AuthController } from "./controllers/auth.controller";

export class SetupServer extends Server {
    private server?: http.Server;
    constructor(private port: number = 3000){
        super()
    }
    public init(): void {
        this.setupExpress();
        this.setupControllers();
        this.setupErrorHandler()
    }
    private setupExpress(): void{
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(cors({origin: '*'}))
    }
    private setupErrorHandler(): void{
        this.app.use(NotfoundErrorHandler)
        this.app.use(ApiErrorHandler)
    }
    private setupControllers(){
        const constrollers = [
            new BlogController(),
            new AuthController()
        ]
        super.addControllers(constrollers)
    }
    public start():void {
        this.server = http.createServer(this.app);
        this.server.listen(this.port, () => {
            console.log(`Server listen on Port: http://localhost:${this.port}`)
        })
    }
}