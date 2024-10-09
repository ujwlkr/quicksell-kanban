import React from "react";
import "./ticketcard.css";

const TicketCard = ({ ticket }) => {
  console.log(ticket);
  return (
    
    <div className="ticket-card">
       <div className="ticket-id">{ticket.id}</div> 
      <div className="ticket-title">{
        ticket.title.length > 60 ? ticket.title.slice(0, 57) + "..." : ticket.title
      }</div>
      
        {ticket.tag.map((tag) => (
          <div className="tags">{tag}</div>
        ))}
      
      {/* <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Assigned to:</strong> {ticket.userId}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p> */}
    </div>
  );
};

export default TicketCard;
