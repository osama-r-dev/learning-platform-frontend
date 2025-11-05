import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import "./EmployeeProfile.css";

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
  const [isOpen, setIsOpen] = useState(true);

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
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Session has expired. Please log in again.");
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
      await axios.put("http://127.0.0.1:8000/api/myprofile/", info, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setResponseState("Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data || { message: error.message });
    }
  }

  return (
    <div className="profile-container">
      <button className="drawer-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </button>

      <aside className={`profile-drawer ${isOpen ? "open" : "closed"}`}>
        <h2>My Profile</h2>
        <div className="profile-avatar">
          <img src={"./fakeavatar.jpg"} alt="Profile avatar" />
        </div>

        <div className="employee-profile-form">
          <form onSubmit={handleForm}>
            <label htmlFor="avatar">Avatar URL</label>
            <input
              id="avatar"
              type="text"
              name="avatar"
              value={info.avatar || ""}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={info.name}
              onChange={handleChange}
            />

            <label htmlFor="department">Department</label>
            <input
              id="department"
              type="text"
              name="department"
              value={info.department}
              onChange={handleChange}
            />

            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              type="text"
              name="bio"
              value={info.bio}
              onChange={handleChange}
            />

            <label htmlFor="skills">Skills</label>
            <input
              id="skills"
              type="text"
              name="skills"
              value={info.skills}
              onChange={handleChange}
            />

            <button type="submit">Update</button>
            <Link to="/home/myprofile/mycourses" className="my-courses">
              My Courses
            </Link>

            {error && (
              <p className="error">
                {error.message || error.error || String(error)}
              </p>
            )}
            {responseState && <p className="success">{responseState}</p>}
          </form>
          <Link className="log-out" to={"/"}>
            Log out{" "}
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default EmployeeProfile;
