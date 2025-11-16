// src/pages/Profile.js
import React from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();

  return (
    <div>
      <h2>User Profile: {id}</h2>
      <p>Here you can show user's posts, followers, etc.</p>
    </div>
  );
}

export default Profile;
