import React, { useState, useEffect, useRef } from "react";

const DisplayMenu = ({ setGrouping, setSorting }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const cardRef = useRef(null); // Reference to the card

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setSorting(e.target.value);
  };

  // Function to handle clicks outside the card
  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsCardOpen(false);
    }
  };

  // Add event listener when the card is open, remove it when closed
  useEffect(() => {
    if (isCardOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCardOpen]);

  return (
    <div className="display-menu">
      {/* Button to toggle the card */}
      <button onClick={toggleCard}>Display Options</button>

      {/* Conditionally render the card */}
      {isCardOpen && (
        <div ref={cardRef} className="display-card" style={cardStyles}>
          {/* Group by Dropdown */}
          <div>
            <label htmlFor="grouping">Grouping:</label>
            <select id="grouping" onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          {/* Order by Dropdown */}
          <div>
            <label htmlFor="ordering">Ordering:</label>
            <select id="ordering" onChange={handleOrderingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

const cardStyles = {
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  position: 'absolute',
  top: '50px',
  left: '50px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  zIndex: 1000,
};

export default DisplayMenu;
