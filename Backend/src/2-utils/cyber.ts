import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { appConfig } from "./app-config";
import crypto from "crypto";
import { IUserModel } from "../3-models/user-model";
import { Role } from "../3-models/enums";

class Cyber {
    public hash(plainText: string): string {

        //hash with "salt"
        const hashText = crypto.createHmac("sha512", appConfig.hashSaltKey).update(plainText).digest("hex");
        return hashText;
    }

    public generateToken(user: IUserModel): string {
        //creating container for the user:
        const container = { user };

        //create options:
        const options: SignOptions = { expiresIn: "3h" }; // 3h is 3 hours, m is minutes ect.

        //remove password from container:
        delete (user as any).password;

        //generate token:
        const token = jwt.sign(container, appConfig.jwtSecretKey, options);

        return token;
    }

    //verify token
    public verifyToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecretKey)
            return true
        }
        catch (err: any) {
            return false;
        }
    }

    //verify that you are admin
    public verifyAdmin(token: string): boolean {
        try {
            //if no token
            if (!token) return false;
            //verify token validity 
            jwt.verify(token, appConfig.jwtSecretKey);
            //Extract container from the token 
            const container = jwt.decode(token) as { user: IUserModel };
            //Extract user from container
            const user = container.user;
            //if admin return true, if not return false
            return user.roleId === Role.Admin;
        }
        catch (err: any) {
            return false;
        }
    }


}

export const cyber = new Cyber();