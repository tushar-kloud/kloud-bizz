import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const token = userInfo && userInfo.accessToken;
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

// export const AdminRoutes = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const { userInfo } = useSelector((state) => state.userLogin);
//   if (userInfo && userInfo.role == "admin") {
//     setIsAdmin(true);
//   }
//   return isAdmin ? <Outlet /> : <Navigate to="/signin" />;
// };
