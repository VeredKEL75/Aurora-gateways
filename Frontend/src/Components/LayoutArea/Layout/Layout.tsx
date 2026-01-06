import { useDispatch } from "react-redux";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userSlice } from "../../../Redux/UserSlice";
import { jwtDecode } from "jwt-decode";
import { notify } from "../../../Utils/Notify";

export function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //handling logging out (UI wise) when token is expired
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            //check if token is dated 
            const decoded: any = jwtDecode(token);
            const now = Date.now() / 1000;

            if (decoded.exp < now) {
                // if token expired logout and nav to login component
                localStorage.removeItem("token");
                dispatch(userSlice.actions.logoutUser());
                notify.error("You are logged out, please login")
                navigate("/login");
            }
        }
    })
    return (
        <div className="Layout">
            <aside>
                <Menu />
            </aside>

            <header>
                <Header />
            </header>
            <main>
                <Routing />
            </main>
        </div>
    );
}
