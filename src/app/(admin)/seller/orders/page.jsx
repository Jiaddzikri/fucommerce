"use client";

import SellerLayout from "@/app/components/SellerLayout";
import Image from "next/image";
import { useState } from "react";

const Orders = () => {
  const [sellerMessage, setSellerMessage] = useState("");

  return (
    <>
      <SellerLayout>
        <div className="w-full h-max relative">
          <header className="w-full flex justify-between items-center">
            <h3 className="text-2xl font-bold text-slate-600">Order List</h3>
            <a href="">
              <button className="w-max h-[2.5rem] flex items-center gap-2 px-4 text-slate-500 rounded-lg shadow-sm font-bold  bg-white hover:bg-slate-50 border-[1px] border-slate-300">
                <ion-icon name="file-tray-full-outline"></ion-icon>Laporan
                Penjualan
              </button>
            </a>
          </header>
          <main className="w-full h-max mt-10 relative bg-white rounded-md ">
            <header className="w-full flex text-slate-500 border-b-[1px] border-slate-300 px-4">
              <button className="w-max h-max px-3 py-4 border-b-[3px] border-[#00f445]">
                All Orders
              </button>
              <button className="w-max h-max px-3 py-4 ">
                New Orders (100)
              </button>
              <button className="w-max h-max px-3 py-4 ">
                Ready to Send (50)
              </button>
              <button className="w-max h-max px-3 py-4 ">
                In Process (50)
              </button>
              <button className="w-max h-max px-3 py-4 ">
                Have to review (4)
              </button>
              <button className="w-max h-max px-3 py-4 ">
                Orders Complete (10)
              </button>
              <button className="w-max h-max px-3 py-4 ">
                Orders Cancelled (1)
              </button>
            </header>
            <div className="w-full flex justify-between items-center mt-5 px-4 py-3">
              <div className="relative w-[30%] flex gap-2">
                <input
                  type="text"
                  className="w-[90%] h-[2.5rem] px-3 py-2 border-[1px] border-slate-300 rounded-md outline-none text-slate-500"
                  placeholder="Search products..."
                />
                <button className="w-[10%] h-[2.5rem] bg-[#00f445] font-bold text-white rounded-md flex items-center justify-center hover:bg-[#24ce55]">
                  <ion-icon name="search-outline"></ion-icon>
                </button>
              </div>
              <div className="relative w-[70%] flex justify-center gap-4">
                <div className="relative group w-max">
                  <button className="w-[12rem] h-[2.5rem] bg-white text-slate-500 flex justify-between items-center border-[1px] border-slate-300 px-4 rounded-md outline-none">
                    <span>Transaction Date</span>{" "}
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </button>
                  <ul className="invisible group-hover:visible w-full h-max py-3 px-4 absolute text-slate-500 flex flex-col justify-center items-start gap-5 bg-white border-[1px] border-slate-300 transition-all text-start rounded-md shadow-md z-[99]">
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Nove mber 12</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>November 13</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>November 14</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>November 15</li>
                    </a>
                  </ul>
                </div>
                <div className="group relative w-max">
                  <button className="w-[12rem] h-[2.5rem] bg-white text-slate-500 flex justify-between items-center border-[1px] border-slate-300 px-4 rounded-md outline-none">
                    <span>Filter</span>{" "}
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </button>
                  <ul className="invisible group-hover:visible w-full h-max py-3 px-4 absolute text-slate-500 flex flex-col justify-center items-start gap-5 bg-white border-[1px] border-slate-300 transition-all text-start rounded-md shadow-md z-[99]">
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Lowest Price</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Highest Price</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Lowest Rate</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Highest Rate</li>
                    </a>
                  </ul>
                </div>
                <div className="group relative w-max">
                  <button className="w-[12rem] h-[2.5rem] bg-white text-slate-500 flex justify-between items-center border-[1px] border-slate-300 px-4 rounded-md outline-none">
                    <span>Sort</span>{" "}
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </button>
                  <ul className="invisible group-hover:visible w-full h-max py-3 px-4 absolute text-slate-500 flex flex-col justify-center items-start gap-5 bg-white border-[1px] border-slate-300 transition-all text-start rounded-md shadow-md z-[99]">
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>From A-Z</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>From Z-A</li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full h-max relative px-4 py-3">
              <header className="w-full flex justify-between items-center mt-3">
                <div className="w-[80%] flex gap-3">
                  <div className="flex gap-2 items-center">
                    <button className="w-max h-[2.5rem] bg-white text-slate-500 flex justify-between items-center border-[1px] border-slate-300 px-4 rounded-md outline-none hover:bg-slate-100 ">
                      Download Invoice
                    </button>
                    <button className="w-max h-[2.5rem] bg-white text-slate-500 flex justify-between items-center border-[1px] border-slate-300 px-4 rounded-md outline-none hover:bg-slate-100 ">
                      Download Product List
                    </button>
                  </div>
                </div>
                <div className="w-[20%]">
                  <ul className="flex gap-10 justify-end text-slate-500">
                    <a href="">
                      <li>
                        <ion-icon name="chevron-back-outline"></ion-icon>
                      </li>
                    </a>
                    <a className="text-[#00F445]" href="">
                      <li>1</li>
                    </a>
                    <a href="">
                      <li>2</li>
                    </a>
                    <a href="">
                      <li>3</li>
                    </a>
                    <a href="">
                      <li>
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                      </li>
                    </a>
                  </ul>
                </div>
              </header>
            </div>
            <div className="w-full h-max relative ">
              <div className="w-full h-max px-4 py-3 rounded-md mt-5">
                <header className="flex h-max justify-between text-slate-500 border-t-[1px] border-b-[1px] border-slate-300 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#00F445]">
                      CDSCBZZCXCDF82932NFN
                    </span>
                    <span>
                      <ion-icon name="person-outline"></ion-icon> Jiad Dzikri
                    </span>
                    <span>
                      <ion-icon name="time-outline"></ion-icon> 12 Sep 2023
                      13:14 WIB
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-bold">
                    <span>Response Before</span>
                    <span className="px-3 py-2 flex items-center justify-between bg-slate-100 text-slate-500 rounded-lg">
                      14 Sep 2023 13:14
                    </span>
                  </div>
                </header>
                <main className="relative w-full pb-3 border-b-[1px] border-slate-300">
                  <div className="w-full">
                    <div className="gap-3 flex py-5">
                      <div className="w-[40%] flex gap-2">
                        <div>
                          <Image
                            width={70}
                            height={70}
                            priority
                            className="rounded-sm bg-center bg-cover"
                            src={"/images/laptop.png"}
                            alt="product-image"
                          />
                        </div>
                        <div className="text-slate-500 text-sm ">
                          <h5 className="font-bold">
                            Macbook pro M3 Bionic Chipset 8gb/512gb
                          </h5>
                          <span className="block">1 x Rp.30.500.000</span>
                          <span className="block italic mt-2 text-slate-400">
                            "Packing Kayu dan Bubble wrap"
                          </span>
                        </div>
                      </div>
                      <div className="w-[30%] flex items-center flex-col">
                        <div className="text-[.8rem] text-slate-500">
                          <h5 className="mb-1 font-bold text-slate-600">
                            Address
                          </h5>
                          <span>
                            Jiad Dzikri Ramadia <br /> prov.Jawa Barat,
                            Kab.Bandung, Kec.Tanjungsari <br />
                            Puskopad blok f no 2 <br /> 440222
                          </span>
                        </div>
                      </div>
                      <div className="w-[30%] flex items-center flex-col gap-3">
                        <div className="text-[.8rem] text-slate-500">
                          <h5 className="mb-1 font-bold text-slate-600">
                            Courier
                          </h5>
                          <span>Same day (5.6kg)</span>
                        </div>
                        <div className="text-[.8rem] text-slate-500">
                          <h5 className="mb-1 font-bold text-slate-600">
                            Booking Number
                          </h5>
                          <span>324RNERJN322</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 py-3 bg-slate-300 flex justify-between items-center text-slate-600 rounded-md ">
                      <div>
                        <span>Total Price (1 piece)</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Rp.30.500.000</h3>
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <div className="flex gap-3 items-center text-slate-500 mt-5">
                        <button>
                          <ion-icon name="newspaper-outline"></ion-icon> Status
                          Detail
                        </button>
                        <button>
                          <ion-icon name="chatbubble-ellipses-outline"></ion-icon>{" "}
                          Chat Customer
                        </button>
                        <label className="relative w-max flex items-center gap-3">
                          <ion-icon name="clipboard-outline"></ion-icon>
                          <input
                            type="text"
                            className="w-[20rem] h-[2rem] bg-white border-[1px] border-slate-300 rounded-md px-3 outline-none"
                            placeholder="Tambahkan catatan disini"
                            onChange={(e) =>
                              setSellerMessage(
                                (prev) => (prev = e.target.value)
                              )
                            }
                          />
                          <span className="flex items-center justify-center absolute right-2 text-sm z-[3] h-full bg-white border-t-[1px] border-b-[1px] border-slate-300">
                            {sellerMessage.length}/60
                          </span>
                        </label>
                      </div>
                      <div className="flex gap-3 mt-5">
                        <button className="w-[2.5rem] h-[2.5rem] px-2 py-3 border-[1px] border-slate-300 rounded-md text-xl flex items-center justify-center hover:bg-slate-50">
                          <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                        </button>
                        <button className="w-[12rem] h-[2.5rem] bg-[#00F445] text-white rounded-lg">
                          Terima Pesanan
                        </button>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
              <div className="w-full h-max px-4 py-3 rounded-md mt-5">
                <header className="flex h-max justify-between text-slate-500 border-t-[1px] border-b-[1px] border-slate-300 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#00F445]">
                      CDSCBZZCXCDF82932NFN
                    </span>
                    <span>
                      <ion-icon name="person-outline"></ion-icon> Jiad Dzikri
                    </span>
                    <span>
                      <ion-icon name="time-outline"></ion-icon> 12 Sep 2023
                      13:14 WIB
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-bold">
                    <span>Response Before</span>
                    <span className="px-3 py-2 flex items-center justify-between bg-slate-100 text-slate-500 rounded-lg">
                      14 Sep 2023 13:14
                    </span>
                  </div>
                </header>
                <main className="relative w-full pb-3 border-b-[1px] border-slate-300">
                  <div className="w-full">
                    <div className="gap-3 flex py-5">
                      <div className="w-[40%] flex gap-2">
                        <div>
                          <Image
                            width={70}
                            height={70}
                            priority
                            className="rounded-sm bg-center bg-cover"
                            src={"/images/laptop.png"}
                            alt="product-image"
                          />
                        </div>
                        <div className="text-slate-500 text-sm ">
                          <h5 className="font-bold">
                            Macbook pro M3 Bionic Chipset 8gb/512gb
                          </h5>
                          <span className="block">1 x Rp.30.500.000</span>
                          <span className="block italic mt-2 text-slate-400">
                            "Packing Kayu dan Bubble wrap"
                          </span>
                        </div>
                      </div>
                      <div className="w-[30%] flex items-center flex-col">
                        <div className="text-[.8rem] text-slate-500">
                          <h5 className="mb-1 font-bold text-slate-600">
                            Address
                          </h5>
                          <span>
                            Jiad Dzikri Ramadia <br /> prov.Jawa Barat,
                            Kab.Bandung, Kec.Tanjungsari <br />
                            Puskopad blok f no 2 <br /> 440222
                          </span>
                        </div>
                      </div>
                      <div className="w-[30%] flex items-center flex-col gap-3">
                        <div className="text-[.8rem] text-slate-500">
                          <h5 className="mb-1 font-bold text-slate-600">
                            Courier
                          </h5>
                          <span>Same day (5.6kg)</span>
                        </div>
                        <div className="text-[.8rem] text-slate-500">
                          <h5 className="mb-1 font-bold text-slate-600">
                            Booking Number
                          </h5>
                          <span>324RNERJN322</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 py-3 bg-slate-300 flex justify-between items-center text-slate-600 rounded-md ">
                      <div>
                        <span>Total Price (1 piece)</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Rp.30.500.000</h3>
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <div className="flex gap-3 items-center text-slate-500 mt-5">
                        <button>
                          <ion-icon name="newspaper-outline"></ion-icon> Status
                          Detail
                        </button>
                        <button>
                          <ion-icon name="chatbubble-ellipses-outline"></ion-icon>{" "}
                          Chat Customer
                        </button>
                        <label className="relative w-max flex items-center gap-3">
                          <ion-icon name="clipboard-outline"></ion-icon>
                          <input
                            type="text"
                            className="w-[20rem] h-[2rem] bg-white border-[1px] border-slate-300 rounded-md px-3 outline-none"
                            placeholder="Tambahkan catatan disini"
                            onChange={(e) =>
                              setSellerMessage(
                                (prev) => (prev = e.target.value)
                              )
                            }
                          />
                          <span className="flex items-center justify-center absolute right-2 text-sm z-[3] h-full bg-white border-t-[1px] border-b-[1px] border-slate-300">
                            {sellerMessage.length}/60
                          </span>
                        </label>
                      </div>
                      <div className="flex gap-3 mt-5">
                        <button className="w-[2.5rem] h-[2.5rem] px-2 py-3 border-[1px] border-slate-300 rounded-md text-xl flex items-center justify-center hover:bg-slate-50">
                          <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                        </button>
                        <button className="w-[12rem] h-[2.5rem] bg-[#00F445] text-white rounded-lg">
                          Terima Pesanan
                        </button>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </main>
        </div>
      </SellerLayout>
    </>
  );
};

export default Orders;
