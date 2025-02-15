import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes as RouteInstance } from "react-router";
import AuthRoutes from "./AuthRoutes";
import AccountRoutes from "./AccountRoutes";
const TriangleLoader = lazy(() => import("@/components/icons/TriangleLoader"));

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
          <Route path="/account/*" element={<AccountRoutes />} />
        </RouteInstance>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
