import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

const TriangleLoader = lazy(() => import("@/components/icons/TriangleLoader"));
const Register = lazy(() => import("../auth/Register"));
const Login = lazy(() => import("../auth/Login"));
const ForgottenPassword = lazy(() => import("../auth/ForgottenPassword"));
const Page404 = lazy(() => import("../auth/Page404"));

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
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgotten-password" element={<ForgottenPassword />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
