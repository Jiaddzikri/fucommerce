"use client";

import Image from "next/image";
import "@/app/globals.css";
import UserLayout from "../components/UserLayout";
import { useEffect, useState } from "react";
import { apiGetAllProduct } from "../lib/api-request";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [productDatas, setProductDatas] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const productDatas = await apiGetAllProduct();
      setProductDatas((prev) => (prev = productDatas.data));
    } catch (error) {
      setErrorMessage((prev) => (prev = errorMessage));
    } finally {
      setLoading(false);
    }
  };

  const filterButton = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <UserLayout>
        <div>
          <main className="relative w-screen h-max flex flex-col justify-center items-center gap-20 mt-36">
            <header className="w-[95%] flex justify-between mt-14">
              <div className="w-[30%] flex justify-center items-center gap-8">
                <h1 className="text-3xl">Computer</h1>
                <p className="text-lg text-slate-400">Result : 1000 found</p>
              </div>
              <div className="w-[70%] flex gap-4 items-center">
                <span>Sort : </span>
                <a href="" onClick={filterButton}>
                  <button className="w-[7rem] h-[2.5rem] bg-gradient-to-rtext-lg flex justify-center items-center gap-2 rounded-md shadow-lg transition-all border-[0.5px] border-slate-300 hover:bg-black hover:text-slate-100">
                    Terbaru
                  </button>
                </a>
                <a href="" onClick={filterButton}>
                  <button className="w-[7rem] h-[2.5rem] bg-gradient-to-rtext-lg flex justify-center items-center gap-2 rounded-md shadow-lg transition-all border-[0.5px] border-slate-300 hover:bg-black hover:text-slate-100">
                    Terlaris
                  </button>
                </a>
                <a href="" onClick={filterButton}>
                  <button className="w-[7rem] h-[2.5rem] bg-gradient-to-rtext-lg flex justify-center items-center gap-2 rounded-md shadow-lg transition-all border-[0.5px] border-slate-300 hover:bg-black hover:text-slate-100">
                    Terpopuler
                  </button>
                </a>
                <a href="" onClick={filterButton}>
                  <button className="w-[7rem] h-[2.5rem] bg-gradient-to-rtext-lg flex justify-center items-center gap-2 rounded-md shadow-lg transition-all border-[0.5px] border-slate-300 hover:bg-black hover:text-slate-100">
                    Terpopuler
                  </button>
                </a>
                <div className="group relative w-[18rem] h-[2.5rem] ">
                  <button className="w-full h-full absolute rounded-md shadow-lg transition-all border-[0.5px] border-slate-300 hover:bg-black hover:text-slate-100 flex justify-between items-center px-4">
                    Price <ion-icon name="chevron-down-outline"></ion-icon>
                  </button>
                  <ul className="invisible group-hover:visible  absolute w-full h-max text-sm bg-slate-100 top-10 rounded-b-xl">
                    <a href="">
                      <li className="px-4 py-2 hover:text-slate-600">
                        Dari Terendah Menuju Tertinggi
                      </li>
                    </a>
                    <a href="">
                      <li className="px-4 py-2 hover:text-slate-600">
                        Dari Tertinggi Menuju Terendah
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </header>
            <div className="relative w-[95%] h-max flex gap-14">
              <section className="relative w-[20%] h-max flex flex-col gap-10">
                <div className="box-border w-full h-max p-8 shadow-xl border-[0.5px] border-slate-200 rounded-lg">
                  <header>
                    <h1 className="font-bold">All Category</h1>
                  </header>
                  <ul className="flex flex-col gap-2 mt-2 text-slate-500">
                    <a href="" className="hover:text-slate-800">
                      <li>Desktop</li>
                    </a>
                    <a href="" className="hover:text-slate-800">
                      <li>Monitor</li>
                    </a>
                    <a href="" className="hover:text-slate-800">
                      <li>Komponen Desktop & Laptop</li>
                    </a>
                    <a href="" className="hover:text-slate-800">
                      <li>Penyimpanan Data</li>
                    </a>
                  </ul>
                </div>
                <div className="box-border w-full h-max p-8 shadow-xl border-[0.5px] border-slate-200 rounded-lg">
                  <header>
                    <h1 className="font-bold">Rating</h1>
                  </header>
                  <div>
                    <ul className="mt-3">
                      <a href="">
                        <li className="text-yellow-400">
                          <ion-icon name="star"></ion-icon>{" "}
                          <span className="text-slate-500"> 1 Star</span>
                        </li>
                      </a>
                      <a href="">
                        <li className="text-yellow-400">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>{" "}
                          <span className="text-slate-500"> 2 Star</span>
                        </li>
                      </a>
                      <a href="">
                        <li className="text-yellow-400">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>{" "}
                          <span className="text-slate-500"> 3 Star</span>
                        </li>
                      </a>
                      <a href="">
                        <li className="text-yellow-400">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>{" "}
                          <span className="text-slate-500"> 4 Star</span>
                        </li>
                      </a>
                      <a href="">
                        <li className="text-yellow-400">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star"></ion-icon>{" "}
                          <span className="text-slate-500"> 5 Star</span>
                        </li>
                      </a>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="w-[80%] h-max flex gap-5">
                {isLoading === false
                  ? productDatas.map((data) => <ProductCard data={data} />)
                  : ""}
              </section>
            </div>
          </main>
        </div>
      </UserLayout>
    </>
  );
};

export default ProductsPage;
