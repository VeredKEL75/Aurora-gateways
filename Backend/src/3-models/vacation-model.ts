import { Document, model, ObjectId, Schema } from "mongoose";
import { appConfig } from "../2-utils/app-config";
//interface:

export interface IVacationModel extends Document {

    _id: ObjectId;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    imageName: string;
    userLikes: ObjectId[]; // Array of user IDs who liked this vacation
}

//Schema:

export const VacationSchema = new Schema<IVacationModel>({

    destination: {
        type: String,
        required: [true, "Missing destination"],
        min: [2, "Destination too short"],
        max: [50, "Destination too long"]
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        min: [1, "Description too short"],
        max: [500, "Description too long"]
    },
    startDate: { type: Date, required: [true, "Must declare start date"] },
    endDate: { type: Date, required: [true, "Must declare end date"] },
    price: { type: Number, required: [true, "Missing price"], min: [0, "Price can't be negative"], max: [100000, "Price too high"] },

    imageName: {
        type: String,
        // select: false, // Do not include imageName in the default query results 
    },
    userLikes: [{
        type: Schema.Types.ObjectId,
        default: []
    }],
}, {
    versionKey: false, //make the _v go away
    toJSON: { virtuals: true }, // Enable virtuals in JSON output
    id: false // Disable the default id field
});

VacationSchema.virtual("imageUrl").get(function () {
    // Generate the full image URL using the base URL and imageName
    return appConfig.baseImageUrl + this.imageName;
});

//Model:
export const VacationModel = model<IVacationModel>("VacationModel", VacationSchema, "vacations");
