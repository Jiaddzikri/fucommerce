"use client";

import { useEffect, useRef } from "react";

const Modal = ({ children, triggers }) => {
  const modalCard = useRef(null);
  const modalContainer = useRef(null);

  useEffect(() => {
    modalTrigger();
  }, []);

  const modalTrigger = () => {
    triggers.current.onclick = () => {
      console.log("hit");
      document.body.classList.add("overflow-hidden");
      modalContainer.current.classList.replace("hidden", "flex");
    };
  };

  window.onclick = (e) => {
    if (e.target === modalContainer.current) {
      document.body.classList.remove("overflow-hidden");
      modalContainer.current.classList.replace("flex", "hidden");
    }
  };

  return (
    <div
      id="modal-container"
      ref={modalContainer}
      className="fixed top-0 w-screen h-screen bg-black/10 z-[1000000] hidden justify-center items-center transition-all"
    >
      <div
        id="modal-card"
        ref={modalCard}
        className="relative w-max h-max px-5 py-10 border[0.5px] bg-white border-slate-300 rounded-xl shadow-lg z-[9999]"
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
