import cors from "cors";
import express, { Express } from "express";
import { appConfig } from "./2-utils/app-config";
import { errorMiddleware } from "./6-middleware/error-middleware";
import mongoose, { mongo, Mongoose } from "mongoose";
import { vacationController } from "./5-controllers/vacation-controller";
import fileUpload from "express-fileupload";
import { userController } from "./5-controllers/user-controller";


class App {

    public server: Express; // Make server public for the testing.

    public async start(): Promise<void> {
        await mongoose.connect(appConfig.mongoDbConnectionString);

        // Create the server: 
        this.server = express();


        this.server.use(fileUpload()); // Enable file uploads

        this.server.use(cors()); // Enabling CORS for any frontend address.

        // Tell express to create a request.body object from the body json:
        this.server.use(express.json());

        // Connect controllers to the server:

        this.server.use(userController.route);

        this.server.use(vacationController.router);

        // Register route not found middleware: 
        this.server.use(errorMiddleware.routeNotFound);

        // Register catch-all middleware: 
        this.server.use(errorMiddleware.catchAll);

        this.server.listen(appConfig.port, "0.0.0.0", () => console.log("Listening on http://localhost:" + appConfig.port));
    }

}

export const app = new App(); // export app for the testing.
app.start();

