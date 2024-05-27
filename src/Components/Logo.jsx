import React, { useEffect, useState } from "react";
import UserImg from "../assets/placeholder.jpg";
import { useLogoutMutation } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate()

  const [logout, {isSuccess}] = useLogoutMutation()

  const handleLogout = async  () => {
    await logout()
  }

  useEffect(()=> {
    if(isSuccess){
      navigate("/login")
    }
  },[isSuccess])
  return (
    <header className="header">
      <div className="logo">SynchroDocs</div>

      <div className="user" onClick={()=> setActive(prev => !prev)}>
        <img src={UserImg} alt="user" />
      </div>
      <div className={`absolute ${!active ? "inactive" : "active"}`}>
        <div className="user-expand">
          <img src={UserImg} alt="user" />
        </div>
        <div className="absolute-title">Ujjwal Bhattarai</div>
        <div className="menu-items">
          <div className="menu-item">View Profile</div>

          <div className="menu-item" onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </header>
  );
}
