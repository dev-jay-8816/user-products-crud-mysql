import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import AuthController from "@/controllers/auth.controller";

export default class AuthRoutes implements Routes {
    public path = '/auth';
    public router = Router();
    private authController = new AuthController();

    constructor(){
        //TODO Validation Schema: Joi
        this.initializeRoute();
    }

    private initializeRoute () {
        this.router.post(
            `${this.path}/register`,
            this.authController.registerUser
        );
        this.router.post(
            `${this.path}/login`,
            this.authController.loginUser
        );
    }
}