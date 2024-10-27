import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AuthRoutes: React.FC = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="sign-up" element={<div></div>} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
