import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <>
      <div className="w-full text-center flex bg-primary-bg  justify-center">

        <button
          onClick={handleLogout}
          className="logout my-3 w-250">
          Logout
        </button>
      </div>
    </>
  );
};

export default LogOut;
