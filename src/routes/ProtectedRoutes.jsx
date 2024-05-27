import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "../services/api";

// api

// component

const ProtectedRoutes = () => {
  const location = useLocation();
  
  const { isError, isSuccess, isLoading,isFetching } = useGetCurrentUserQuery()

  return (
      <main>
        {(isSuccess && !isError) ? <Outlet /> : <Navigate to="/login" />}
      </main>
  );
};

export default ProtectedRoutes;
