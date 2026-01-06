import { useEffect, useState } from "react";
import { useTitle } from "../../../Utils/UseTitle";
import { VacationCard } from "../VacationCard/VacationCard";
import "./VacationList.css";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";

export function VacationList() {
    useTitle("Vacations");

    const user = useSelector<AppState, UserModel>(state => state.user);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate();
    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);


    const [currentPage, setCurrentPage] = useState(1);
    const vacationsPerPage = 9; // show 9 vacations per page


    function handleDeleteFromList(_id: string) {
        setVacations(prev => prev.filter(v => v._id !== _id));
    }
    //Sorting the vacations from earliest to latest
    function sortByStartDateAscending(vacations: VacationModel[]) {
        return [...vacations].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }


    useEffect(() => {
        if (!user) {
            notify.error("Please log in")
            navigate("/login");
            return;
        }
        vacationService.getAllVacations()
            .then(dbVacations => {
                const sorted = sortByStartDateAscending(dbVacations);
                setVacations(sorted);
                setFilteredVacations(sorted);
            })
            .catch(err => notify.error(err));
    }, []);
    // Calculate pagination
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation);
    //number of pages rounded up based on vacations number
    const totalPages = Math.ceil(filteredVacations.length / vacationsPerPage);

    function getAll() {
        setFilteredVacations(sortByStartDateAscending(vacations));
        setCurrentPage(1);

    }
    function getLiked() {
        const liked = vacations.filter(v => v.userLikes?.includes(user._id));
        setFilteredVacations(sortByStartDateAscending(liked));
        setCurrentPage(1);
    }
    function getActive() {
        const now = new Date;
        const active = vacations.filter(v => new Date(v.endDate) >= now);
        setFilteredVacations(sortByStartDateAscending(active));
        setCurrentPage(1);
    }
    function getFuture() {
        const now = new Date;
        const future = vacations.filter(v => new Date(v.startDate) > now);
        setFilteredVacations(sortByStartDateAscending(future));
        setCurrentPage(1);
    }


    return (
        <div>
            {user.roleId === 2 &&
                <div className="FilterButtons">
                    <button onClick={getAll}>Show All</button>
                    <button onClick={getLiked}>Liked vacations</button>
                    <button onClick={getActive}>Active vacations</button>
                    <button onClick={getFuture}>Upcoming</button>
                </div>
            }
            <div className="VacationList">
                {currentVacations.map(v => (
                    <VacationCard key={v._id} vacation={v} onDelete={handleDeleteFromList} />
                ))}
            </div>

            {/* arrow appears forward if there are more pages */}

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;&lt;</button>
                )}

                {totalPages > 1 && ([...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}>
                        {i + 1}
                    </button>

                )))
                }
                {/* arrow appears backwards if there are previous pages */}
                {currentPage < totalPages && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;&gt;</button>
                )}
            </div>
        </div>
    );
}


