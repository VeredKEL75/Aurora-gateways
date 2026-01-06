import { NextFunction, Request, Response } from "express"
import { cyber } from "../2-utils/cyber";
import { ForbiddenError } from "../3-models/client-error";
import striptags from "striptags";

class SecurityMiddleware {
    public verifyToken(request: Request, response: Response, next: NextFunction): void {

        //from inspector in the frontend, taking the token "Bearer token...."
        const token = request.headers.authorization?.substring(7);
        //if not logged in 
        if (!cyber.verifyToken(token!)) {
            const err = new ForbiddenError("Please login")
            next(err);
            return;
        }
        //if logged in 
        next();

    }
    public verifyAdmin(request: Request, response: Response, next: NextFunction): void {

        //from inspector in the frontend, taking the token "Bearer token...."
        const token = request.headers.authorization?.substring(7);

        //if not logged in 
        if (!cyber.verifyAdmin(token!)) {
            const err = new ForbiddenError("You have no authority to do that");
            next(err);
            return;
        }
        next();

    }
    public preventAttack(request: Request, response: Response, next: NextFunction): void {

        for (const prop in request.body) {
            const value = request.body[prop];

            if (typeof value === "string") {
                //prevent sql injection
                request.body[prop] = striptags(value);
                //prevent xss attack
                request.body[prop] = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
        }
        next();

    }

    public verifyUser(request: Request, response: Response, next: NextFunction): void {
        const token = request.headers.authorization?.substring(7);
        if (!cyber.verifyAdmin(token!)) {
            const err = new ForbiddenError("This action is only available by user")
            next(err);
            return;
        }
        next();
    }
}

export const securityMiddleware = new SecurityMiddleware();