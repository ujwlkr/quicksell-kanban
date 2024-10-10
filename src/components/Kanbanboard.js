import React, { useState, useEffect } from "react";
import KanbanColumn from "./KanbanColumn";
import DisplayMenu from "./DisplayMenu";
import "./Kanbanboard.css"; // CSS for styling

const Kanbanboard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [sorting, setSorting] = useState("priority"); // Sorting state
  const [users, setUsers] = useState({}); // State for users (using an object)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json();

        // Transformed users array into an object with user ID as key
        const usersObject = data.users.reduce((acc, user) => {
          acc[user.id] = user; // User id as key
          return acc;
        }, {});

        setTickets(data.tickets);
        setUsers(usersObject); // Set the transformed users object
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

    const groupByUser = (tickets) => {
      return tickets.reduce((result, ticket) => {
        (result[ticket.userId] = result[ticket.userId] || []).push(ticket);
        return result;
      }, {});
    };

    const groupByPriority = (tickets) => {
      return tickets.reduce((result, ticket) => {
        const priorityLevel = ticket.priority === 0 ? "No priority" 
                          : ticket.priority === 1 ? "Low" 
                          : ticket.priority === 2 ? "Medium" 
                          : ticket.priority === 3 ? "High" 
                          : "Urgent";
        (result[priorityLevel] = result[priorityLevel] || []).push(ticket);
        return result;
      }, {});
    };

    // If grouping is 'status', 'userId', or 'priority', use custom grouping logic
    if (grouping === 'status') {
      return groupByStatus(tickets);
    } else if (grouping === 'userId') {
      return groupByUser(tickets);
    } else if (grouping === 'priority') {
      return groupByPriority(tickets);
    }

    // Otherwise, use generic groupBy logic
    return tickets.reduce((result, ticket) => {
      (result[ticket[grouping]] = result[ticket[grouping]] || []).push(ticket);
      return result;
    }, {});
  };

  // Sorting logic
  const sortTickets = (tickets, sorting) => {
    if (sorting === "priority") {
      return [...tickets].sort((a, b) => b.priority - a.priority); // Descending order by priority
    } else if (sorting === "title") {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title)); // Ascending order by title
    }
    return tickets; // If no valid sorting criteria, return unsorted
  };

  // Group tickets first and then sort within each group
  const groupedTickets = groupTickets(tickets, grouping);

  // Apply sorting to each group of tickets
  const sortedGroupedTickets = Object.keys(groupedTickets).reduce((acc, group) => {
    acc[group] = sortTickets(groupedTickets[group], sorting);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      <DisplayMenu setGrouping={setGrouping} setSorting={setSorting} /> {/* Pass sorting setter */}
      <div className="columns">
        {Object.keys(sortedGroupedTickets).map(group => (
          <KanbanColumn 
            key={group} 
            title={group} 
            tickets={sortedGroupedTickets[group]} 
            grouping={grouping} 
            users={users} 
          />
        ))}
      </div>
    </div>
  );
};

export default Kanbanboard;
