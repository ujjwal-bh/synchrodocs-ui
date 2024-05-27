import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";
import { useRegisterMutation } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [register, { isSuccess, isLoading, isError, error }] = useRegisterMutation();

  const [detail, setDetail] = useState({ username: "", password: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (detail.password !== detail.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage(""); // Clear any previous error messages
    await register({ username: detail.username, password: detail.password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      setErrorMessage(error.data ? error.data.message : "Registration failed");
    }
  }, [isError, error]);

  return (
    <>
      <Logo />
      <main className="main login-main">
        <div className="cntnr login-container">
          <h2>Create Account</h2>
          <form onSubmit={handleRegister}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="e.g randomuser123"
                value={detail.username || ""}
                onChange={(e) => setDetail({ ...detail, username: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="* * * * * * * *"
                minLength={8}
                value={detail.password || ""}
                onChange={(e) => setDetail({ ...detail, password: e.target.value })}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="* * * * * * * *"
                minLength={8}
                value={detail.confirmPassword || ""}
                onChange={(e) => setDetail({ ...detail, confirmPassword: e.target.value })}
                required
              />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
            <div className="text-gray font-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary text-bold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
