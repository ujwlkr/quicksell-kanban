import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import DisplayMenu from "./DisplayMenu";
import "./Kanbanboard.css"; // Add your CSS for styling

const Kanbanboard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sorting, setSorting] = useState("priority");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then(response => response.json())
      .then(data => setTickets(data.tickets));
  }, []);

  useEffect(() => {
    const savedGrouping = localStorage.getItem("grouping");
    const savedSorting = localStorage.getItem("sorting");

    if (savedGrouping) setGrouping(savedGrouping);
    if (savedSorting) setSorting(savedSorting);
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);

  const groupTickets = (tickets, grouping) => {
    const groupByStatus = (tickets) => {
      const result = {
        Backlog: [],
        Todo: [],
        "In progress": [],
        Done: [],
        Cancelled: []
      };
  
      tickets.forEach((ticket) => {
        if (result[ticket.status]) {
          result[ticket.status].push(ticket);
        }
      });
  
      return result;
    };
  
    const groupBy = (tickets, key) => {
      return tickets.reduce((result, ticket) => {
        (result[ticket[key]] = result[ticket[key]] || []).push(ticket);
        return result;
      }, {});
    };
  
    // If grouping is 'status', use custom grouping logic
    if (grouping === 'status') {
      return groupByStatus(tickets);
    }
  
    // Otherwise, use the generic groupBy logic
    return groupBy(tickets, grouping);
  };
  

  const groupedTickets = groupTickets(tickets, grouping);
  console.log("suihdfuifh", tickets);

  return (
    <div className="kanban-board">
      <DisplayMenu setGrouping={setGrouping} />
      <div className="columns">
        {Object.keys(groupedTickets).map(group => (
          <KanbanColumn key={group} title={group} tickets={groupedTickets[group]} grouping={grouping} />
        ))}
        
      </div>
    </div>
  );
};

export default Kanbanboard;
