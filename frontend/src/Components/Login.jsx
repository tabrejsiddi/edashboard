import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    console.log(email, password);
    let result = await fetch(`https://edashboard-1-4k64.onrender.com/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };
  return (
    <div className="login">
      {/* Wrapping the inputs in a form to trigger the password save pop-up */}
      <h2>Login </h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="inputBox"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="inputBox"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button onClick={handleLogin} className="appButton" type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
