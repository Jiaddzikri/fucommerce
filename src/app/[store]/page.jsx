"use client";

import Image from "next/image";
import UserLayout from "../components/UserLayout";

import StoreProducts from "../components/StoreProducts";
import StoreReviews from "../components/StoreReviews";
import StoreHome from "../components/StoreHome";
import { useEffect, useState } from "react";
import { apiGetStoreProfile } from "../lib/api-request";
import { usePathname } from "next/navigation";
import { PathSplitter } from "../helper/PathSplitter";

const Store = () => {
  const pathName = usePathname();
  const storeDomain = PathSplitter(pathName)[1];
  const [content, setContent] = useState(<StoreHome />);
  const [navigationOffsetvalue, setNavigationOffsetValue] = useState(0);
  const [storeProfile, setStoreProfile] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getStoreProfile();
  }, []);

  const getStoreProfile = async () => {
    setLoading((prev) => (prev = true));
    try {
      const response = await apiGetStoreProfile(storeDomain);
      setStoreProfile((prev) => (prev = response.data));
    } catch (error) {
      setErrorMessage((prev) => (prev = error.message));
    } finally {
      setLoading(false);
    }
  };

  const navigationHandleClick = (e) => {
    const { offsetLeft, innerText } = e.currentTarget;
    e.preventDefault();

    switch (innerText.toLowerCase()) {
      case "home":
        setContent((prev) => (prev = <StoreHome />));
        break;
      case "products":
        setContent((prev) => (prev = <StoreProducts />));
        break;
      case "ratings":
        setContent((prev) => (prev = <StoreReviews />));
        break;
    }
    setNavigationOffsetValue(parseInt(offsetLeft));
  };

  return (
    <UserLayout>
      <div className="relative w-full h-max mt-24 flex flex-col items-center justify-center">
        {isLoading === true ? (
          <div
            className="w-full min-h-[10rem] flex justify-center items-center"
            role="status"
          >
            <svg
              aria-hidden="true"
              class="w-[5rem] h-[5rem] text-slate-100 animate-spin  fill-[#00f445]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : errorMessage !== null ? (
          <div className="text-center">
            <Image
              src={`/images/il-error-not-found.png`}
              alt="error"
              width={500}
              height={500}
            />
            <h1 className="text-2xl font-semibold">
              Waduh, tujuanmu nggak ada!
            </h1>
            <p>
              Mungkin kamu salah jalan atau alamat. Ayo balik sebelum gelap!
            </p>
          </div>
        ) : (
          <div className="w-[80%] h-max">
            <div className="w-full py-3 px-5 border-[1px] border-slate-300 rounded-lg flex">
              <div className="w-[60%] flex gap-3">
                <div className="relative w-max">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}storage/images/default.jpg`}
                    width={120}
                    height={150}
                    className=" rounded-full bg-center bg-cover"
                    alt="store-image"
                  />
                </div>
                <div className="w-[70%]">
                  <h1 className="font-semibold text-2xl">
                    {storeProfile.store_name}
                  </h1>
                  <span className="text-slate-500 font-light text-sm">
                    <span className="font-semibold text-[#00f445] text-lg">
                      Online
                    </span>{" "}
                    ~ Jakarta Barat
                  </span>
                  <div className="flex gap-2">
                    <button className="w-[10rem] h-[2rem] rounded-lg bg-[#00f445] font-semibold text-slate-50 text-sm">
                      Follow
                    </button>
                    <button className="w-[10rem] h-[2rem] rounded-lg bg-[#ffffff] font-semibold text-slate-700 border-[1px] border-slate-300 text-sm">
                      Chat Seller
                    </button>
                    <button className="w-[2.5rem] h-[2rem] rounded-lg bg-[#ffffff] font-semibold text-slate-700 border-[1px] border-slate-300 text-sm flex justify-center items-center">
                      <ion-icon name="storefront-outline"></ion-icon>
                    </button>
                    <button className="w-[2.5rem] h-[2rem] rounded-lg bg-[#ffffff] font-semibold text-slate-700 border-[1px] border-slate-300 text-sm flex justify-center items-center">
                      <ion-icon name="share-social-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[40%] flex justify-center items-center">
                <div className="w-[33%] text-center text-lg">
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-yellow-400 ">
                      <ion-icon name="star"></ion-icon>
                    </span>
                    <p className="font-semibold">4.9</p>
                  </div>
                  <small className="text-sm text-slate-500">
                    Rating & Ulasan
                  </small>
                </div>
                <div className="w-[33%] text-center text-lg border-l-[1px] border-r-[1px] border-slate-300">
                  <div className="flex justify-center items-center gap-2">
                    <span className="">±</span>
                    <p className="font-semibold">1 Jam</p>
                  </div>
                  <small className="text-sm text-slate-500">
                    Order Processed
                  </small>
                </div>
                <div className="w-[33%] text-center text-lg">
                  <div className="flex justify-center items-center gap-2 font-semibold">
                    <span>Buka</span>
                    <p className="">24 Jam</p>
                  </div>
                  <small className="text-sm text-slate-500">
                    Jam Operasi Toko
                  </small>
                </div>
              </div>
            </div>
            <div className="relative w-full h-max mt-20">
              <nav
                className={`relative w-full border-b-[1px] border-slate-300 flex `}
              >
                <button
                  onClick={navigationHandleClick}
                  className="w-[6rem] h-[2rem] "
                >
                  Home
                </button>
                <button
                  onClick={navigationHandleClick}
                  className="w-[6rem] h-[2rem]"
                >
                  Products
                </button>

                <button
                  onClick={navigationHandleClick}
                  className="w-[6rem] h-[2rem]"
                >
                  Ratings
                </button>

                <div
                  className={`block absolute w-[6rem] h-[3px] left-0 bg-[#00f445] bottom-0 ease-in-out duration-300`}
                  style={{
                    transform: `translateX(${navigationOffsetvalue}px)`,
                  }}
                ></div>
              </nav>
              <main className="w-full min-h-[10rem] mt-10">{content}</main>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};
export default Store;
