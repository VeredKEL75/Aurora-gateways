import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { notify } from "../../../Utils/Notify";
import { vacationService } from "../../../Services/VacationService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type VacationCardProps = {
    vacation: VacationModel;
    onDelete: (_id: string) => void;
};

export function VacationCard(props: VacationCardProps) {

    const [vacation, setVacation] = useState<VacationModel>(props.vacation);
    const navigate = useNavigate()

    const user = useSelector((state: AppState) => state.user);
    //updates the likes in the ui
    const vacationFromStore = useSelector((state: AppState) =>
        state.vacations.find(v => v._id === props.vacation._id)
    );

    const userLiked = user?._id ? vacationFromStore?.userLikes.includes(user._id) : false;

    async function handleLike() {
        if (!user?._id) return;

        if (userLiked) {
            await vacationService.unlikeVacation(vacation._id);
            setVacation(prev => ({
                ...prev, userLikes: (prev.userLikes || []).filter(id => id !== user._id),
            }));
        } else {
            await vacationService.likeVacation(vacation._id);
            setVacation(prev => ({
                ...prev, userLikes: [...(prev.userLikes || []), user._id],
            }));
        }
    }

    async function handleDelete() {
        const sure = confirm("Are you sure?");
        if (!sure) return;
        try {

            await vacationService.deleteVacation(props.vacation._id);
            notify.success("Vacation deleted successfully");
            props.onDelete(props.vacation._id);
        } catch (err: any) {
            notify.error("Failed to delete vacation");
        }
    }


    return (
        <div className="VacationCard" >
            <div className="cardContent">
                <div>
                    <h1 className="destination">{props.vacation.destination}</h1>
                    <div className="dateRange">
                        <span className="card">
                            {new Date(props.vacation.startDate).toLocaleDateString("en-GB", {
                                day: "2-digit", month: "short", year: "numeric"
                            })}
                        </span>
                        <span className="card"> - </span>
                        <span className="card">
                            {new Date(props.vacation.endDate).toLocaleDateString("en-GB", {
                                day: "2-digit", month: "short", year: "numeric"
                            })}
                        </span>
                    </div>
                    <div className="information">
                        <span className="card"> {props.vacation.description}</span>
                        <span className="card">Price: {props.vacation.price} ₪</span>
                    </div>
                </div>
                {user.roleId === 2 &&
                    <div className="adminEdit">
                        <button
                            className="like-button" onClick={handleLike}>
                            {userLiked ? <FaHeart className="heart liked" /> : <FaRegHeart className="heart" />}

                            <span className="like-length">{vacation.userLikes.length}</span>
                        </button>
                    </div>
                }
                {user.roleId === 1 &&
                    <div className="adminEdit">
                        <button
                            className="admin-btn"
                            onClick={handleDelete}>
                            ❌
                        </button>
                        <button
                            className="admin-btn"
                            onClick={() => navigate("/vacations/edit/" + props.vacation._id)}
                        >
                            ✏️
                        </button>
                    </div>
                }

                <div className="cardImage">
                    <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
                </div>
            </div>

        </div >
    );

}


