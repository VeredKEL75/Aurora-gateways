import "./Statistics.css";
import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components for bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Statistics() {
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Fetch all vacations on component mount
    useEffect(() => {
        vacationService.getAllVacations()
            .then(setVacations)
            .catch(err => console.error(err));
    }, []);

    // Prepare data for chart + design
    const chartData = {
        labels: vacations.map(v => v.destination),
        datasets: [
            {
                label: "Likes",
                data: vacations.map(v => v.userLikes.length),
                backgroundColor: "rgba(255, 99, 132, 0.6)"
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Vacation Likes Statistics",
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1, // Force increments of 1
                    callback: function (value: any) {
                        return Number.isInteger(value) ? value : null; // Show only integers
                    },
                },
            },
        },
    };

    // Function to download vacation statistics as CSV
    const downloadCSV = () => {
        let csv = "Destination,Likes\n";
        vacations.forEach(v => {
            csv += `${v.destination},${v.userLikes.length}\n`;
        });
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "vacation_likes.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="statistics-container">
            <Bar data={chartData} options={options} />
            <button onClick={downloadCSV} className="download-btn">
                Download CSV
            </button>
        </div>
    );
}
