"use client";

import "@/app/globals.css";
import { useState } from "react";
import { apiRegister } from "@/app/lib/api-request";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [requestLoading, setRequestLoading] = useState(false);
  const [isChecked, setCheck] = useState(false);
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorResponse, setErrorResponse] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegister((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRegisterButton = async () => {
    setRequestLoading((prev) => (prev = true));
    try {
      const user = await apiRegister(JSON.stringify(register));
      Cookies.set("authsession", user.data.access_token);

      return router.push("/");
    } catch (error) {
      const err = JSON.parse(error.message);
      setErrorResponse((prev) => {
        return {
          ...prev,
          username: err.username ?? "",
          email: err.email ?? "",
          password: err.password ?? "",
        };
      });
    } finally {
      setRequestLoading((prev) => (prev = false));
    }
  };

  return (
    <div>
      <main className="w-screen h-screen flex justify-center items-center">
        <div className="w-[25rem] h-max border-[0.5px] border-slate-300 shadow-lg rounded-lg py-10">
          <header className="w-full text-center">
            <h1 className="mt-6 text-xl font-semibold text-slate-600">
              Daftar Sekarang
            </h1>
            <span className="text-sm text-slate-500">
              Already have an account?{" "}
              <a className="text-[#00f445]" href="">
                Login
              </a>
            </span>
          </header>
          <div className="w-full px-8 mt-6 text-slate-500">
            <label className="w-full block" htmlFor="">
              <span className="text-sm">Username</span>
              <input
                autoComplete="off"
                onChange={handleRegisterChange}
                type="text"
                name="username"
                className={`w-full h-[2.5rem] border-[0.5px] border-slate-400 rounded-lg my-2 focus:outline-none px-3 placeholder:text-sm ${
                  errorResponse.username !== "" ? "border-pink-600" : ""
                }`}
                placeholder="Example : Allen Rashford"
              />
              {errorResponse.username !== "" ? (
                <span className=" text-sm mb-3 block text-pink-700">
                  {errorResponse.username}
                </span>
              ) : (
                ""
              )}
            </label>
            <label className="w-full block" htmlFor="">
              <span className="text-sm">Email :</span>
              <input
                autoComplete="off"
                onChange={handleRegisterChange}
                type="email"
                name="email"
                className={`w-full h-[2.5rem] border-[0.5px] border-slate-400 rounded-lg my-2 focus:outline-none px-3 placeholder:text-sm ${
                  errorResponse.email !== "" ? "border-pink-600" : ""
                }`}
                placeholder="Example : email@fucommerce.com"
              />
              {errorResponse.email !== "" ? (
                <span className=" text-sm block mb-3 text-pink-700">
                  {errorResponse.email}
                </span>
              ) : (
                ""
              )}
            </label>
            <label className="w-full block" htmlFor="">
              <span className="text-sm">Password</span>
              <input
                autoComplete="off"
                onChange={handleRegisterChange}
                type="password"
                name="password"
                className={`w-full h-[2.5rem] border-[0.5px] border-slate-400 rounded-lg my-2 focus:outline-none px-3 placeholder:text-sm ${
                  errorResponse.password !== "" ? "border-pink-600" : ""
                }`}
              />
              {errorResponse.password !== "" ? (
                <span className=" text-sm block text-pink-700 mb-3">
                  {errorResponse.password}
                </span>
              ) : (
                ""
              )}
            </label>

            <label className="flex w-full h-max items-center text-center justify-center gap-2 mt-3">
              <input
                autoComplete="off"
                onClick={(e) =>
                  e.currentTarget.checked ? setCheck(true) : false
                }
                type="checkbox"
                className="w-[1.5rem] h-[1.5rem]"
              />
              <span className="text-sm">
                Dengan mencentang ini, kamu menyetujui{" "}
                <a className="text-[#00f445]" href="">
                  Syarat dan Ketentuan
                </a>{" "}
                kami.
              </span>
            </label>
            {isChecked === true ? (
              <button
                onClick={handleRegisterButton}
                className={`w-full h-[3rem] mt-3 bg-[#00f445] text-white rounded-xl hover:bg-[#2ec85a] transition-all disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-slate-500 font-semibold flex justify-center items-center`}
              >
                {requestLoading ? (
                  <span className="block w-[1.5rem] h-[1.5rem] border-[4px] border-slate-200 border-t-[4px] border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Register</span>
                )}
              </button>
            ) : (
              <button
                onClick={handleRegisterButton}
                className={`w-full h-[3rem] mt-3 bg-[#00f445] text-white rounded-xl hover:bg-[#2ec85a] transition-all disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-slate-500 font-semibold flex justify-center items-center`}
                disabled
              >
                {requestLoading ? (
                  <span className="block w-[1.5rem] h-[1.5rem] border-[4px] border-slate-200 border-t-[4px] border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Register</span>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
