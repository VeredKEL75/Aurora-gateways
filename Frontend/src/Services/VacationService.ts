import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { store } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";
import { vacationSlice } from "../Redux/VacationSlice";

class VacationService {


    //get all vacations from global state
    public async getAllVacations(): Promise<VacationModel[]> {

        if (store.getState().vacations.length > 0) return store.getState().vacations;
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);
        const vacations = response.data;
        store.dispatch(vacationSlice.actions.initVacation(vacations))
        return vacations;
    };

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation._id, vacation, options);

        const dbVacation = response.data;

        store.dispatch(vacationSlice.actions.updateVacation(dbVacation));

        console.log(dbVacation);
    };


    public async getVacation(_id: string): Promise<VacationModel> {
        //if product exists in global state bring it from there 
        const vacation = store.getState().vacations.find(v => v._id === _id)
        if (vacation) return vacation;

        //else go to server fetch it 
        const response = await axios.get<VacationModel>(appConfig.vacationsUrl + _id);

        const dbVacation = response.data;

        //save added product also in the global state 
        return dbVacation;
    };

    public async addVacation(vacation: VacationModel): Promise<void> {

        const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, vacation, options);

        const dbVacation = response.data;

        store.dispatch(vacationSlice.actions.addVacation(dbVacation));

        console.log(dbVacation);


    };

    public async deleteVacation(_id: string): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + _id);
        store.dispatch(vacationSlice.actions.deleteVacation(_id));
    };


    public async likeVacation(vacationId: string) {
        const response = await axios.patch<VacationModel>(
            `${appConfig.likeUrl}${vacationId}`,
            {},
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
        );

        const updatedVacation = response.data;
        store.dispatch(vacationSlice.actions.updateVacation(updatedVacation));
    };



    public async unlikeVacation(vacationId: string) {
        const response = await axios.patch<VacationModel>(
            `${appConfig.unlikeUrl}${vacationId}`,
            {},
            {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
        );

        const updatedVacation = response.data;
        store.dispatch(vacationSlice.actions.updateVacation(updatedVacation));
    };

};

export const vacationService = new VacationService();

