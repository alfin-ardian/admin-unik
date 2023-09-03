import React from "react";
import { LoginForm } from "@components/common/organisms/auth";

export const Login: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <LoginForm />
    </div>
  );
};
