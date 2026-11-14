import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
function Profile() {
  const [profile, setProfile] = useState({});
  const { profile_Id } = useParams();
  async function getMyProfile() {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `http://127.0.0.1:8000/api/profiles/${profile_Id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setProfile(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    getMyProfile();
  }, []);
  return <div>Hi this is the Profile component!</div>;
}

export default Profile;
