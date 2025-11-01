import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
function EmployeeProfile() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    department: "",
    bio: "",
    skills: "",
    avatar: null,
  });
  const [error, setError] = useState(null);
  const [responseState, setResponseState] = useState("");

  function handleChange(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }

  async function getProfile() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://127.0.0.1:8000/api/myprofile/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setInfo({
        name: response.data.employee.name,
        department: response.data.employee.department,
        bio: response.data.bio,
        skills: response.data.skills,
      });
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Session has expired login again");
        navigate("/login");
      } else setError(error.response?.data || { message: error.message });
    }
  }
  useEffect(() => {
    getProfile();
  }, []);

  async function handleForm(event) {
    event.preventDefault();

    setError(null);
    setResponseState("");
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.put(
        "http://127.0.0.1:8000/api/myprofile/",
        info,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setResponseState("Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data || { message: error.message });
      console.log(error || error);
    }
  }
  return (
    <form onSubmit={handleForm}>
      <label htmlFor="name">Name </label>
      <input
        id="name"
        type="text"
        name="name"
        value={info.name}
        onChange={handleChange}
      ></input>
      <label htmlFor="department"> Department</label>
      <input
        id="department"
        type="text"
        name="department"
        value={info.department}
        onChange={handleChange}
      ></input>
      <label htmlFor="email">Bio</label>
      <input
        id="bio"
        type="text"
        name="bio"
        value={info.bio}
        onChange={handleChange}
      ></input>
      <label htmlFor="skills">Skills</label>
      <input
        id="skills"
        type="text"
        name="skills"
        value={info.skills}
        onChange={handleChange}
      ></input>
      <label htmlFor="avatar">Skills</label>
      <input
        id="avatar"
        type="text"
        name="avatar"
        value={info.avatar}
        onChange={handleChange}
      ></input>
      <Link to={"/home/myprofile/mycourses"}>My courses</Link>
      <button type="submit">Submit</button>
      {error && (
        <p style={{ color: "red" }}>
          {error.message || error.error || String(error)}
        </p>
      )}
      {responseState && <p style={{ color: "green" }}>{responseState}</p>}
    </form>
  );
}

export default EmployeeProfile;
