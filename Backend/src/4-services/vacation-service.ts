import { ResourceNotFound, ValidationError } from "../3-models/client-error";
import { IVacationModel, VacationModel } from "../3-models/vacation-model";
import { UploadedFile } from "express-fileupload"; // Importing UploadedFile type for image handling
import { fileSaver } from "uploaded-file-saver";

class VacationService {
    //working with Mongodb:
    public async getAllVacations(): Promise<IVacationModel[]> {
        return VacationModel.find().exec();
    }

    public async getOneVacation(_id: string): Promise<IVacationModel> {
        const vacation = await VacationModel.findById(_id.trim()).exec();
        if (!vacation) throw new ResourceNotFound(_id);
        return vacation;
    }

    public async addVacation(vacation: IVacationModel, image?: UploadedFile): Promise<IVacationModel> {
        const error = vacation.validateSync(); // Validate the vacation data before saving
        if (error) throw new ValidationError(error.message);
        if (image) vacation.imageName = await fileSaver.add(image);
        return vacation.save();
    }
    private async getImageName(_id: string): Promise<string | null> {
        const dbVacation = await this.getOneVacation(_id);
        return dbVacation?.imageName;
    }

    public async updateVacation(vacation: IVacationModel, image: UploadedFile): Promise<IVacationModel> {
        const error = vacation.validateSync(); // Validate the vacation data before saving
        if (error) throw new ValidationError(error.message);

        if (image) {
            const oldImageName = await this.getImageName(vacation._id.toString());
            vacation.imageName = await fileSaver.update(oldImageName!, image)
        }
        const dbVacation = await VacationModel.findByIdAndUpdate(vacation._id, vacation, { returnOriginal: false }).exec()//return dbVacation
        if (!dbVacation) throw new ResourceNotFound(vacation._id.toString());
        return dbVacation;
    }

    public async deleteVacation(_id: string): Promise<void> {
        const oldImageName = await this.getImageName(_id);
        const dbVacation = await VacationModel.findByIdAndDelete(_id.trim(), { returnOriginal: false }).exec();
        if (!dbVacation) throw new ResourceNotFound(dbVacation._id.toString());
        await fileSaver.delete(oldImageName!);

    }

    public async likeVacation(_id: string, userId: string): Promise<IVacationModel> {
        const dbVacation = await VacationModel.findByIdAndUpdate(_id, { $addToSet: { userLikes: userId } }, { returnOriginal: false }).exec()//add to vacation
        if (!dbVacation) throw new ResourceNotFound(_id.toString());
        return dbVacation;
    }
    public async unlikeVacation(_id: string, userId: string) {
        const dbVacation = await VacationModel.findByIdAndUpdate(_id, { $pull: { userLikes: userId } }, { returnOriginal: false }).exec()//remove from vacation
        if (!dbVacation) throw new ResourceNotFound(_id.toString());
        return dbVacation;
    }
}

export const vacationService = new VacationService();
