import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

const Navbar = () => {
    const [fileData, setFileData] = useState([]);

    const headers = [{ label: "All Tasks", key: "task" }];

    const loadData = () => {
        const raw = localStorage.getItem("Task");
        if (!raw) return [];

        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                const cleaned = parsed.map((item) =>
                    String(item).replace(/\[/g, "").replace(/\]/g, "").replace(/\\/g, "").replace(/"/g, "")
                );
                return cleaned.map((task) => ({ task }));
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
        return [];
    };

    // Initialize data on mount
    useEffect(() => {
        setFileData(loadData());
    }, []);

    // On export click, update fileData to latest before triggering CSV generation
    const handleExportClick = () => {
        const latestData = loadData();
        setFileData(latestData);
    };

    return (
        <nav className="navbar">
            <p>WorkQueue - Task Manager</p>
            <ul>
                <CSVLink
                    data={fileData}
                    headers={headers}
                    filename="Notes.csv"
                    onClick={handleExportClick}
                >
                    <li className="bi bi-upload export">
                    </li>
                </CSVLink>
                <li className="bi bi-info-circle-fill about">
                    <div className="aboutText">
                        This project was developed by VictorF313/Sharique, using React.js.
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
