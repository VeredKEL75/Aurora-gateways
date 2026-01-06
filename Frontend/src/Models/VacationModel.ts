
export class VacationModel {
    public _id: string;
    public destination: string;
    public description: string;
    public startDate: Date | string; //In "edit" component it gets string
    public endDate: Date | string;
    public price: number;
    public imageUrl: string;
    public image: File;
    public userLikes: string[];
}
