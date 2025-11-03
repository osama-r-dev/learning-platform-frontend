import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SignupPage.css";
import { Navigate, useNavigate } from "react-router";
function SignupPage() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    department: "",
  });
  const [error, setError] = useState(null);
  const [responseState, setResponseState] = useState("");
  async function handleForm(event) {
    event.preventDefault();

    setError(null);
    setResponseState("");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        info
      );
      console.log(response);
      setResponseState(response.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || { message: error.message });
      console.log(error || error);
    }
  }
  function handleChange(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleForm}>
        <label className="signup-label" htmlFor="username">
          Username
        </label>
        <input
          className="signup-input"
          id="username"
          type="text"
          name="username"
          value={info.username}
          onChange={handleChange}
        />

        <label className="signup-label" htmlFor="password">
          Password
        </label>
        <input
          className="signup-input"
          id="password"
          type="password"
          name="password"
          value={info.password}
          onChange={handleChange}
        />

        <label className="signup-label" htmlFor="email">
          Email
        </label>
        <input
          className="signup-input"
          id="email"
          type="email"
          name="email"
          value={info.email}
          onChange={handleChange}
        />

        <label className="signup-label" htmlFor="name">
          Name
        </label>
        <input
          className="signup-input"
          id="name"
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
        />

        <label className="signup-label" htmlFor="department">
          Department
        </label>
        <input
          className="signup-input"
          id="department"
          type="text"
          name="department"
          value={info.department}
          onChange={handleChange}
        />

        {error && (
          <p style={{ color: "red" }}>
            {error.message || error.error || String(error)}
          </p>
        )}
        {responseState && <p style={{ color: "green" }}>{responseState}</p>}

        <button className="signup-submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default SignupPage;
