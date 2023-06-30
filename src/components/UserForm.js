import React, { useState } from "react";
import PropTypes from "prop-types";

const UserForm = ({ handleUserSubmit }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

UserForm.propTypes = {
  handleUserSubmit: PropTypes.func.isRequired,
};

export default UserForm;
