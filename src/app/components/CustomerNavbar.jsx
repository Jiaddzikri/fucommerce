"use client";

import Link from "next/link";
import { apiDeleteSession, apiGetCarts } from "../lib/api-request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCookie } from "../helper/getCookie";

const CustomerNavbar = ({ user }) => {
  const router = useRouter();
  const moneyFormat = new Intl.NumberFormat();

  const [carts, setCarts] = useState({
    isLoading: false,
    message: "",
    data: [],
    length: 0,
  });

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    setCarts((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      const response = await apiGetCarts(getCookie("authsession"));
      setCarts((prev) => {
        return {
          ...prev,
          message: response.message,
          data: response.data,
          length: response.length,
        };
      });
    } catch (error) {
      setCarts((prev) => {
        return {
          ...prev,
          message: error.message,
          data: null,
        };
      });
    } finally {
      setCarts((prev) => {
        return {
          ...prev,
          isLoading: false,
        };
      });
    }
  };

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      await apiDeleteSession(token);
      Cookies.remove("authsession");
      return router.push("/");
    } catch (error) {
      return false;
    }
  };

  return (
    <nav className="fixed top-0 w-screen flex z-[9999] bg-white h-[4.5rem] border-b-[1px] border-slate-300 ">
      <div className="w-[20%] py-4 px-12 text-center">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00f445] to-[#00a12e] bg-clip-text text-transparent">
            FuCommerce
          </h1>
        </Link>
      </div>
      <div className="relative flex items-center justify-between  w-[40%] text-lg font-regular text-slate-600">
        <input
          className=" w-[90%] h-[2.5rem] border-[1px] border-slate-300 px-3 rounded-tl-lg rounded-bl-lg outline-none"
          type="text"
          placeholder="Search..."
        />
        <button className="w-[10%] h-[2.5rem] flex justify-center items-center bg-[#00f445] rounded-tr-lg rounded-br-lg text-white">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>
      <div className="relative w-[40%] flex justify-center items-center">
        <div className="w-[40%] flex justify-center items-center gap-2 text-3xl">
          {/* Cart Dropdown */}
          <div className="group relative w-max h-max">
            <button className="relative flex items-center justify-center p-2 after:content-[''] after:absolute after:w-[30%] after:h-[30%] after:bg-pink-700 after:rounded-full after:top-1 after:right-1 hover:bg-slate-100 rounded-xl">
              <ion-icon name="cart-outline"></ion-icon>
            </button>
            <div className="invisible group-hover:visible absolute w-[28rem] h-max bg-white border-[1px] border-slate-300 shadow-md rounded-md px-4 py-3 left-[-15rem] text-sm text-slate-500">
              <header className="w-full flex justify-between">
                <span>Cart ({carts.length})</span>
                <Link className="text-[#00f445] font-semibold" href={"/"}>
                  See all
                </Link>
              </header>
              <main className="flex flex-col mt-3">
                {carts.isLoading === true
                  ? "Loading"
                  : carts.data === null
                  ? carts.message
                  : carts.data.map((da, index) => (
                      <Link
                        key={index}
                        href={`/${da.store_domain}/${da.product_slug}`}
                      >
                        <div className="w-full flex justify-between items-center border-b-[1px] border-slate-300 py-3">
                          <div className="flex gap-4">
                            <img
                              width={50}
                              height={50}
                              src={`${
                                process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                                da.main_image
                              }`}
                              className="bg-center bg-cover"
                              alt="cart-product"
                            />
                            <div>
                              <h6 className="font-semibold">
                                {da.product_name}
                              </h6>
                              <small>{da.quantity} barang</small>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-lg font-semibold text-yellow-500">
                              Rp
                              {moneyFormat.format(
                                da.product_price * da.quantity
                              )}
                            </h6>
                          </div>
                        </div>
                      </Link>
                    ))}
              </main>
            </div>
          </div>
          {/* End of Cart Dropdown */}

          {/* Nofification dropdown */}
          <div className="group relative w-max h-max">
            <button className="relative flex items-center justify-center p-2 after:content-[''] after:absolute after:w-[30%] after:h-[30%] after:bg-pink-700 after:rounded-full after:top-1 after:right-1 hover:bg-slate-100 rounded-xl">
              <ion-icon name="notifications-outline"></ion-icon>
            </button>
            <div className="invisible group-hover:visible absolute w-[18rem] h-max bg-white border-[1px] border-slate-200 shadow-md left-[-10rem] rounded-xl text-sm overflow-x-hidden">
              <ul className="flex flex-col text-slate-500 text-md">
                <li className="w-full h-max bg-green-200 py-3 px-4 border-t-[1px] border-b-[1px] border-slate-300 hover:bg-white">
                  <Link className="block hover:text-slate-500 " href={"/chat"}>
                    <header className="flex gap-4">
                      <small className="font-semibold">Promo</small>
                      <small>10:12 wib</small>
                    </header>
                    <main className="flex flex-col text-md">
                      <h6 className="font-semibold text-black">
                        Promo Akhir Tahun
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni quod suscipit labore, esse vitae sapiente
                        repudiandae fugiat architecto sint tempora.
                      </p>
                    </main>
                  </Link>
                </li>
                <li className="w-full h-max bg-green-200 py-3 px-4 border-t-[1px] border-b-[1px] border-slate-300 hover:bg-white">
                  <Link
                    className="block hover:text-slate-500"
                    href={"/discussion"}
                  >
                    <header className="flex gap-4">
                      <small className="font-semibold">Promo</small>
                      <small>10:12 wib</small>
                    </header>
                    <main className="flex flex-col text-md">
                      <h6 className="font-semibold text-black">
                        Promo Akhir Tahun
                      </h6>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Magni quod suscipit labore, esse vitae sapiente
                        repudiandae fugiat architecto sint tempora.
                      </p>
                    </main>
                  </Link>
                </li>
                <li className="w-full h-max py-2 px-4 flex justify-between text-[0.7rem] text-[#00F445]">
                  <Link href={"/"}>Tandai Telah dibaca</Link>
                  <Link href={"/"}>Lihat Selengkapnya</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* End of Notification Dropdown */}

          {/* Chat Dropdon */}
          <div className="group relative w-max h-max">
            <button className="relative flex items-center justify-center p-2 after:content-[''] after:absolute after:w-[30%] after:h-[30%] after:bg-pink-700 after:rounded-full after:top-1 after:right-1 hover:bg-slate-100 rounded-xl">
              <ion-icon name="mail-outline"></ion-icon>
            </button>
            <div className="invisible group-hover:visible absolute w-[15rem] h-max bg-white border-[1px] border-slate-200 shadow-md py-3 px-4 left-[-10rem] rounded-xl text-sm">
              <ul className="flex flex-col gap-3">
                <li>
                  <Link className="block hover:text-slate-500" href={"/chat"}>
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    className="block hover:text-slate-500"
                    href={"/discussion"}
                  >
                    Discussion
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* End of Cart Dropdown */}
        </div>
        <div className="w-[60%] flex items-center justify-start gap-6">
          <div className="group relative w-[30%] h-max">
            <button className=" w-full flex items-center justify-center gap-2 rounded-2xl hover:bg-slate-100 px-4">
              <img
                width={60}
                height={60}
                src="/images/gucci.png"
                className="rounded-full bg-center bg-cover"
                alt="store-image"
              />
              <span>Toko</span>
            </button>
            <div className="invisible group-hover:visible absolute w-[16rem] h-max px-3 py-6 bg-white border-[1px] border-slate-200 shadow-md left-[-9rem] rounded-3xl text-sm text-center flex flex-col justify-center items-center gap-3 text-slate-500">
              <span>You don't have store yet.</span>
              <button className="w-[90%] h-[2rem] bg-[#00f445] font-semibold text-white rounded-xl hover:bg-[#31d860]">
                Make your store, its free!{" "}
              </button>
              <span>
                Your Store is gone?,{" "}
                <Link href={""} className="text-[#00f445] font-semibold">
                  Learn More
                </Link>
              </span>
            </div>
          </div>
          <div className="group relative w-[30%] h-max">
            <button className="w-full flex items-center justify-center gap-2 rounded-2xl hover:bg-slate-100 px-4">
              <img
                width={60}
                height={60}
                src="/images/company-album-1.jpg"
                className="rounded-full bg-center bg-cover"
                alt="profile-image"
              />
              <span>{user.data != null ? user.data.username : ""}</span>
            </button>
            <div className="invisible group-hover:visible absolute w-[26rem] h-max bg-white border-[1px] border-slate-100 left-[-18rem] rounded-3xl shadow-lg px-4 py-6 flex flex-col justify-center items-center">
              <div className="w-[95%] h-max px-3 py-2 flex items-center gap-4 bg-white rounded-3xl shadow-md">
                <img
                  width={60}
                  height={60}
                  src="/images/company-album-1.jpg"
                  className="rounded-full bg-center bg-cover"
                  alt="profile-image"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {user.data != null ? user.data.username : ""}
                  </span>
                  <Link
                    className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-xl text-slate-50"
                    href={""}
                  >
                    Rewards <ion-icon name="chevron-forward-outline"></ion-icon>
                  </Link>
                </div>
              </div>
              <div className="w-[95%]">
                <ul className="mt-6 text-slate-500 flex flex-col gap-3">
                  <li>
                    <Link
                      href={""}
                      className="px-2 py-1 rounded-xl hover:bg-slate-200"
                    >
                      <ion-icon name="paper-plane-outline"></ion-icon> Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={""}
                      className="px-2 py-1 rounded-xl hover:bg-slate-200"
                    >
                      <ion-icon name="settings-outline"></ion-icon> Setting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={""}
                      className="px-2 py-1 rounded-xl hover:bg-slate-200"
                      onClick={logoutHandler}
                    >
                      <ion-icon name="exit-outline"></ion-icon> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
