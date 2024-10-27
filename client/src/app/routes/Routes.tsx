import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes as RouteInstance,
} from "react-router-dom";
import AuthRoutes from "./AuthRoutes";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <RouteInstance>
          <Route path="/*" element={<AuthRoutes />} />
        </RouteInstance>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
