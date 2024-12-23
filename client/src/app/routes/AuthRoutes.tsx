import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const TriangleLoader = lazy(() => import("@/components/icons/TriangleLoader"));
const Register = lazy(() => import("../auth/Register"));

const AuthRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <TriangleLoader
          height={100}
          width={100}
          customCss="h-screen flexCenter mx-auto"
        />
      }
    >
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="sign-up" element={<div></div>} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
