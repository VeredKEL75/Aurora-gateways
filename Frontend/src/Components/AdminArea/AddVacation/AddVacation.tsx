import { useForm } from "react-hook-form";
import "./AddVacation.css";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

export function AddVacation() {
    useTitle("Add Vacation");

    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<string>("");
    const today = new Date().toISOString().split("T")[0];


    async function send(vacation: VacationModel) {
        try {

            vacation.image = (vacation.image as unknown as FileList)[0];
            await vacationService.addVacation(vacation);
            notify.success("Vacation has been added.");
            navigate("/vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <h1>Add a Vacation</h1>

            <div className="EditVacation">
                <form onSubmit={handleSubmit(send)}>
                    <label>Destination:</label>
                    <input
                        type="text"
                        {...register("destination", { required: true, minLength: 1, maxLength: 50 })}

                    />

                    <label>Departure date:</label>
                    <input
                        type="date"
                        {...register("startDate", { required: true })}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={today}
                    />

                    <label>Returning date:</label>
                    <input
                        type="date"
                        {...register("endDate", { required: true })}
                        //blocks the user from choosing endDate before startDate
                        disabled={!startDate}
                        min={startDate || today}

                    />

                    <label>Price:</label>
                    <input
                        type="number"
                        {...register("price", { required: true, min: "0", max: "10000" })}

                    />

                    <label>Description:</label>
                    <input
                        type="text"
                        {...register("description", { required: true })}
                    />

                    <label>Image:</label>
                    <input type="file" {...register("image")} />

                    <ButtonGroup fullWidth>
                        <Button type="submit">Send</Button>
                        <Button sx={{ borderRadius: "5px !important" }} type="reset">Clear</Button>
                    </ButtonGroup>
                </form>
            </div>

        </div>
    );
}
