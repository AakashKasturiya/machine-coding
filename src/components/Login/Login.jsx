// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {useAuth} from "../../context/LoginAuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials!");
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded w-80"
      >
        <h2 className="text-xl mb-4 font-bold">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
