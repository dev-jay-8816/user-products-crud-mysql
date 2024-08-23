import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import UserController from "@/controllers/user.controller";

export default class UserRoutes implements Routes {
    public path = '/user';
    public router = Router();
    private userController = new UserController();

    constructor(){
        //TODO use validation schema: joi
        this.initializeRoute();
    }

    private initializeRoute () {
        this.router.get(
            `${this.path}/get`,
            this.userController.getLoggedUserProducts
        )
    }
}