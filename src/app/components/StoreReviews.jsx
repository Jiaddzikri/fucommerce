"use client";

import Image from "next/image";
import { useState } from "react";
import Review from "./Review";
import { review } from "../constant/Review";

const StoreReviews = () => {
  return (
    <div className="w-full flex gap-10">
      <div className="w-[20%]">
        <div className="w-full h-max rounded-md flex flex-col items-center justify-center">
          <span>
            <span className="text-yellow-300 text-3xl">
              <ion-icon name="star"></ion-icon>{" "}
            </span>
            <span className="text-6xl text-black">4.9</span>
            <span className="text-lg text-slate-500">/5.0</span>
          </span>
          <p className="font-semibold text-black text-[1rem] mt-3">
            98% pembeli merasa puas
          </p>
          <p className="text-slate-500 text-[0.8rem]">
            57,9rb rating • 23,8rb ulasan
          </p>
        </div>
      </div>
      <div className="w-[80%]">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">Ulasan</h1>
        </header>
        {review.map((rev) => (
          <Review data={rev} />
        ))}
      </div>
    </div>
  );
};
export default StoreReviews;
