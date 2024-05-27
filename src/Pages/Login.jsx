import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";
import { useLoginMutation } from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [login, { isSuccess }] = useLoginMutation();

  const [detail, setDetail] = useState({username: "", password: ""})


  const handleLogin =  async (e) => {
    e.preventDefault()
    await login(detail)
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <>
      <Logo />

      <main className="main login-main">
        <div className="cntnr login-container">
          <h2>Login to Continue</h2>
          <form>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="enter your username" value={detail.username} onChange={(e)=> setDetail({...detail, username: e.target.value})} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                placeholder="enter your password"
                minLength={8}
                value={detail.password}
                onChange={(e)=> setDetail({...detail, password: e.target.value})}
              />
            </div>
            <button type="submit" onClick={handleLogin}>Login</button>
            <div className="text-gray font-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary text-bold">
                Register
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
