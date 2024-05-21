"use client";

import { useState } from "react";
import MenuButton from "./MenuButton";
import Image from "next/image";
import Cookies from "js-cookie";
import { apiPostProductDiscussionReplies } from "../lib/api-request";

const formReplyData = (data) => {
  const form = new FormData();
  form.append("product_id", data.product_id);
  form.append("discussion_id", data.discussion_id);
  form.append("receiver_id", data.receiver_id);
  form.append("content", data.content);

  return form;
};

const DiscussionCard = ({
  id = null,
  productId = "",
  senderId = "",
  username = "",
  message = "",
  replies = null,
  discussionReplies = null,
}) => {
  const cookies = Cookies.get("authsession");
  const [isOpen, setOpen] = useState(false);
  const [onFocus, setOnfocus] = useState(false);
  const [form, setForm] = useState({
    discussion_id: id,
    product_id: productId,
    receiver_id: senderId,
    content: "",
  });
  const [sendRepliesLoading, setSendRepliesLoading] = useState(false);

  const handleFormChange = (e) => {
    const { value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
  };
  const handleSendButton = async () => {
    setSendRepliesLoading((prev) => {
      prev = true;
    });

    try {
      const response = await apiPostProductDiscussionReplies(
        formReplyData(form),
        cookies
      );
      setOnfocus((prev) => (prev = false));
      await discussionReplies();
    } catch (error) {
      console.log(error.message);
    } finally {
      setSendRepliesLoading((prev) => (prev = false));
    }
  };

  return (
    <div className="mt-10">
      <div>
        <div className="w-full min-h-[3rem] rounded-tr-lg rounded-tl-lg border-[1px] border-slate-300 flex items-center justify-between gap-3 px-5 py-3">
          <div className="self-start">
            <img
              width={70}
              height={70}
              className="rounded-full"
              src={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}storage/images/default.jpg`}
              alt="user-thumbnail"
            />
          </div>
          <div className="w-[80%] mr-auto">
            <div>
              <span className="font-semibold text-xl">{username}</span>
              <span className="py-1 px-2 bg-green-200 text-green-700 text-sm mx-2">
                Penjual
              </span>
              <span className="text-sm text-slate-500">1 hari lalu</span>
            </div>
            <div>
              <p className="text-black mt-2">{message}</p>
            </div>
            {replies.data == null ? (
              ""
            ) : (
              <div className="mt-5">
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="font-semibold flex items-center justify-center"
                >
                  <span>Lihat Balasan</span>
                  <span
                    className="transition-all  flex items-center justify-center"
                    style={{
                      transform: `rotate(${isOpen === false ? 0 : 180}deg`,
                    }}
                  >
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </span>
                </button>
              </div>
            )}
          </div>
          <div className="self-start flex gap-3">
            <button className="font-semibold text-slate-500">follow</button>
            <MenuButton />
          </div>
        </div>
      </div>
      {replies.data === null
        ? ""
        : replies.data.map((repdata, index) =>
            repdata.discussion_id != id ? (
              ""
            ) : (
              <div
                key={index}
                className="bg-slate-100 rounded-bl-lg rounded-br-lg "
              >
                <div
                  className={`w-full min-h-[3rem] px-5 py-3 ml-20 ${
                    isOpen === false
                      ? "hidden"
                      : "flex items-center justify-between gap-3"
                  }`}
                >
                  <div className="self-start">
                    <img
                      width={70}
                      height={70}
                      className="rounded-full"
                      src={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}storage/images/default.jpg`}
                      alt="user-thumbnail"
                    />
                  </div>
                  <div className="w-[80%] mr-auto">
                    <div className="text-slate-500">
                      <span className="font-semibold">
                        {repdata.sender_username}
                      </span>
                      <span className="py-1 px-2 bg-green-200 text-green-700 text-sm mx-2">
                        Penjual
                      </span>
                      <span className="mx-2">
                        to {repdata.receiver_username}
                      </span>
                      <span className="text-sm">1 hari lalu</span>
                    </div>
                    <div>
                      <p className="text-black">{repdata.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
      <div className="flex gap-5 items-center py-5 bg-slate-100 rounded-bl-lg rounded-br-lg">
        <div className="ml-20 mb-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}storage/images/default.jpg`}
            alt="image"
            width={70}
            height={70}
            className="rounded-full"
          />
        </div>
        <div className="w-[70%]">
          <textarea
            onChange={handleFormChange}
            onFocus={() => setOnfocus((prev) => (prev = true))}
            id="message"
            rows={onFocus === true ? "3" : "1"}
            className="block px-5 py-3 w-full text-sm text-black bg-white rounded-lg border border-slate-300 focus:ring-green-500 focus:border-green-500"
            placeholder="Type your message here..."
          ></textarea>
          <div
            className={`gap-3 mt-3 ${
              onFocus === false ? "hidden" : "flex justify-end items-center "
            }`}
          >
            <button
              onClick={() => setOnfocus((prev) => (prev = false))}
              className="w-[6rem] h-[2rem] bg-white border-[2px] border-[#00f445] text-[#00f445] rounded-lg"
            >
              Close
            </button>
            <button
              onClick={handleSendButton}
              className="w-[6rem] h-[2rem] bg-[#00f445] text-white rounded-lg"
            >
              {sendRepliesLoading === true ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
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
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiscussionCard;
