import React from "react";

const DisplayMenu = ({ setGrouping }) => {
  return (
    <div className="display-menu">
      <label htmlFor="grouping">Group by:</label>
      <select id="grouping" onChange={(e) => setGrouping(e.target.value)}>
        <option value="status">Status</option>
        <option value="userId">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default DisplayMenu;
