import { Navigate, Outlet } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/api";
// apis
// components

const AuthRoutes = () => {
  const { isError, isSuccess, } =
    useGetCurrentUserQuery();

  return isSuccess && !isError ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutes;
