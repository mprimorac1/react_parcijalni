import React from "react";
import PropTypes from "prop-types";

const UserProfile = ({ user, repos }) => {
  return (
    <div id="profil">
      <div>
        <img src={user.avatar_url} alt="Profilna slika" />
      </div>
      <div>
        <h2>{user.name}</h2>
        <p id="lokacija">Lokacija: {user.location}</p>
        <p id="detalji">Detalji: {user.bio}</p>
      </div>
      <div>
        <h3>Repozitoriji:</h3>
        <ul>
          {repos && repos.map((repo) => <li key={repo.id}>{repo.name}</li>)}
        </ul>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default UserProfile;
