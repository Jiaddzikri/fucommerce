"use client";

import { register } from "swiper/element";
import { banners } from "./constant/banners";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { useRef, useState } from "react";
import { categories } from "./constant/categories";
import TopupPulsaForm from "./components/TopupPulsaForm";
import TopupPaketDataForm from "./components/TopupPaketDataForm";
import TopupListrikForm from "./components/TopupListrikForm";
import UserLayout from "./components/UserLayout";
register();

const HomePage = () => {
  const topCategoryContainer = useRef(null);
  const topupBillsOptionButtonPar = useRef(null);
  const [topUpForm, setTopUpForm] = useState(<TopupPulsaForm />);

  const topCategoryCarouselButton = (e) => {
    if (e.currentTarget.id === "left") {
      topCategoryContainer.current.swiper.slidePrev();
    } else {
      topCategoryContainer.current.swiper.slideNext();
    }
  };

  const topUpBillsOptionButton = (e) => {
    const topUpBillsOptionButtonChil =
      topupBillsOptionButtonPar.current.childNodes;
    const { id } = e.target;

    topUpBillsOptionButtonChil.forEach((el) => {
      if (el.classList.contains("text-[#00f445]")) {
        el.classList.replace("text-[#00f445]", "text-slate-500");
      }
    });

    e.currentTarget.classList.replace("text-slate-500", "text-[#00f445]");

    if (id === "pulsa") {
      setTopUpForm(<TopupPulsaForm />);
    } else if (id === "paket-data") {
      setTopUpForm(<TopupPaketDataForm />);
    } else if (id === "listrik") {
      setTopUpForm(<TopupListrikForm />);
    }
  };

  return (
    <>
      <UserLayout>
        <div className="w-screen h-max flex flex-col items-center">
          <header className="relative w-full h-[20rem] flex flex-col items-center mt-24">
            <div className="relative w-[80%] h-full rounded-xl overflow-x-hidden">
              <swiper-container
                loop="true"
                speed="1000"
                navigation="false"
                pagination="false"
                slides-per-view="1"
                autoplay-delay="3500"
                autoplay-disable-on-interaction="false"
                space-between="15"
                class="banners-container"
              >
                {banners.map((banner) => (
                  <swiper-slide key={banner.alt}>
                    <Image
                      src={banner.imgSrc}
                      fill
                      alt={banner.alt}
                      sizes="100%"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      className="absolute w-full h-full bg-center bg-cover transition-all cursor-pointer rounded-xl"
                      loading="lazy"
                    />
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
          </header>
          <div className="w-[80%] h-max mt-8">
            <main className="mt-4">
              <div className="w-full h-[18rem] px-4 py-3 border-[1px] border-slate-300 rounded-lg flex items-center gap-4">
                <div className="relative w-[50%] h-full px-4 py-3 overflow-hidden">
                  <header className="flex gap-4 items-center text-slate-500 font-semibold">
                    <h3 className="text-2xl">Top Category</h3>
                    <Link className="text-[#00f445] text-lg" href={""}>
                      See all
                    </Link>
                  </header>
                  <button
                    onClick={topCategoryCarouselButton}
                    id="left"
                    className="absolute flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-white border-[1px] border-slate-200 shadow-sm left-0 z-[99] top-[50%]"
                  >
                    <ion-icon name="chevron-back-outline"></ion-icon>
                  </button>

                  <swiper-container
                    loop="true"
                    navigation="false"
                    pagination="false"
                    slides-per-view="3"
                    space-between="10"
                    class={"top-category-slider"}
                    ref={topCategoryContainer}
                  >
                    {categories.map((category) => (
                      <swiper-slide key={category.imgUrl}>
                        <Link href={""}>
                          <Image
                            fill
                            alt="category-image"
                            src={category.imgUrl}
                            className="absolute w-full h-full bg-center bg-cover object-cover rounded-xl hover:scale-[1.2] transition-all"
                            loading="lazy"
                          ></Image>
                          <span className="absolute text-lg text-white text-shadow z-[99] drop-shadow-md font-semibold bottom-[1rem] left-[0.5rem]">
                            {category.header}
                          </span>
                        </Link>
                      </swiper-slide>
                    ))}
                  </swiper-container>

                  <button
                    onClick={topCategoryCarouselButton}
                    id="right"
                    className="absolute flex items-center justify-center w-[2rem] h-[2rem] rounded-full bg-white border-[1px] border-slate-200 shadow-sm z-[99] right-0 top-[50%]"
                  >
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                  </button>
                </div>
                <div className="w-[50%] h-full px-4 py-3 text-slate-500">
                  <header className="relative flex items-center gap-4 ">
                    <h1 className="font-semibold text-2xl">Topup & Bills</h1>
                    <Link className="text-[#00f445] font-semibold" href={""}>
                      See others.
                    </Link>
                  </header>
                  <main className="w-full border-[1px] border-slate-300 mt-8 rounded-xl">
                    <header
                      ref={topupBillsOptionButtonPar}
                      className="flex gap-4 items-center justify-center border-b-[2px] border-slate-200"
                    >
                      <button
                        onClick={topUpBillsOptionButton}
                        className="w-max h-max flex items-center justify-center py-3 px-4 text-[#00f445]"
                        id="pulsa"
                      >
                        Pulsa
                      </button>
                      <button
                        onClick={topUpBillsOptionButton}
                        className="w-max h-max flex items-center justify-center py-3 px-4 text-slate-500"
                        id="paket-data"
                      >
                        Paket Data
                      </button>
                      <button
                        onClick={topUpBillsOptionButton}
                        className="w-max h-max flex items-center justify-center py-3 px-4 text-slate-500"
                      >
                        Flight
                      </button>
                      <button
                        onClick={topUpBillsOptionButton}
                        className="w-max h-max flex items-center justify-center py-3 px-4 text-slate-500"
                        id="listrik"
                      >
                        Listrik
                      </button>
                    </header>
                    <div className="px-2 pb-3">{topUpForm}</div>
                  </main>
                </div>
              </div>
              <div className="w-full h-max mt-16">
                <section className="w-full">
                  <header>
                    <h3 className="text-3xl font-bold text-[#00f445] mb-3">
                      For You
                    </h3>
                  </header>
                  <main className="w-full flex items-center justify-start gap-2">
                    <div className=" w-[12rem] h-[22rem] pb-10 relative border-[0.5px] border-slate-300 shadow-lg overflow-hidden rounded-xl transition-all hover:cursor-pointer hover:translate-y-[-0.2rem]">
                      <header className="relative w-full h-[50%] ">
                        <Image
                          src={"/images/product-1.jpg"}
                          fill
                          alt={"product-1"}
                          sizes="100%"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          className="absolute w-full h-full transition-all bg-center bg-cover"
                        ></Image>
                      </header>
                      <div className="px-3">
                        <h1 className="text-sm my-3">
                          LENOVO LEGION 5 PRO 16 I7 12700 RTX3050TI 4GB...
                        </h1>
                        <span className="my-3 text-lg text-[#2cc958] font-bold">
                          Rp.16.000.000
                        </span>
                        <div className="w-full flex gap-3 items-center">
                          <div className="flex gap-1 text-sm my-3 text-yellow-400">
                            <ion-icon size="small" name="star"></ion-icon>
                            <ion-icon size="small" name="star"></ion-icon>
                            <ion-icon size="small" name="star"></ion-icon>
                            <ion-icon size="small" name="star"></ion-icon>
                            <ion-icon size="small" name="star"></ion-icon>
                          </div>
                          <span className="text-sm">1 sold</span>
                        </div>
                        <span className="text-slate-600">Jakarta City</span>
                      </div>
                    </div>
                  </main>
                </section>
              </div>
            </main>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default HomePage;
