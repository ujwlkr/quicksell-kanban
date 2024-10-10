import React from "react";
import TicketCard from "./TicketCard";
import "./kanbancolumn.css";
import ImgLowPriority from '../assets/icons_FEtask/ImgLowPriority.svg';
import ImgMediumPriority from '../assets/icons_FEtask/ImgMediumPriority.svg';
import ImgHighPriority from '../assets/icons_FEtask/ImgHighPriority.svg';
import Nopriority from '../assets/icons_FEtask/Nopriority.svg';
import SVGUrgentPrioritycolour from '../assets/icons_FEtask/SVGUrgentPrioritycolour.svg';

const icons = {
    Done: <i className="fa-solid fa-circle-check" style={{ color: "purple" }}></i>,
    Cancelled: <i className="fa-solid fa-circle-xmark" style={{ color: "gray" }}></i>,
    "In progress": <i className="fa-solid fa-circle-half-stroke" style={{ color: "gold" }}></i>,
    Todo: <i className="fa-regular fa-circle"></i>,
    Backlog: <i className="fa-regular fa-clock"></i>,
};

const priority = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
};

const priorityIcons = {
    "No priority": Nopriority,
    Low: ImgLowPriority,
    Medium: ImgMediumPriority,
    High: ImgHighPriority,
    Urgent: SVGUrgentPrioritycolour
};

// Icons for users
const userIcons = {
    "usr-1": "👨‍💻", // User-1
    "usr-2": "👩‍💻", // User-2
    "usr-3": "👨‍🔧", // User-3
    "usr-4": "👨‍🔧", // User-4
    "usr-5": "👨‍🔧" // User-5
};

const KanbanColumn = ({ title, tickets, grouping, users }) => {
    return (
        <div className="kanban-column">
            <div className="column-header">
                {/* Conditionally render icons based on grouping */}
                {grouping === "priority" && (
                    <img src={priorityIcons[title]} alt={title} className="priority-icon" /> // Render priority icon
                )}
                {grouping === "status" && icons[title]}
                {grouping === "userId" && userIcons[title]}

                <div className="column-title">
                    {grouping === "priority" && title} {/* Display the priority title */}
                    {grouping === "status" && title}
                    {grouping === "userId" && (users[title]?.name || "Unknown User")} {/* Display user name */}
                </div>
                <div className="column-length"> {tickets.length}</div>
            </div>
            <div className="tickets">
                {tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </div>
    );
};

export default KanbanColumn;
