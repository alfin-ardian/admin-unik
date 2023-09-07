import React, { useState } from "react";
import { useLogin } from "@hooks/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    useLogin(loginData)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
      <h1 className="font-bold text-2xl">Welcome, please log in</h1>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        action="#"
        onSubmit={handleSubmit}
      >
        <label className="font-semibold text-xs" htmlFor="usernameField">
          Username or Email
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <label className="font-semibold text-xs mt-3" htmlFor="passwordField">
          Password
        </label>
        <input
          className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
};
