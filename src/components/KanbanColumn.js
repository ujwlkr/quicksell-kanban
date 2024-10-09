import React, { useState } from "react";
import TicketCard from "./TicketCard";
import "./kanbancolumn.css";
import { MdSignalCellular4Bar } from "react-icons/md";


const icons = {
    Done: <i class="fa-solid fa-circle-check" style={{"color": "purple"}}></i>,
    Cancelled: <i class="fa-solid fa-circle-xmark" style={{"color": "gray"}}></i>,
    "In progress" : <i class="fa-solid fa-circle-half-stroke" style={{"color": "gold"}}></i>,
    Todo : <i class="fa-regular fa-circle"></i>,
    Backlog: <i class="fa-regular fa-clock"></i>,
    3: <MdSignalCellular4Bar />
}

const priority = {
    0: "No priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
}


const KanbanColumn = ({ title, tickets, grouping }) => {
   console.log(grouping)
  return (
    <div className="kanban-column">
      <div className="column-header">
      {icons[title]}
        <div className="column-title"> {grouping === "priority" ? priority[title]: title}</div>
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
