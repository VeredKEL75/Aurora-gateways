import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { UserModel } from "../../../Models/UserModel";

export function Menu() {
    const user = useSelector<AppState, UserModel>(state => state.user);


    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>


            {user && <> <span> | </span>

                <NavLink to="/vacations">Our Vacations</NavLink>
            </>}



            {user && user.roleId === 1 && <> <span> | </span>
                <NavLink to="/new">New</NavLink>
                <span> | </span>

                <NavLink to="/statistics">Statistics</NavLink></>}
        </div>
    );
}
