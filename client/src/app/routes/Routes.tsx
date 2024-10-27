import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes as RouteInstance,
} from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import TriangleLoader from "@/components/icons/TriangleLoader";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <TriangleLoader
            height={250}
            width={250}
            customCss="h-screen flexCenter max-container"
          />
        }
      >
        <RouteInstance>
          <Route path="/*" element={<AuthRoutes />} />
        </RouteInstance>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
