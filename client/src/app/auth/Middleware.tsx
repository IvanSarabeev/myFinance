import React from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Middleware Route for handling User Authentication Process
 */
const AuthMiddleware: React.FC = observer(() => {
  const { sessionStore } = useStore();
  const location = useLocation();

  return sessionStore.isAuthenticated || sessionStore.token !== "" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} />
  );
});

export default AuthMiddleware;
