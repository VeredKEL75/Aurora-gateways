import express, { Request, Response, Router } from "express";
import { IUserModel, UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";


class UserController {

    public route: Router = express.Router();

    public constructor() {
        this.route.post("/api/register", this.register);
        this.route.post("/api/login", this.login)

    }

    //register as a new user:
    private async register(request: Request, response: Response) {
        const user = request.body;
        const token = await userService.register(user as IUserModel);
        response.status(StatusCode.Created).json(token);
    }

    // login for existing user:
    private async login(request: Request, response: Response) {
        const credentials = new CredentialsModel(request.body);
        const token = await userService.login(credentials);
        response.json(token);
    }
}

export const userController = new UserController();