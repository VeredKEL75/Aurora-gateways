import { cyber } from "../2-utils/cyber";
import { ValidationError, AuthorizationError } from "../3-models/client-error";
import { CredentialsModel } from "../3-models/credentials-model";
import { Role } from "../3-models/enums";
import { IUserModel, UserModel } from "../3-models/user-model";


class UserService {

    public async register(user: IUserModel): Promise<string> {

        //Validation  
        const taken = await UserModel.findOne({ email: user.email }).exec();;
        if (taken) throw new ValidationError(`Email is taken`);

        //Defining role and hashing password
        user.roleId = Role.User;
        user.password = cyber.hash(user.password);
        //Creating new user and generating token
        const newUser = await UserModel.create(user);
        const token = cyber.generateToken(newUser);
        return token;

    }

    public async login(credentials: CredentialsModel): Promise<string> {

        credentials.password = cyber.hash(credentials.password); //Hashing password
        const user = await UserModel.findOne({ email: credentials.email, password: credentials.password }).exec();
        if (!user) throw new AuthorizationError("Incorrect email or password");
        const token = cyber.generateToken(user);

        return token;

    }


}

export const userService = new UserService();
