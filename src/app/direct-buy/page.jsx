"use client";
import { useEffect, useRef, useState } from "react";
import UserLayout from "../components/UserLayout";
import Image from "next/image";
import { apiGetDirectBuy } from "../lib/api-request";
import { getCookie } from "../helper/getCookie";
import Modal from "../components/Modal";

const DirectBuy = () => {
  const moneyFormat = new Intl.NumberFormat();
  const paymentButton = useRef(null);
  const [directBuyData, setDirectBuyData] = useState({
    data: [],
    isLoading: false,
    message: null,
  });

  const getDirectBuyData = async () => {
    setDirectBuyData((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });
    try {
      const response = await apiGetDirectBuy(getCookie("authsession"));
      setDirectBuyData((prev) => {
        return {
          ...prev,
          data: response.data[0],
        };
      });
    } catch (error) {
      setDirectBuyData((prev) => {
        return {
          ...prev,
          message: error.message,
          data: [],
        };
      });
    } finally {
      setDirectBuyData((prev) => {
        return {
          ...prev,
          isLoading: false,
        };
      });
    }
  };

  useEffect(() => {
    getDirectBuyData();
  }, []);
  return (
    <UserLayout>
      <div className="w-full h-max flex flex-col justify-center items-center mt-36">
        <div className="relative w-[70%] h-max">
          <div>
            <header>
              <h1 className="font-bold text-2xl text-slate-700">Direct Buy</h1>
            </header>
            <div className="px-4 py-6 bg-green-50 mt-3">
              <p>
                Ini halaman terakhir dari proses belanjamu. Pastikan semua sudah
                benar, ya. :)
              </p>
            </div>
          </div>
          {directBuyData.isLoading === true ? (
            "Loading"
          ) : (
            <div className="w-full relative">
              <header>
                <h2 className="font-semibold mt-5 text-[1.2rem]">
                  Barang yang dibeli
                </h2>
                <div className="flex gap-3 items-center mt-3">
                  <span className="text-xl">
                    <ion-icon name="storefront-outline"></ion-icon>
                  </span>
                  <div>
                    <span className="font-semibold">
                      {directBuyData.data.store_name}
                    </span>
                    <p className="text-sm">Jakarta Barat</p>
                  </div>
                </div>
              </header>
              <div className="flex gap-5 items-center mt-5">
                <div className="relative w-[5rem] h-[5rem]">
                  <Image
                    fill
                    className="absolute w-full h-full rounded-lg"
                    src={`${
                      process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                      directBuyData.data.main_image_path
                    }`}
                  />
                </div>
                <div className="text-sm">
                  <h1>{directBuyData.data.product_name}</h1>
                  <span>
                    Rp{moneyFormat.format(directBuyData.data.product_price)}
                  </span>
                  <div className="flex gap-5 items-center">
                    <div>
                      <button className="font-semibold text-[#00f445]">
                        Tulis Catatan
                      </button>
                    </div>
                    <div>
                      <div className="w-max flex justify-between items-center gap-4 py-2 px-3 border-[0.5px]">
                        <button
                          id="min"
                          className="text-2xl flex items-center justify-center w-[1.5rem] h-[1.5rem] hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span>1</span>
                        <button
                          id="plus"
                          className="text-2xl flex items-center justify-center  w-[1.5rem] h-[1.5rem] hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="w-full relative">
            <header className="mt-5">
              <h1 className="text-[1.1rem] font-semibold">
                Pengiriman dan Pembayaran
              </h1>
            </header>
            <div className="w-[80%] py-5 px-6 border-[1px] border-slate-300 mt-3 rounded-md shadow-md">
              <header className="relative w-full">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex justify-center items-center py-1 px-2 bg-slate-400 text-white rounded-md">
                    Home
                  </span>
                  <p className="font-semibold">Rumah</p>
                  <span>-</span>
                  <p>Jiad Dzikri Ramadia (62895344357539)</p>
                </div>
                <div className="text-sm text-slate-500 mt-1">
                  <p>
                    PBR puskopad blok f no 2, kec Tanjungsari, Kab Sumedang,
                    Prov Jawa Barat, Tanjungsari, Kab. Sumedang
                  </p>
                </div>
                <button className="absolute w-[2rem] h-[2rem] right-2 top-[30%]">
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
              </header>
              <div className="w-full flex items-center gap-3">
                <div className="w-[50%] mt-5">
                  <h3 className="text-sm font-semibold">Pilih Pengiriman</h3>
                  <select
                    id="countries"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00f445] focus:border-[#00f445] block w-full p-2.5 mt-3"
                  >
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>

                <div className="w-[50%] mt-5">
                  <h3 className="text-sm font-semibold">Pilih kurir</h3>
                  <select
                    id="countries"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00f445] focus:border-[#00f445] block w-full p-2.5 mt-3"
                  >
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
              <div
                className="relative w-full py-3 px-2 mt-3 "
                ref={paymentButton}
              >
                <button className="w-full h-full flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-sm">BRI VA</span>
                  </div>
                  <div>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal triggers={paymentButton}>
        <div className="w-[25rem] h-[35rem]">Hello world</div>
      </Modal>
    </UserLayout>
  );
};

export default DirectBuy;
