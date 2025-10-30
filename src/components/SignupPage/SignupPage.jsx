import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function SignupPage() {
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
    } catch (error) {
      setError(error.response?.data || { message: error.message });
      console.log(error || error);
    }
  }
  function handleChange(event) {
    setInfo({ ...info, [event.target.name]: event.target.value });
  }
  return (
    <form onSubmit={handleForm}>
      <label htmlFor="usename">Username </label>
      <input
        id="username"
        type="username"
        name="username"
        value={info.username}
        onChange={handleChange}
      ></input>
      <label htmlFor="password"> Password</label>
      <input
        id="password"
        type="password"
        name="password"
        value={info.password}
        onChange={handleChange}
      ></input>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={info.email}
        onChange={handleChange}
      ></input>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={info.name}
        onChange={handleChange}
      ></input>
      <label htmlFor="department">Department</label>
      <input
        id="department"
        type="text"
        name="department"
        value={info.department}
        onChange={handleChange}
      ></input>
      {error && (
        <p style={{ color: "red" }}>
          {error.message || error.error || String(error)}
        </p>
      )}
      {responseState && <p style={{ color: "green" }}>{responseState}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
export default SignupPage;
