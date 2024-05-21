"use client";

const ModalNotification = ({ children, show, close }) => {
  window.onclick = (e) => {
    if (e.target.classList.contains("notification-modal")) {
      close();
    }
  };
  return (
    <div
      className={`notification-modal ${
        show === true ? "visible" : "invisible"
      } fixed w-full h-full z-[99999999] flex justify-center items-center bg-[#6a6a6a22]`}
    >
      <div className="relative w-[40rem] min-h-[10rem] bg-white rounded-xl ">
        <button
          className="absolute w-[2rem] h-[2rem] bg-white shadow-xl border-[1px] border-slate-300 rounded-full right-[-1rem] top-[-.7rem] flex justify-center items-center hover:bg-slate-50"
          onClick={close}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <header className="w-full h-[15%] py-5 flex justify-center items-center border-b border-slate-300">
          <h1 className="font-semibold text-[1.3rem]">Modal Title</h1>
        </header>
        <main className="px-8 py-8 w-full h-[85%]">{children}</main>
      </div>
    </div>
  );
};
export default ModalNotification;
