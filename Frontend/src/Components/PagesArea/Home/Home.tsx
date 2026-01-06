import { useSelector } from "react-redux";
import { useTitle } from "../../../Utils/UseTitle";
import "./Home.css";
import { AppState } from "../../../Redux/Store";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";

export function Home() {
    useTitle("Home");
    const navigate = useNavigate()

    const user = useSelector<AppState, UserModel>(state => state.user);
    function toStatistics() {
        navigate("/statistics");

    }
    function toVacations() {
        navigate("/vacations");

    }
    return (
        <div className="Home">

            {/* if you are Admin you can navigate to edit and statistics */}
            {user?.roleId === 1 ? (
                <div className="coverWrapper">
                    <h1>Welcome admin</h1>
                    <button onClick={toStatistics}>Check statistics here</button>
                    <button onClick={toVacations}>Edit vacations here</button>
                </div>
            ) : (<>
                <div className="coverWrapper">
                    <h1>Welcome to your next vacation</h1>
                </div>
            </>
            )}



        </div>
    );
}
