import { Document, Schema, model } from "mongoose";
import { Role } from "./enums";

export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: Role;

}

export const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String, required: true, minlength: 2, maxlength: 50,
        trim: true
    },
    lastName: {
        type: String, required: true, minlength: 2, maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"]
    },
    password: {
        type: String,
        required: [true, "Missing password"],
        minlength: [2, "password too short"],
        maxlength: [128, "password too long"]

    },
    roleId: {
        type: Number,
        required: [true, "Missing roleId"],
        enum: Role
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false, // don't add id to the already existing id
    timestamps: true
});

export const UserModel = model<IUserModel>("UserModel", UserSchema, "users");






