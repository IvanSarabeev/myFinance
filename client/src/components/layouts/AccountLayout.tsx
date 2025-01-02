import React from "react";
import { Outlet } from "react-router-dom";

const AccountLayout: React.FC = () => {
  return (
    <main className="bg-orange-600">
      <Outlet />
      <h2>hello</h2>
    </main>
  );
};

export default AccountLayout;
