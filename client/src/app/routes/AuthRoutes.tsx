import TriangleLoader from "@/components/icons/TriangleLoader";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../auth/SignIn";

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
        <Route path="/" element={<SignIn />} />
        <Route path="sign-up" element={<div></div>} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
