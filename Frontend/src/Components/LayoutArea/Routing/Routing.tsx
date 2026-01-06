import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../PagesArea/Home/Home";
import { Page404 } from "../Page404/Page404";
import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/register";
import { AddVacation } from "../../AdminArea/AddVacation/AddVacation";
import { EditVacation } from "../../VacationArea/EditVacation/EditVacation";
import { Statistics } from "../../AdminArea/Statistics/Statistics";

export function Routing() {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/home" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/vacations" element={<VacationList />} />

                <Route path="/vacations/edit/:_id" element={<EditVacation />} />

                <Route path="/statistics" element={<Statistics />} />

                <Route path="/new" element={<AddVacation />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
