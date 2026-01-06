import express, { Request, Response } from "express";
import { vacationService } from "../4-services/vacation-service";
import { VacationModel } from "../3-models/vacation-model";
import { StatusCode } from "../3-models/enums";
import { UploadedFile } from "express-fileupload"; // Importing UploadedFile type for image handling
import { fileSaver } from "uploaded-file-saver";
import { IUserModel } from "../3-models/user-model";
import jwt from "jsonwebtoken";
import { securityMiddleware } from "../6-middleware/securityMiddleware";

class VacationController {

    public readonly router = express.Router();

    //getting vacations through id, but like/unlike only if login but making changes only if admin

    public constructor() {
        this.router.get("/api/vacations", this.getAllVacations);
        this.router.get("/api/vacations/:_id", securityMiddleware.verifyToken, this.getOneVacation);
        this.router.post("/api/vacations", securityMiddleware.verifyAdmin, this.addVacation);
        this.router.put("/api/vacations/:_id", securityMiddleware.verifyAdmin, this.updateVacation);
        this.router.delete("/api/vacations/:_id", securityMiddleware.verifyAdmin, this.deleteVacation);
        this.router.get("/api/vacations/images/:imageName", this.getImage);
        this.router.patch("/api/like-vacations/:_id", securityMiddleware.verifyToken, this.likeVacation);
        this.router.patch("/api/unlike-vacations/:_id", securityMiddleware.verifyToken, this.unlikeVacation);
    }

    private async getAllVacations(request: Request, response: Response) {
        const vacations = await vacationService.getAllVacations();
        response.json(vacations);
    }
    private async getOneVacation(request: Request, response: Response) {
        const _id = request.params._id;
        const vacation = await vacationService.getOneVacation(_id);
        response.json(vacation);
    }
    private async addVacation(request: Request, response: Response) {
        const vacation = new VacationModel(request.body);
        const dbVacation = await vacationService.addVacation(vacation, request.files?.image as UploadedFile);
        response.status(StatusCode.Created).json(dbVacation)
    }

    private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName;
        const imagePath = fileSaver.getFilePath(imageName);
        response.sendFile(imagePath);
    }

    private async updateVacation(request: Request, response: Response) {
        request.body.image = request.files?.image; // Assuming the image is uploaded and stored in the request file
        request.body._id = request.params._id;
        const vacation = new VacationModel(request.body);
        const dbVacation = await vacationService.updateVacation(vacation, request.files?.image as UploadedFile);
        response.json(dbVacation);
    }

    private async deleteVacation(request: Request, response: Response) {
        const _id = request.params._id;
        await vacationService.deleteVacation(_id);
        response.sendStatus(StatusCode.NoContent);
    }


    private async likeVacation(request: Request, response: Response) {
        const _id = request.params._id;
        const token = request.headers.authorization.substring(7);
        const container = jwt.decode(token) as { user: IUserModel };
        const userId = container.user._id as string;
        const dbVacation = await vacationService.likeVacation(_id, userId);
        response.json(dbVacation);
    }
    private async unlikeVacation(request: Request, response: Response) {
        const _id = request.params._id;
        const token = request.headers.authorization.substring(7);
        const container = jwt.decode(token) as { user: IUserModel };
        const userId = container.user._id as string;
        const dbVacation = await vacationService.unlikeVacation(_id, userId);
        response.json(dbVacation);
    }

}

export const vacationController = new VacationController();
