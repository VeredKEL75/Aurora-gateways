import { useSelector } from "react-redux";
import "./UserMenu.css";
import { type AppState } from "../../../Redux/Store";
import type { UserModel } from "../../../Models/UserModel";
import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";

export function UserMenu() {

    const user = useSelector<AppState, UserModel>(state => state.user);
    const navigate = useNavigate();

    function logout(): void {
        const sure = confirm("Are you sure you want to go?")
        if (!sure) return
        userService.logout();
        notify.success("bye bye");
        navigate("/home");
    }

    return (
        <div className="UserMenu">

            {!user?._id && <div>
                <span>Hello Guest | </span>
                <NavLink className="logout-btn" to="/register">Register</NavLink>
                <span> | </span>
                <NavLink className="logout-btn" to="/Login">Login</NavLink>
            </div>}

            {user?._id && <div>
                <span> Hello {user.firstName} {user.lastName} | </span>
                <button className="logout-btn" onClick={logout}>Log out</button>
            </div>
            }
        </div>
    );
}
