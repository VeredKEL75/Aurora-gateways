import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import "./EditVacation.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notify } from "../../../Utils/Notify";
import { Button, ButtonGroup } from "@mui/material";

export function EditVacation() {
    const { register, handleSubmit, setValue, reset } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const _id = params._id!;
    const [vacation, setVacation] = useState<VacationModel | null>(null);
    const [startDate, setStartDate] = useState<string>("");


    useEffect(() => {
        vacationService.getVacation(_id)
            .then(dbVacation => {
                setVacation(dbVacation);
                //so the date could prefill with the right format
                const formattedStart = new Date(dbVacation.startDate).toISOString().split("T")[0];
                const formattedEnd = new Date(dbVacation.endDate).toISOString().split("T")[0];

                // Prefill inputs using react-hook-form setValue
                setValue("destination", dbVacation.destination);
                setValue("description", dbVacation.description);
                setValue("startDate", formattedStart);
                setValue("endDate", formattedEnd);
                setValue("price", dbVacation.price);
            })
            .catch(err => notify.error(err));
    }, [_id, setValue]);
    // resets the rest of the values too
    function handleClear() {
        reset({
            destination: "",
            description: "",
            price: 0,
        });
    }


    async function send(data: VacationModel) {
        try {
            data._id = _id;

            // If image selected, take first file
            if (data.image && (data.image as unknown as FileList).length > 0) {
                data.image = (data.image as unknown as FileList)[0];
            }

            await vacationService.updateVacation(data);
            notify.success("Vacation has been updated.");
            navigate("/vacations/");
        } catch (err: any) {
            notify.error(err);
        }
    }

    if (!vacation) return <p>Loading...</p>;

    return (
        <div className="EditVacation">
            <h1>{vacation.destination}</h1>
            <form onSubmit={handleSubmit(send)}>
                <label>Destination:</label>
                <input
                    type="text"
                    {...register("destination", { required: true, minLength: 1, maxLength: 50 })}
                    defaultValue={vacation.destination}
                />

                <label>Departure date:</label>
                <input
                    type="date"
                    {...register("startDate", { required: true })}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <label>Returning date:</label>
                <input
                    type="date"
                    {...register("endDate", { required: true })}
                    min={startDate}
                />

                <label>Price:</label>
                <input
                    type="number"
                    {...register("price", { required: true, min: "0", max: "10000" })}
                    defaultValue={vacation.price}
                />

                <label>Description:</label>
                <input
                    type="text"
                    {...register("description", { required: true })}
                    defaultValue={vacation.description}
                />

                <label>Image:</label>
                <input type="file" {...register("image")} />

                <ButtonGroup fullWidth >
                    <Button type="submit">Update</Button>
                    {/* Makes the button rounded despite the default of the ButtonGroup */}
                    <Button sx={{ borderRadius: "5px !important" }} onClick={handleClear}>Clear</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}
