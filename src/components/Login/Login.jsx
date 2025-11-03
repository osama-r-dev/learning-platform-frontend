import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [responseState, setResponseState] = useState("");
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  async function handleForm(event) {
    event.preventDefault();
    try {
      setError(null);
      setResponseState("");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        info
      );
      setResponseState("success");
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      navigate("/home");
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Invalid user name or password");
      } else setError("something went wrong");
      return;
    }
  }

  function handleChange(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }
  return (
    <div class="login-container">
      <form className="login-form" onSubmit={handleForm}>
        <label className="login-label" htmlFor="usename">
          Username{" "}
        </label>
        <input
          className="login-input"
          id="username"
          type="text"
          name="username"
          value={info.username}
          onChange={handleChange}
        ></input>
        <label htmlFor="password" className="login-label">
          {" "}
          Password
        </label>
        <input
          className="login-input"
          id="password"
          type="password"
          name="password"
          value={info.password}
          onChange={handleChange}
        ></input>
        <button className="login-submit-button" type="submit">
          Submit
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {responseState && <p style={{ color: "green" }}>{responseState}</p>}
      </form>
    </div>
  );
}
export default Login;
