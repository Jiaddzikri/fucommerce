"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { register } from "swiper/element/bundle";
import UserLayout from "../../components/UserLayout";
import {
  apiGetProductBySlug,
  apiGetProductDiscussionReplies,
  apiGetProductDisscussion,
  apiPostCart,
  apiPostDirectBuy,
  apiPostProductDiscussion,
} from "@/app/lib/api-request";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import ProductReview from "@/app/components/ProductReview";
import FilterDropdown from "@/app/components/FilterDropdown";
import Pagination from "@/app/components/Pagination";
import { review } from "@/app/constant/Review";
import DiscussionCard from "@/app/components/DiscussionCard";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/helper/getCookie";

register();
const discussionFormData = (form) => {
  const formData = new FormData();
  formData.append("product_id", form.product_id);
  formData.append("content", form.content);

  return formData;
};

const cartFormData = (form) => {
  const formData = new FormData();
  formData.append("product_id", form.product_id);
  return formData;
};

const directBuyFormData = (form) => {
  const formData = new FormData();
  formData.append("product_id", form.product_id);
  formData.append("quantity", form.quantity);
  formData.append("note", form.note);
  return formData;
};

const Product = ({ params }) => {
  const numberFormat = new Intl.NumberFormat();
  const store = params.store;
  const slug = params.product;
  const productImageDetail = useRef(null);
  const mainImageDetail = useRef(null);

  // to set response message after fetch product done
  const [productData, setProductData] = useState({
    message: "",
    data: [],
  });

  // to set response message after fetch product discussion done
  const [productDiscussion, setProductDiscussion] = useState({
    message: "",
    data: [],
    length: 0,
  });
  // to set response message after fetch product discussion replies done
  const [productDiscussionReplies, setProductDiscussionReplies] = useState({
    message: "",
    data: [],
  });
  // to set loading while fetch product datas
  const [getProductLoading, setGetProductLoading] = useState(false);
  // to set loading whiel fetch productDiscussion
  const [getProductDiscussionLoading, setGetProductDiscussionLoading] =
    useState(false);
  // to set loading while fetch product discussion replies
  const [
    getProductDiscussionRepliesLoading,
    setGetProductRepliesDiscussionLoading,
  ] = useState(false);

  const [discussionForm, setDiscussionForm] = useState({
    product_id: "" ?? null,
    content: "" ?? null,
  });
  const [discussionFormStatus, setDiscussionFormStatus] = useState({
    message: "",
    data: [],
    isLoading: false,
  });

  useEffect(() => {
    getProduct();
    getProductDiscussion();
    getProductDiscussionReplies();
  }, []);

  const discussionHandleChange = (e) => {
    const { value } = e.target;
    setDiscussionForm((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
  };

  const discussionHandleButton = async () => {
    setDiscussionFormStatus((prev) => {
      prev.isLoading = true;
    });
    try {
      const response = await apiPostProductDiscussion(
        discussionFormData(discussionForm),
        getCookie("authsession")
      );
      setDiscussionFormStatus((prev) => {
        return {
          ...prev,
          message: response.message,
          data: response.data,
        };
      });

      await getProductDiscussion();
    } catch (error) {
      setDiscussionFormStatus((prev) => {
        return {
          ...prev,
          message: error.message,
          data: [],
        };
      });
    } finally {
      setDiscussionFormStatus((prev) => {
        return {
          ...prev,
          isLoading: false,
        };
      });
    }
  };

  const getProductDiscussionReplies = async () => {
    setGetProductRepliesDiscussionLoading((prev) => !prev);
    try {
      const response = await apiGetProductDiscussionReplies(slug);
      setProductDiscussionReplies((prev) => {
        return {
          ...prev,
          message: response.message,
          data: response.data,
        };
      });
    } catch (error) {
      setProductDiscussionReplies((prev) => {
        return {
          ...prev,
          message: error.message,
          data: null,
        };
      });
    } finally {
      setGetProductRepliesDiscussionLoading((prev) => !prev);
    }
  };

  const getProductDiscussion = async () => {
    setGetProductDiscussionLoading((prev) => !prev);
    try {
      const response = await apiGetProductDisscussion(slug);
      setProductDiscussion((prev) => {
        return {
          ...prev,
          message: response.message,
          data: response.data,
          length: response.length,
        };
      });
    } catch (error) {
      setProductDiscussion((prev) => {
        return {
          ...prev,
          message: error.message,
          data: error.data,
        };
      });
    } finally {
      setGetProductDiscussionLoading((prev) => !prev);
    }
  };

  const getProduct = async () => {
    setGetProductLoading(true);
    try {
      const response = await apiGetProductBySlug(store, slug);
      setProductData((prev) => {
        return {
          ...prev,
          data: response.data[0],
        };
      });
      setDiscussionForm((prev) => {
        return {
          ...prev,
          product_id: response.data[0].id,
        };
      });

      setCartForm((prev) => {
        return {
          ...prev,
          product_id: response.data[0].id,
        };
      });

      setDirectBuyForm((prev) => {
        return {
          ...prev,
          product_id: response.data[0].id,
        };
      });
    } catch (error) {
      setProductData((prev) => {
        return {
          ...prev,
          message: error.message,
          data: error.data,
        };
      });
    } finally {
      setGetProductLoading(false);
    }
  };

  const imageDetailHoverEvent = (e) => {
    const { srcset } = mainImageDetail.current.attributes;
    srcset.value = e.target.src;
  };

  const imageDetailHandle = (e) => {
    e.preventDefault();
    e.target.id === "left"
      ? productImageDetail.current.swiper.slidePrev()
      : productImageDetail.current.swiper.slideNext();
  };

  const [naviationButtonWidth, setNavigationButtonWidth] = useState(0);

  const navigationButtonHandle = (e) => {
    const { offsetLeft } = e.currentTarget;
    setNavigationButtonWidth((prev) => (prev = offsetLeft));
  };

  const [quantity, setQuantity] = useState(1);
  const stockHandle = (e) => {
    const { id } = e.currentTarget;

    if (id == "min") {
      quantity == 1
        ? setQuantity((prev) => (prev = prev))
        : setQuantity((prev) => (prev -= 1));
    } else {
      setQuantity((prev) => (prev += 1));
    }
  };

  const [cartForm, setCartForm] = useState({
    product_id: null,
  });
  const [addCartLoading, setCartLoading] = useState(false);
  const [addCartStatus, setAddCartStatus] = useState({
    message: "",
    data: [],
  });
  const addProductToCart = async () => {
    setCartLoading((prev) => (prev = true));
    try {
      const response = await apiPostCart(
        cartFormData(cartForm),
        getCookie("authsession")
      );
      setAddCartStatus((prev) => {
        return {
          ...prev,
          message: response.message,
          data: response.data,
        };
      });
    } catch (error) {
      setAddCartStatus((prev) => {
        return {
          ...prev,
          message: error.message,
          data: null,
        };
      });
    } finally {
      setCartLoading((prev) => (prev = false));
    }
  };

  const [directBuyLoading, setDirectBuyLoading] = useState(false);
  const [directBuyForm, setDirectBuyForm] = useState({
    product_id: null,
    quantity: 1,
    note: "",
  });
  const [directBuyResponse, setDirectBuyResponse] = useState({
    message: "",
    data: [],
    isLoading: "",
  });

  useEffect(() => {
    setDirectBuyForm((prev) => {
      return {
        ...prev,
        quantity: quantity,
      };
    });
  }, [quantity]);

  const directBuyHandle = async (e) => {
    e.preventDefault();
    setDirectBuyResponse((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    try {
      const response = await apiPostDirectBuy(
        directBuyFormData(directBuyForm),
        getCookie("authsession")
      );
      setDirectBuyResponse((prev) => {
        return {
          ...prev,
          message: response.message,
          data: response.message,
        };
      });
    } catch (error) {
      setDirectBuyResponse((prev) => {
        return {
          ...prev,
          message: error.message,
          data: null,
        };
      });
    } finally {
      setDirectBuyResponse((prev) => {
        return {
          ...prev,
          isLoading: false,
        };
      });
    }
  };

  return (
    <UserLayout>
      <div>
        {getProductLoading === true ? (
          ""
        ) : (
          <main className="w-screen h-max flex flex-col items-center mt-36">
            <div className="fixed w-full h-[2.5rem] top-[4.5rem] bg-white z-[999] flex justify-center items-center border-b-[1px] border-slate-300">
              <div className="relative w-max h-max flex justify-center items-center">
                <a href="#description">
                  <button
                    onClick={navigationButtonHandle}
                    className="w-[10rem] h-max py-3 px-4 flex justify-center items-center "
                  >
                    Product Detail
                  </button>
                </a>
                <a href="#reviews">
                  <button
                    onClick={navigationButtonHandle}
                    className="w-[10rem] h-max py-3 px-4 flex justify-center items-center "
                  >
                    Reviews
                  </button>
                </a>
                <a href="#discussions">
                  <button
                    onClick={navigationButtonHandle}
                    className="w-[10rem] h-max py-3 px-4 flex justify-center items-center"
                  >
                    Discussions
                  </button>
                </a>
                <div
                  className="absolute bottom-1 left-0 w-[10rem] h-[3px] bg-green-500 transition-all"
                  style={{
                    transform: `translateX(${naviationButtonWidth}px)`,
                  }}
                ></div>
              </div>
            </div>
            <div className="relative w-[80%] flex justify-center gap-10">
              <section className="w-[30%]">
                <div className="relative w-[90%] mx-auto h-[20rem] overflow-hidden">
                  <Image
                    ref={mainImageDetail}
                    src={
                      process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                      productData.data.main_image_path
                    }
                    fill
                    alt={"product-1"}
                    sizes="100%"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    priority
                    className="absolute bg-center bg-cover transition-all rounded-xl"
                  />
                </div>
                <div className="relative w-full h-[5rem] text-white mt-3">
                  <a
                    href=""
                    onClick={imageDetailHandle}
                    id="left"
                    className="z-10"
                  >
                    <button
                      id="left"
                      className="absolute w-[1.5rem] h-[2rem] flex items-center justify-center bg-slate-950/80 top-[1.2rem] left-0 z-10"
                    >
                      <ion-icon
                        id="left"
                        name="chevron-back-outline"
                      ></ion-icon>
                    </button>
                  </a>
                  <a
                    href=""
                    onClick={imageDetailHandle}
                    id="right"
                    className="z-10 block"
                  >
                    <button
                      id="right"
                      className="absolute w-[1.5rem] h-[2rem] flex items-center justify-center bg-slate-950/80 top-[1.2rem] right-0 z-10"
                    >
                      <ion-icon
                        id="right"
                        name="chevron-forward-outline"
                      ></ion-icon>
                    </button>
                  </a>
                  <swiper-container
                    loop="false"
                    speed="1000"
                    navigation="false"
                    pagination="false"
                    slides-per-view="4"
                    id="product-image-detail"
                    space-between="5"
                    ref={productImageDetail}
                  >
                    <swiper-slide onMouseEnter={imageDetailHoverEvent}>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                          productData.data.main_image_path
                        }
                        fill
                        alt={"product-1"}
                        sizes="100%"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        className="absolute w-full h-full bg-center bg-cover transition-all"
                        priority
                      />
                    </swiper-slide>
                    <swiper-slide onMouseEnter={imageDetailHoverEvent}>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                          productData.data.second_image_path
                        }
                        fill
                        alt={"product-1"}
                        sizes="100%"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        className="absolute w-full h-full bg-center bg-cover transition-all"
                        priority
                      />
                    </swiper-slide>
                    <swiper-slide onMouseEnter={imageDetailHoverEvent}>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                          productData.data.third_image_path
                        }
                        fill
                        alt={"product-1"}
                        sizes="100%"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        className="absolute w-full h-full bg-center bg-cover transition-all"
                        priority
                      />
                    </swiper-slide>
                    <swiper-slide onMouseEnter={imageDetailHoverEvent}>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SERVER_ENDPOINT +
                          productData.data.fourth_image_path
                        }
                        fill
                        alt={"product-1"}
                        sizes="100%"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        className="absolute w-full h-full bg-center bg-cover transition-all"
                        priority
                      />
                    </swiper-slide>
                  </swiper-container>
                </div>
              </section>
              <section className="w-[50%]">
                <div className="w-full h-max">
                  <header>
                    <h1 className="font-bold text-2xl">
                      {productData.data.name}
                    </h1>
                  </header>
                  <div className="w-[100%] flex items-center gap-5 mt-3">
                    <div className="text-yellow-500 flex items-center">
                      <span className="text-slate-500 mr-1">3</span>
                      <ion-icon name="star"></ion-icon>
                    </div>
                    <div className="text-slate-500">
                      <span className="mr-2">321 Penilaian</span>
                      <span>1000 terjual</span>
                    </div>
                    <div className="w-[30%] flex justify-end">
                      <a href="">
                        <button className="w-max h-[2rem] flex items-center justify-center gap-1 px-3 py-2 bg-pink-700 text-white rounded-lg text-sm">
                          <span>
                            <ion-icon name="alert-circle-outline"></ion-icon>
                          </span>
                          <span>Laporkan!</span>
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="w-full mt-6 flex gap-4 items-center">
                    {/* <span className="w-max h-[1rem] bg-yellow-500 text-white px-2 py-3 box-border flex items-center">
                      10%
                    </span> */}
                    {/* <span className="text-3xl font-semibold text-slate-500 line-through">
                      Rp 2.000.000
                    </span> */}
                    <span className="text-4xl font-bold text-[#2cc958]">
                      Rp{numberFormat.format(productData.data.price)}
                    </span>
                  </div>
                  <div id="description" className="w-full h-max">
                    <header className="relative w-max h-max flex mt-10">
                      <button className="w-[8rem] h-[2.5rem] px-3">
                        Deskripsi
                      </button>
                      <button className="w-[8rem] h-[2.5rem] px-3">
                        Info Penting
                      </button>
                      <div className="absolute w-[8rem] h-[3px] bg-green-500 rounded-xl bottom-0 left-0"></div>
                    </header>
                    <div className="w-full mt-5">
                      <span className="text-slate-400">
                        {parse(
                          DOMPurify.sanitize(productData.data.description)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
              <section className="w-[30%]">
                <div className="w-full h-max p-4 border-[0.5px] border-slate-300 rounded-lg">
                  <header>
                    <h1 className="font-semibold">Atur jumlah dan catatan</h1>
                  </header>
                  <div className="w-full flex gap-2 mt-3">
                    <div className="w-[50%] flex justify-between items-center gap-4 py-2 px-3 border-[0.5px]">
                      <button
                        onClick={stockHandle}
                        id="min"
                        className="text-2xl flex items-center justify-center w-[1.5rem] h-[1.5rem] hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={stockHandle}
                        id="plus"
                        className="text-2xl flex items-center justify-center  w-[1.5rem] h-[1.5rem] hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                    <div className="w-[50%] flex items-center">
                      <span>Sisa Stok : 5</span>
                    </div>
                  </div>
                  <div className="relative w-full mt-3">
                    <input
                      type="text"
                      placeholder="Example : Size M, Color White"
                      className="w-full border-[0.5px] border-slate-300 py-2 px-4 outline-none"
                    />
                  </div>
                  <div className="w-full mt-3 flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      Rp {numberFormat.format(productData.data.price)}
                    </span>
                  </div>
                  <div className="w-full mt-3 flex flex-col gap-4">
                    <button
                      onClick={addProductToCart}
                      className="bg-black text-white py-2 "
                    >
                      {addCartLoading === true ? (
                        <span>Loading</span>
                      ) : (
                        <span>Add To Cart+</span>
                      )}
                    </button>
                    <button
                      onClick={directBuyHandle}
                      className="border-[0.5px] border-slate-300 py-2 flex justify-center items-center"
                    >
                      {directBuyLoading === true ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-white animate-spin dark:text-black fill-white"
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
                      ) : (
                        <span>Buy</span>
                      )}
                    </button>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-[95%] h-max border-b-[1px] border-slate-300 pb-5">
              <section className="w-full flex flex-col items-center mt-10">
                <div className="w-[35%]">
                  <div className="flex justify-between items-center">
                    <div>
                      <Image
                        src={"/images/product-1.jpg"}
                        alt={"product-1"}
                        width="100"
                        height="100"
                        className="w-[70px] h-[70px] bg-center bg-cover rounded-full"
                      />
                    </div>
                    <div className="mr-auto ml-4">
                      <a href={`/${store}`}>
                        <h1 className="flex items-center gap-1">
                          {store}
                          <ion-icon name="checkmark-circle-outline"></ion-icon>
                        </h1>
                        <small>Last Online, 2 hours ago</small>
                      </a>
                    </div>
                    <div>
                      <button className="w-[7rem] h-[2.5rem] bg-black text-white rounded-3xl text-sm">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center text-sm text-slate-400 gap-3 mt-3">
                  <div>
                    <span className="">
                      <ion-icon name="star"></ion-icon> 5.0 rata - rata ulasan.
                    </span>
                  </div>
                  <div>
                    <span>
                      <ion-icon name="star"></ion-icon> +/- 8 jam Perjalanan
                    </span>
                  </div>
                </div>
              </section>
            </div>
            <div className="w-full flex mt-20">
              <div className="w-[25%]">
                <div>
                  <h1 className="text-center text-xl font-semibold">
                    Customer Reviews
                  </h1>
                </div>
                <div className="w-full h-max rounded-md flex flex-col items-center justify-center mt-5 ">
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
                <div>
                  <div className="flex gap-1 justify-center items-center text-slate-500">
                    <span className="flex justify-center gap-2 items-center w-[10%] ">
                      <span className="text-yellow-300 text-lg">
                        <ion-icon name="star"></ion-icon>
                      </span>
                      <p>5</p>
                    </span>
                    <div className="relative w-[40%] h-[0.4rem] overflow-hidden rounded-xl bg-slate-200">
                      <div className="absolute w-[50%] h-full bg-[#00f445]"></div>
                    </div>
                    <div className="w-[10%] text-sm text-end">
                      <p>434343</p>
                    </div>
                  </div>
                  <div className="flex gap-1 justify-center items-center text-slate-500">
                    <span className="flex justify-center gap-2 items-center w-[10%] ">
                      <span className="text-yellow-300 text-lg">
                        <ion-icon name="star"></ion-icon>
                      </span>
                      <p>4</p>
                    </span>
                    <div className="relative w-[40%] h-[0.4rem] overflow-hidden rounded-xl bg-slate-200">
                      <div className="absolute w-[50%] h-full bg-[#00f445]"></div>
                    </div>
                    <div className="w-[10%] text-sm text-end">
                      <p>434343</p>
                    </div>
                  </div>
                  <div className="flex gap-1 justify-center items-center text-slate-500">
                    <span className="flex justify-center gap-2 items-center w-[10%] ">
                      <span className="text-yellow-300 text-lg">
                        <ion-icon name="star"></ion-icon>
                      </span>
                      <p>3</p>
                    </span>
                    <div className="relative w-[40%] h-[0.4rem] overflow-hidden rounded-xl bg-slate-200">
                      <div className="absolute w-[50%] h-full bg-[#00f445]"></div>
                    </div>
                    <div className="w-[10%] text-sm text-end">
                      <p>4343</p>
                    </div>
                  </div>
                  <div className="flex gap-1 justify-center items-center text-slate-500">
                    <span className="flex justify-center gap-2 items-center w-[10%] ">
                      <span className="text-yellow-300 text-lg">
                        <ion-icon name="star"></ion-icon>
                      </span>
                      <p>2</p>
                    </span>
                    <div className="relative w-[40%] h-[0.4rem] overflow-hidden rounded-xl bg-slate-200">
                      <div className="absolute w-[50%] h-full bg-[#00f445]"></div>
                    </div>
                    <div className="w-[10%] text-sm text-end">
                      <p>433</p>
                    </div>
                  </div>
                  <div className="flex gap-1 justify-center items-center text-slate-500">
                    <span className="flex justify-center gap-2 items-center w-[10%] ">
                      <span className="text-yellow-300 text-lg">
                        <ion-icon name="star"></ion-icon>
                      </span>
                      <p>1</p>
                    </span>
                    <div className="relative w-[40%] h-[0.4rem] overflow-hidden rounded-xl bg-slate-200">
                      <div className="absolute w-[50%] h-full bg-[#00f445]"></div>
                    </div>
                    <div className="w-[10%] text-sm text-end">
                      <p>43</p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center mt-20">
                  <div className="w-[18rem] min-h-[2rem] border-[1px] border-slate-300 rounded-lg">
                    <header className="w-full border-b-[1px] border-slate-300 p-3 text-lg">
                      <h1 className="font-semibold text-slate-500 ">
                        Filter Ulasan
                      </h1>
                    </header>
                    <div>
                      <FilterDropdown text={"Media"}>
                        <div>
                          <h1>Hwello jiad</h1>
                        </div>
                      </FilterDropdown>
                      <FilterDropdown text={"Rating"}>
                        <div>
                          <h1>Hello gwenchana yo</h1>
                        </div>
                      </FilterDropdown>
                    </div>
                  </div>
                </div>
              </div>
              <div id="reviews" className="w-[70%] px-20">
                <header>
                  <h1 className="text-2xl font-semibold">Reviews</h1>
                </header>
                <div className="mt-5">
                  <ProductReview />
                  <ProductReview />
                  <ProductReview />
                </div>
                <div>
                  <Pagination href={"/product/reviews"} links={review} />
                </div>
              </div>
            </div>
            <div
              id="discussions"
              className="w-full flex flex-col justify-start items-center mt-20"
            >
              <div className="w-[60%]">
                <div>
                  <h1 className="font-semibold text-2xl">
                    Diskusi ({productDiscussion.length})
                  </h1>{" "}
                  <p className="text-slate-500 text-lg mt-3">
                    iPhone 15 Garansi Resmi Promo - Promo 128GB, Blue
                  </p>
                </div>
                <div className="flex justify-between items-center mt-8 py-3 px-5 rounded-lg border-[1px] border-slate-300">
                  <div className="flex gap-3 items-center text-lg">
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                    <p>
                      Ada pertanyaan? Diskusikan dengan penjual atau pengguna
                      lain
                    </p>
                  </div>
                  <a href="#message">
                    <button className="w-[10rem] h-[2.5rem] rounded-lg bg-[#00f445] text-white font-semibold">
                      <span>Tulis Pertanyaan</span>
                    </button>
                  </a>
                </div>
                {getProductDiscussionLoading === true
                  ? ""
                  : productDiscussion.data == null
                  ? "Tidak Ada Diskusi"
                  : productDiscussion.data.map((discussionData, index) => (
                      <DiscussionCard
                        key={index}
                        id={discussionData.discussion_id}
                        productId={discussionData.product_id}
                        senderId={discussionData.sender_id}
                        username={discussionData.sender_username}
                        message={discussionData.discussion_content}
                        replies={productDiscussionReplies}
                        discussionReplies={getProductDiscussionReplies}
                      />
                    ))}
                <div className="mt-10">
                  <div>
                    <h1 className="font-semibold text-2xl">Send Message</h1>
                  </div>
                  <div>
                    <textarea
                      onChange={discussionHandleChange}
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-slate-300 focus:ring-green-500 focus:border-green-500 mt-5"
                      placeholder="Type your message here..."
                    ></textarea>
                    <button
                      onClick={discussionHandleButton}
                      className="w-[10rem] h-[2.5rem] rounded-lg bg-[#00f445] text-white font-semibold mt-3"
                    >
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    </UserLayout>
  );
};

export default Product;
