"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { apiDeleteSession } from "../lib/api-request";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SellerLayout = ({ children }) => {
  const router = useRouter();
  const [logoutRequest, setLogoutRequest] = useState(false);

  const logoutHandler = async () => {
    setLogoutRequest(true);
    const token = Cookies.get("authsession");
    try {
      await apiDeleteSession(token);
      Cookies.remove("authsession");
      return router.push("/login");
    } catch (error) {
      console.log(JSON.parse(error.message));
    } finally {
      setLogoutRequest(false);
    }
  };
  return (
    <>
      <div className="relative w-screen h-max flex text-black">
        <section className="fixed w-[15%] h-screen shadow-md px-5 py-8 flex justify-start items-center flex-col">
          <header>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[#00f445] to-[#00a12e] bg-clip-text text-transparent">
              FuCommerce{" "}
              <span className="text-slate-600 font-normal">Seller</span>
            </h1>
          </header>
          <nav className="mt-5">
            <ul className="[&>*]:my-5 [&>*]:block text-slate-500">
              <a href="/seller/dashboard" className="hover:text-slate-700">
                <li>
                  <ion-icon name="bar-chart-outline"></ion-icon>{" "}
                  <span className="ml-2">Dashboard</span>
                </li>
              </a>
              <a
                href="/seller/products/list?page=1"
                className="hover:text-slate-700"
              >
                <li>
                  <ion-icon name="cube-outline"></ion-icon>{" "}
                  <span className="ml-2">Products</span>
                </li>
              </a>
              <a href="/seller/products/add" className="hover:text-slate-700">
                <li>
                  <ion-icon name="add-circle-outline"></ion-icon>{" "}
                  <span className="ml-2">Add Product</span>
                </li>
              </a>
              <a href="/seller/orders" className="hover:text-slate-700">
                <li>
                  <ion-icon name="cart-outline"></ion-icon>{" "}
                  <span className="ml-2">Orders</span>
                </li>
              </a>
              <a href="/seller/chats" className="hover:text-slate-700">
                <li>
                  <ion-icon name="chatbubble-ellipses-outline"></ion-icon>{" "}
                  <span className="ml-2">Chats</span>
                </li>
              </a>
            </ul>
          </nav>
        </section>
        <section className="absolute w-[85%] h-max left-[15%] bg-slate-100">
          <nav className=" w-full h-max shadow-sm px-6 py-4 flex justify-between items-center bg-white">
            <div className="relative w-[20rem] h-[2.5rem]">
              <input
                type="text"
                autoComplete="off"
                placeholder="Search..."
                className="absolute w-full h-full border-[1.5px] border-slate-300 px-3 rounded-lg outline-none bg-transparent text-slate-400"
              />
            </div>
            <div className="relative">
              <div className="flex items-center gap-8">
                <div className="relative w-max h-max after:content-[''] after:absolute after:w-[12px] after:h-[12px] after:rounded-full after:bg-pink-600 after:right-1">
                  <button className="bg-transparent w-[2rem] h-[2rem] border-none text-3xl">
                    <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                  </button>
                </div>
                <div className="relative w-max h-max after:content-[''] after:absolute after:w-[12px] after:h-[12px] after:rounded-full after:bg-pink-600 after:right-1">
                  <button className="bg-transparent w-[2rem] h-[2rem] border-none text-3xl">
                    <ion-icon name="notifications-outline"></ion-icon>
                  </button>
                </div>
                <a href="" className="flex items-center gap-2">
                  <Image
                    width="80"
                    height="80"
                    className="bg-center rounded-full w-[50px] h-[50px]"
                    src="/images/company-album-4.jpg"
                    alt="image"
                    style={{ width: 50, height: 50 }}
                    priority
                  />
                  <span className="text-slate-500">jiaddzikri_14</span>
                </a>
                <button
                  onClick={logoutHandler}
                  className="w-[8rem] h-[2.5rem] bg-red-500 font-bold text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
          <main className="w-full min-h-screen overflow-y-auto px-5 py-4">
            {children}
          </main>
        </section>
      </div>
    </>
  );
};
export default SellerLayout;
