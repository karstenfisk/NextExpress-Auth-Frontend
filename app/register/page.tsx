"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import instance from "../../instance";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passCheck, setPassCheck] = useState("");
  const [remember, setRemember] = useState(false);
  const [passError, setPassError] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (password: string) => {
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;

    const hasSpecialChar = specialCharsRegex.test(password);
    const isAtLeast8Long = password.length >= 8;
    const hasUppercase = uppercaseRegex.test(password);

    return hasSpecialChar && isAtLeast8Long && hasUppercase;
  };
  // Checks if email provided is valid
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const register = async (data: RegisterData) => {
    try {
      const response = await instance.post("/auth/register", data);
      return response.data;
    } catch (err: any) {
      // Handle errors
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        console.log("Error signing in");
      }
      return;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: RegisterData = {
      username: username,
      email: email,
      password: password,
    };
    if (!validateEmail(email)) {
      setInvalidEmail(true);
      setTimeout(() => {
        setInvalidEmail(false);
      }, 3000);
      return;
    }
    if (!validatePassword(password)) {
      setInvalidPass(true);
      setTimeout(() => {
        setInvalidPass(false);
      }, 3000);
      return;
    }
    if (password !== passCheck) {
      setPassError(true);
      setTimeout(() => {
        setPassError(false);
      }, 3000);
      return;
    }
    const val = await register(data);

    if (val?.username) {
      signIn("credentials", {
        username: val?.username,
        password,
        callbackUrl: "/",
      });
    }
  };

  return (
    <div className="relative flex flex-col pt-24 overflow-hidden">
      <div className="w-100 p-6 m-auto bg-gray-50 rounded-md shadow-lg lg:max-w-xl">
        <h1 className="text-3xl text-center  font-bold">Sign up</h1>
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              placeholder="jsmith@email.com"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              placeholder="jsmith"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Verify Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={passCheck}
              onChange={(e) => setPassCheck(e.target.value)}
            />
            {error.length > 0 ? (
              <p className="text-red-600 text-xs mt-1" style={{ height: 32 }}>
                {error}
              </p>
            ) : invalidPass ? (
              <p className="text-red-600 text-xs mt-1" style={{ height: 32 }}>
                Invalid password.
              </p>
            ) : passError ? (
              <p className="text-red-600 text-xs mt-1" style={{ height: 32 }}>
                Passwords do not match.
              </p>
            ) : invalidEmail ? (
              <p className="text-red-600 text-xs mt-1 " style={{ height: 32 }}>
                Invalid Email address.
              </p>
            ) : (
              <p className="text-primary text-xs mt-1">
                Password must contain: 1 uppercase letter,<br></br> 1 special
                character, and 8 characters long.
              </p>
            )}
          </div>
          <div className="mt-6">
            <button className="w-96 mx-auto px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-sky-600 focus:outline-none focus:bg-gray-600">
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <button
            onClick={() => signIn()}
            className="font-medium text-gray-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
