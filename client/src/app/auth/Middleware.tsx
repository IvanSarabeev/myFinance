import React from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Middleware Route for handling User Authentication Process
 */
const AuthMiddleware: React.FC = observer(() => {
  const { authStore } = useStore();
  const location = useLocation();

  return authStore.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
});

export default AuthMiddleware;
