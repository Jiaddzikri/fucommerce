"use client";

import Pagination from "@/app/components/Pagination";
import SellerLayout from "@/app/components/SellerLayout";
import { apiGetSellerProducts } from "@/app/lib/api-request";
import Cookies from "js-cookie";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ListProduct = () => {
  const params = useSearchParams();
  const numberFormat = new Intl.NumberFormat();
  const [productsData, setProductsData] = useState({
    data: [],
    links: [],
    meta: {
      currentPage: null,
      lastPage: null,
      from: null,
      links: [],
    },
    path: "",
    per_page: null,
    to: null,
    total: null,
  });

  const [getDataLoading, setGetDataLoading] = useState(false);
  const [getDataErrorMessage, setGetDataErrorMessage] = useState(null);

  const productActiveHandler = (e) => {
    const { value } = e.currentTarget;
  };

  const getProducts = async () => {
    setGetDataLoading(true);
    try {
      const response = await apiGetSellerProducts(
        Cookies.get("authsession"),
        params.get("page")
      );
      setProductsData((prev) => {
        return {
          ...prev,
          data: response.data,
          links: response.links,
          meta: {
            currentPage: response.meta.current_page,
            from: response.meta.from,
            lastPage: response.meta.last_page,
            links: response.meta.links,
          },
          path: response.path,
          per_page: response.per_page,
          to: response.to,
          total: response.total,
        };
      });
    } catch (error) {
      setGetDataErrorMessage((prev) => (prev = JSON.parse(error.message)));
    } finally {
      setGetDataLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <SellerLayout>
        <div className="w-full h-max relative">
          <header className="w-full flex justify-between items-center">
            <h3 className="text-2xl font-bold text-slate-600">
              Inventory List
            </h3>
            <a href="">
              <button className="w-max h-[2.5rem] flex items-center bg-gradient-to-r from-[#00f445] to-[#00a12e] px-4 text-slate-200 rounded-lg shadow-sm font-bold  transition hover:from-[#24ce55] hover:to-[#00a12e]">
                <ion-icon name="add-outline"></ion-icon> Add Product
              </button>
            </a>
          </header>
          <main className="w-full h-max mt-10 relative bg-white rounded-md ">
            <header className="w-full flex text-slate-500 border-b-[1px] border-slate-300 px-4">
              <button className="w-max h-max px-3 py-4 border-b-[3px] border-[#00f445]">
                All products
              </button>
              <button className="w-max h-max px-3 py-4 ">
                Active products products
              </button>
              <button className="w-max h-max px-3 py-4 ">
                Non-active products
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
                    <span>Category</span>{" "}
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </button>
                  <ul className="invisible group-hover:visible w-full h-max py-3 px-4 absolute text-slate-500 flex flex-col justify-center items-start gap-5 bg-white border-[1px] border-slate-300 transition-all text-start rounded-md shadow-md z-[99]">
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Clothe</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Electronic</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Fashion</li>
                    </a>
                    <a className="w-full h-max hover:text-slate-700" href="">
                      <li>Sport</li>
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
              <table className="w-full table-auto border border-slate-300">
                <thead className="">
                  <tr className="w-max [&>*]:text-slate-500 [&>*]:border [&>*]:border-slate-300">
                    <th>Product Name</th>
                    <th>Statistic</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {getDataLoading == true ? (
                    <tr>
                      <td>Loading</td>
                    </tr>
                  ) : (
                    productsData.data.map((data) => (
                      <tr
                        key={data.product_id}
                        className=" [&>*]:text-slate-500 [&>*]:border [&>*]:border-slate-300"
                      >
                        <td className=" font-bold px-4 py-2">
                          <div className="flex items-center px-2 gap-4">
                            <Image
                              width={70}
                              height={70}
                              priority
                              src={
                                data.main_image_path == null
                                  ? `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}storage/images/default.jpg`
                                  : `${
                                      process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                                      data.main_image_path
                                    }`
                              }
                              alt="product-image"
                              style={{ width: 70, height: 70 }}
                              className="bg-center bg-cover rounded-lg"
                            />
                            <span>{data.product_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex flex-col items-center gap-2">
                            <span>Score : Perfect</span>
                            <div className="flex gap-1">
                              <span className="block w-[20px] h-[7px] bg-slate-300 rounded-md"></span>
                              <span className="block w-[20px] h-[7px] bg-slate-300 rounded-md"></span>
                              <span className="block w-[20px] h-[7px] bg-slate-300 rounded-md"></span>
                              <span className="block w-[20px] h-[7px] bg-slate-300 rounded-md"></span>
                              <span className="block w-[20px] h-[7px] bg-slate-300 rounded-md"></span>
                            </div>
                            <div className="flex gap-2">
                              <span>
                                <ion-icon name="eye-outline"></ion-icon> 32
                              </span>
                              <span>
                                <ion-icon name="bag-check-outline"></ion-icon> 0
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center text-slate-500 text-sm">
                            <span className="flex justify-center items-center w-[2rem] h-[2rem] bg-slate-300 rounded-tl-md rounded-bl-md">
                              Rp
                            </span>
                            <input
                              type="text"
                              className="w-[10rem] h-[2rem] border-[1px] border-slate-300 outline-none px-3 rounded-tr-md rounded-br-md"
                              defaultValue={numberFormat.format(data.price)}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center text-slate-500 text-sm">
                            <input
                              type="text"
                              className="w-[10rem] h-[2rem] border-[1px] border-slate-300 outline-none px-3 rounded-md"
                              defaultValue="50"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center text-slate-500 text-sm">
                            <button
                              className={`relative w-[4rem] h-[2rem] rounded-3xl border-[1px] border-slate-300 bg-[#00f445]`}
                              value="product_id_2"
                              onClick={productActiveHandler}
                            >
                              <span
                                className={`absolute w-[50%] h-[100%] bg-white rounded-full border-[1px] border-slate-300 top-0 right-0 shadow-md transition-all`}
                              ></span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {getDataLoading === true ? (
                ""
              ) : (
                <Pagination links={productsData.meta.links} />
              )}
            </div>
          </main>
        </div>
      </SellerLayout>
    </>
  );
};

export default ListProduct;
