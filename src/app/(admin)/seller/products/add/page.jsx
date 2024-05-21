"use client";

import SellerLayout from "@/app/components/SellerLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import ModalNotification from "@/app/components/ModalNotification";
import { apiCreateProduct, apiGetCategory } from "@/app/lib/api-request";
import Cookies from "js-cookie";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ align: [] }],
    [{ color: [] }],
    ["code-block"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "align",
  "color",
  "code-block",
];

const productPriceTypeCheck = (value) => {
  if (Number.isInteger(Number.parseInt(value)) || value == "") {
    return true;
  }
  return false;
};

const productNameLengthCheck = (value, length) => {
  if (value.length > length) {
    return false;
  }
  return true;
};

const formDataHandler = (data) => {
  const formData = new FormData();
  formData.append("image_1", data.image_1);
  formData.append("image_2", data.image_2);
  formData.append("image_3", data.image_3);
  formData.append("image_4", data.image_4);
  formData.append("name", data.name);
  formData.append("category", data.category);
  formData.append("sub_category_1", data.sub_category_1);
  formData.append("sub_category_2", data.sub_category_2);
  formData.append("sub_category_3", data.sub_category_3);
  formData.append("price", parseInt(data.price));
  formData.append("description", data.description);

  return formData;
};

const AddProduct = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [productForm, setProductForm] = useState({
    image_1: undefined,
    image_2: undefined,
    image_3: undefined,
    image_4: undefined,
    name: "",
    category: "",
    sub_category_1: "",
    sub_category_2: "",
    sub_category_3: "",
    price: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    image_1: "",
    image_2: "",
    image_3: "",
    image_4: "",
    name: "",
    price: "",
    description: "",
    category: "",
    sub_category_1: "",
    sub_category_2: "",
    sub_category_3: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryListLoad, setCategoryListLoad] = useState(false);

  const productDescriptionChange = (e) => {
    setProductForm((prev) => {
      return {
        ...prev,
        description: e,
      };
    });
  };

  const searchCategoryByProductNameHandler = useCallback(async () => {
    if (productForm.name !== "") {
      setCategoryListLoad(true);
      try {
        const response = await apiGetCategory(productForm.name);
        setCategoryList(response.data);
      } catch (error) {
        setErrorMessage((prev) => {
          return {
            ...prev,
            category: JSON.parse(error.message),
          };
        });
      } finally {
        setCategoryListLoad(false);
      }
    } else {
      setCategoryList([]);
    }
  }, [productForm.name]);

  useEffect(() => {
    const timer = setTimeout(() => searchCategoryByProductNameHandler(), 1000);
    return () => clearTimeout(timer);
  }, [searchCategoryByProductNameHandler]);

  const productInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "name" && productNameLengthCheck(value, 70) == false) {
      return false;
    }

    if (
      name === "price" &&
      productPriceTypeCheck(value.substring(value.length - 1)) === false
    ) {
      return false;
    }
    setProductForm((prev) => {
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  };

  const categoryChangeHandler = (e) => {
    const { value } = e.target;
    const split = value.split("|");

    setProductForm((prev) => {
      return {
        ...prev,
        category: split[0],
        sub_category_1: split[1],
        sub_category_2: split[2],
        sub_category_3: split[3],
      };
    });
  };

  const submitFormRequest = async () => {
    setLoading(true);
    try {
      const response = await apiCreateProduct(
        formDataHandler(productForm),
        Cookies.get("authsession")
      );
      setIsSuccess(true);
      setSuccessMessage((prev) => (prev = response.messsage));
    } catch (error) {
      const message = error.message;
      console.log(message);
      setIsFailed(true);
      setErrorMessage((prev) => {
        return {
          ...prev,
          image_1: message.image_1 ?? "",
          image_2: message.image_2 ?? "",
          image_3: message.image_3 ?? "",
          image_4: message.image_4 ?? "",
          name: message.name ?? "",
          price: message.price ?? "",
          description: message.description ?? "",
        };
      });
    } finally {
      setLoading(false);
      setOpenModal(true);
    }
  };

  return (
    <div>
      <ModalNotification
        show={openModal}
        close={() => {
          setOpenModal(false);
          setIsSuccess(false);
          setIsFailed(false);
        }}
      >
        {isSuccess ? (
          <div className="w-full h-full flex justify-center items-center gap-3">
            <h1 className="font-semibold text-2xl text-green-600">
              {successMessage}
            </h1>
          </div>
        ) : (
          ""
        )}
        {isFailed ? (
          <div className="w-full h-full flex flex-col justify-start items-start gap-3">
            <span className="text-md text-pink-700">{errorMessage.name}</span>
            <span className="text-md text-pink-700">{errorMessage.price}</span>
            <span className="text-md text-pink-700">
              {errorMessage.description}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.image_1}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.image_2}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.image_3}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.image_4}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.category}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.sub_category_1}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.sub_category_2}
            </span>
            <span className="text-md text-pink-700">
              {errorMessage.sub_category_3}
            </span>
          </div>
        ) : (
          ""
        )}
      </ModalNotification>

      <SellerLayout>
        <div className="relative w-full h-max text-slate-500">
          <header>
            <h1 className="font-bold text-2xl">Add Product</h1>
          </header>
          <main className="w-full h-max">
            <div className="w-full flex gap-8 items-center mt-8 px-6 py-4 bg-white rounded-xl">
              <div className="w-[30%]">
                <header className="mb-3">
                  <h3 className="font-bold text-lg">Upload Product</h3>
                </header>
                <p className="text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Possimus quisquam similique dolor repellendus sed facere eos
                  laudantium quod esse? Ex officia, optio illum blanditiis totam
                  inventore impedit harum aliquam rerum!
                </p>
              </div>
              <div className="flex items-center justify-center gap-4">
                <label
                  htmlFor="main-picture"
                  className="relative w-[10rem] h-[10rem] border-dashed border-[1px] border-slate-400 flex justify-center items-center flex-col rounded-xl bg-white cursor-pointer hover:bg-slate-50 overflow-x-scroll"
                >
                  <ion-icon size="large" name="camera-outline"></ion-icon>
                  <span>
                    {productForm.image_1 !== undefined
                      ? productForm.image_1.name
                      : "First Image"}
                  </span>
                  <input
                    id="main-picture"
                    type="file"
                    className="w-full h-full absolute invisible block text-sm text-slate-500 file:hidden"
                    name="image_1"
                    onChange={productInputChange}
                  />
                </label>

                <label
                  htmlFor="second-picture"
                  className="relative w-[10rem] h-[10rem] border-dashed border-[1px] border-slate-400 flex justify-center items-center flex-col rounded-xl bg-white cursor-pointer hover:bg-slate-50 overflow-x-scroll"
                >
                  <ion-icon size="large" name="camera-outline"></ion-icon>
                  <span>
                    {productForm.image_2 !== undefined
                      ? productForm.image_2.name
                      : "Second Image"}
                  </span>
                  <input
                    id="second-picture"
                    type="file"
                    className="invisible w-full h-full absolute block text-sm text-slate-500 file:hidden"
                    name="image_2"
                    onChange={productInputChange}
                  />
                </label>
                <label
                  htmlFor="third-picture"
                  className="relative w-[10rem] h-[10rem] border-dashed border-[1px] border-slate-400 flex justify-center items-center flex-col rounded-xl bg-white cursor-pointer hover:bg-slate-50 overflow-x-scroll"
                >
                  <ion-icon size="large" name="camera-outline"></ion-icon>
                  {productForm.image_3 !== undefined
                    ? productForm.image_3.name
                    : "Third Image"}
                  <input
                    id="third-picture"
                    type="file"
                    className="invisible block w-full h-full absolute  text-sm text-slate-500 file:hidden "
                    name="image_3"
                    onChange={productInputChange}
                  />
                </label>
                <label
                  htmlFor="fourth-picture"
                  className="relative w-[10rem] h-[10rem] border-dashed border-[1px] border-slate-400 flex justify-center items-center flex-col rounded-xl bg-white cursor-pointer hover:bg-slate-50 overflow-x-scroll"
                >
                  <ion-icon size="large" name="camera-outline"></ion-icon>
                  <span>
                    {productForm.image_4 !== undefined
                      ? productForm.image_4.name
                      : "Fourth Image"}
                  </span>
                  <input
                    id="fourth-picture"
                    type="file"
                    className="w-full h-full absolute invisible block text-sm text-slate-500 file:hidden"
                    name="image_4"
                    onChange={productInputChange}
                  />
                </label>
              </div>
            </div>

            <div className="w-full flex gap-8 items-center mt-8 px-6 py-4 bg-white rounded-xl">
              <div className="w-[30%]">
                <header className="mb-3">
                  <h3 className="font-bold text-lg">Product Name</h3>
                </header>
                <p className="text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Possimus quisquam similique dolor repellendus sed facere eos
                  laudantium quod esse? Ex officia, optio illum blanditiis totam
                  inventore impedit harum aliquam rerum!
                </p>
              </div>
              <div className="relative w-[70%]">
                <label htmlFor="product-name">
                  <input
                    type="text"
                    className="w-full h-[2rem] border-[1px] border-slate-300 rounded-lg outline-none px-2 py-1"
                    onChange={productInputChange}
                    name="name"
                    value={productForm.name}
                  />
                </label>
                <span className="absolute text-sm right-0 top-10">
                  {productForm.name.length} / 70
                </span>
              </div>
            </div>

            <div className="w-full flex gap-8 items-center mt-8 px-6 py-4 bg-white rounded-xl">
              <div className="w-[30%]">
                <header className="mb-3">
                  <h3 className="font-bold text-lg">Select Category</h3>
                </header>
                <p className="text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Possimus quisquam similique dolor repellendus sed facere eos
                  laudantium quod esse? Ex officia, optio illum blanditiis totam
                  inventore impedit harum aliquam rerum!
                </p>
              </div>
              <div className="relative w-[70%]">
                {categoryListLoad === true ? (
                  <h1 className="font-semibold text-2xl text-center">
                    Loading
                  </h1>
                ) : (
                  <label htmlFor="product-category">
                    <select
                      onClick={categoryChangeHandler}
                      name="category"
                      className="w-full h-[2rem] border-[1px] border-slate-300 rounded-lg outline-none px-2 py-1"
                    >
                      <option disabled value={null}>
                        Choose a category
                      </option>

                      {categoryList !== null ? (
                        categoryList.map((list) => (
                          <option
                            value={
                              list.category_id +
                              "|" +
                              list.sub_category_1_id +
                              "|" +
                              list.sub_category_2_id +
                              "|" +
                              list.sub_category_3_id
                            }
                          >
                            {list.category_name +
                              " / " +
                              list.sub_category_1_name +
                              " / " +
                              list.sub_category_2_name +
                              " / " +
                              list.sub_category_3_name}
                          </option>
                        ))
                      ) : (
                        <option disabled>Choose a category</option>
                      )}
                    </select>
                  </label>
                )}
              </div>
            </div>

            <div className="w-full flex gap-8 items-center mt-8 px-6 py-4 bg-white rounded-xl">
              <div className="w-[30%]">
                <header className="mb-3">
                  <h3 className="font-bold text-lg">Price</h3>
                </header>
                <p className="text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Possimus quisquam similique dolor repellendus sed facere eos
                  laudantium quod esse? Ex officia, optio illum blanditiis totam
                  inventore impedit harum aliquam rerum!
                </p>
              </div>
              <div className="relative w-[70%]">
                <label htmlFor="product-price">
                  <input
                    type="text"
                    className="w-full h-[2rem] border-[1px] border-slate-300 rounded-lg outline-none px-2 py-1"
                    onChange={productInputChange}
                    name="price"
                    placeholder="0"
                    value={productForm.price}
                  />
                </label>
              </div>
            </div>
            <div className="w-full min-h-[20rem] flex gap-8 items-center mt-8 px-6 py-4 bg-white rounded-xl">
              <div className="w-[30%]">
                <header className="mb-3">
                  <h3 className="font-bold text-lg">Product Description</h3>
                </header>
                <p className="text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Possimus quisquam similique dolor repellendus sed facere eos
                  laudantium quod esse? Ex officia, optio illum blanditiis totam
                  inventore impedit harum aliquam rerum!
                </p>
              </div>
              <div className="relative w-[70%] h-full">
                <ReactQuill
                  theme="snow"
                  value={productForm.description}
                  onChange={productDescriptionChange}
                  modules={quillModules}
                  formats={quillFormats}
                  className="w-full h-max"
                />
              </div>
            </div>
            <div className="w-full h-max py-4">
              <button
                onClick={submitFormRequest}
                className="w-[12rem] h-[2.5rem] rounded-xl text-white bg-green-400 hover:bg-green-500"
              >
                Submit
              </button>
            </div>
          </main>
        </div>
      </SellerLayout>
    </div>
  );
};

export default AddProduct;
