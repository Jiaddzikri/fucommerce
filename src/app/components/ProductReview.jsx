"use client";

import { useState } from "react";
import Image from "next/image";
import MenuButton from "./MenuButton";

const ProductReview = ({ data = "" }) => {
  const [arrow, setArrow] = useState(false);
  return (
    <div className="w-full border-b-[1px] border-slate-300 pb-5 my-5">
      <header className="flex justify-between items-center pt-3">
        <div className="flex items-center">
          <span className="text-yellow-400 ">
            <ion-icon name="star"></ion-icon>
          </span>
          <span className="text-yellow-400 ">
            <ion-icon name="star"></ion-icon>
          </span>
          <span className="text-yellow-400 ">
            <ion-icon name="star"></ion-icon>
          </span>
          <span className="text-yellow-400 ">
            <ion-icon name="star"></ion-icon>
          </span>
          <span className="text-yellow-400 ">
            <ion-icon name="star"></ion-icon>
          </span>
          <span className="ml-3 text-[1rem] text-slate-500">1 hari lalu</span>
        </div>
        <MenuButton />
      </header>
      <div>
        <div className="flex gap-3 items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}storage/images/default.jpg`}
            width={70}
            height={70}
            className="rounded-full"
            alt="profile-image"
          />
          <p className="font-semibold">Jiad Dzikri Ramadia</p>
        </div>
        <div className="mt-3">
          <p>
            Pelayanan memuaskan, seller responsif, barang bagus, penjual
            tanggung jawab. Proses pesanan cepat, packaging rapi 👍 Packaging
            aman 🙏
          </p>
        </div>
        <div className="flex justify-between items-center mt-3">
          <button className="flex justify-center items-center gap-2">
            <span className="text-slate-500">
              <ion-icon name="thumbs-up-sharp"></ion-icon>
            </span>
            <span className="cursor-pointer">Membantu</span>
          </button>

          <button
            onClick={() => setArrow((prev) => !prev)}
            className="flex items-center justify-center gap-3"
          >
            <span className="text-slate-500">Balasan</span>
            <span
              style={{
                transform: arrow === false ? `rotate(0)` : `rotate(180deg)`,
              }}
              className="transition-all ease-in-out flex items-center"
            >
              <ion-icon name="chevron-down-outline"></ion-icon>
            </span>
          </button>
        </div>
        <div className={`${arrow === false ? "hidden" : "block"} w-full`}>
          <div className="w-full bg-slate-50 rounded-lg p-5 my-3">
            <header className="flex gap-3 items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}storage/images/default.jpg`}
                width={60}
                height={60}
                className="rounded-full"
                alt="image-profile"
              />
              <span className="font-semibold">Jiad's Official</span>
              <span className="flex items-center justify-center w-max h-[1rem] bg-green-200 text-green-700 p-3 text-sm font-semibold">
                Penjual
              </span>
              <span className="text-sm text-slate-500">1 hari lalu</span>
            </header>
            <main className="mt-3 text-sm">
              <p>{data.review}</p>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductReview;
