import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="">
      <button
        className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}
