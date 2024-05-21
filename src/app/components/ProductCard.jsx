"use client";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ data }) => {
  const moneyFormat = new Intl.NumberFormat();
  return (
    <Link href={`/${data.store_domain}/${data.slug}`}>
      <div className="w-[12rem] h-[20rem] pb-5 relative border-[0.5px] border-slate-300 shadow-lg overflow-hidden rounded-xl transition-all hover:cursor-pointer hover:translate-y-[-0.2rem]">
        <header className="relative w-full h-[50%] ">
          <Image
            src={`${
              process.env.NEXT_PUBLIC_SERVER_ENDPOINT + data.main_image_path
            }`}
            alt={"product-1"}
            sizes="100%"
            width={0}
            height={0}
            className="w-full h-full transition-all bg-center bg-cover"
          ></Image>
        </header>
        <div className="px-3 w-full h-[50%]">
          <h1 className="text-[.9rem] mt-2">{data.product_name}</h1>
          <span className="text-md mt-6 font-bold">
            {`Rp. ${moneyFormat.format(data.price)}`}
          </span>
          <div>
            <span className="flex items-center gap-1 text-green-500">
              <ion-icon name="storefront-outline"></ion-icon>{" "}
              <span className="text-slate-600">{data.store_name ?? ""}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-600 text-sm">Jakarta City</span>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
              <ion-icon size="small" name="star"></ion-icon>
              <span className="text-slate-500">
                4.9 | <span>100+terjual</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
