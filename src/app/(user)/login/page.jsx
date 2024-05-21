"use client";

import { apiLogin } from "@/app/lib/api-request";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [requestLoading, setRequestLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loginErrorMessage, setLoginErrorMessage] = useState({
    email: "",
    password: "",
    user: "",
  });

  const handleLogin = (event) => {
    const { name, value } = event.target;
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const loginButton = async () => {
    setRequestLoading(true);
    try {
      const user = await apiLogin(JSON.stringify(loginForm));
      Cookies.set("authsession", user.data.access_token);
      return router.push("/");
    } catch (error) {
      const err = error.message;
      setLoginErrorMessage((prev) => {
        return {
          ...prev,
          email: err.email ?? "",
          password: err.password ?? "",
          user: err.user ?? "",
        };
      });
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-[28rem] h-max border-[0.5px] border-slate-300 shadow-lg rounded-xl px-3 py-10">
        <header className="w-full text-center">
          <h1 className="mt-6 text-xl font-semibold text-slate-600">
            Daftar Sekarang
          </h1>
          <span className="text-sm text-slate-500">
            Not have an account?{" "}
            <a className="text-[#00f445]" href="/register">
              Register
            </a>
          </span>
        </header>
        <div className="w-full px-8 mt-6 text-slate-500">
          <label className="w-full block" htmlFor="">
            <span className="text-sm">Email</span>
            <input
              name="email"
              onChange={handleLogin}
              type="text"
              className={`w-full h-[2.5rem] border-[0.5px] rounded-lg my-2 focus:outline-none focus:border-[#00f445] px-3 placeholder:text-sm ${
                loginErrorMessage.email !== ""
                  ? "border-pink-600"
                  : "border-slate-300"
              }`}
            />
            {loginErrorMessage !== "" ? (
              <span className=" text-sm text-pink-700">
                {loginErrorMessage.email}
              </span>
            ) : (
              ""
            )}
          </label>
          <label className="w-full block" htmlFor="">
            <span className="text-sm">Password</span>
            <input
              name="password"
              onChange={handleLogin}
              type="password"
              className={`w-full h-[2.5rem] border-[0.5px] rounded-lg my-2 focus:outline-none focus:border-[#00f445] px-3 placeholder:text-sm ${
                loginErrorMessage.password !== ""
                  ? "border-pink-600"
                  : "border-slate-300"
              } `}
            />
            {loginErrorMessage.password !== "" ? (
              <span className="text-sm text-pink-700">
                {loginErrorMessage.password}
              </span>
            ) : (
              ""
            )}
          </label>
          {loginErrorMessage.user !== "" ? (
            <span className="flex items-center justify-center w-full h-max bg-pink-300 my-3 text-pink-800 rounded-lg text-sm px-5 py-3 text-center">
              {loginErrorMessage.user}
            </span>
          ) : (
            ""
          )}
          <span className="block text-[#00f445] mt-2 mb-5 text-sm text-start">
            <a href="">Lupa Sandi?</a>
          </span>
          <button
            onClick={loginButton}
            className="w-full h-[3rem] flex justify-center items-center mt-3 bg-[#00f445] text-white rounded-xl hover:bg-[#2ec85a] transition-all"
          >
            {requestLoading ? (
              <span className="block w-[1.5rem] h-[1.5rem] border-[4px] border-slate-200 border-t-[4px] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>Login</span>
            )}
          </button>
          <span className="block text-[#00f445] mt-5 text-sm text-end">
            <a href="">Need a Help?</a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Login;
