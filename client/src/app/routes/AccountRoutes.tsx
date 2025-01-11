import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const TriangleLoader = lazy(() => import("@/components/icons/TriangleLoader"));
const Middleware = lazy(() => import("@/app/auth/Middleware"));
const AccountLayout = lazy(() => import("@/components/layouts/AccountLayout"));
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));

const AccountRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <TriangleLoader
          height={200}
          width={200}
          customCss="h-screen flexCenter mx-auto"
        />
      }
    >
      <Routes>
        <Route element={<Middleware />}>
          <Route path="/dashboard" element={<AccountLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AccountRoutes;
