import Link from "next/link";

const GuestNavbar = () => {
  return (
    <nav className="fixed top-0 w-screen h-[4.5rem] flex bg-white z-[9999]">
      <div className="w-[30%] py-4 px-12 text-center">
        <a href="">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00f445] to-[#00a12e] bg-clip-text text-transparent">
            FuCommerce
          </h1>
        </a>
      </div>
      <ul className="w-[40%] px-12 flex justify-center items-center gap-7 text-xl font-regular text-slate-600">
        <li>
          <Link href={"/"} className="hover:text-slate-800">
            Home
          </Link>
        </li>
        <li>
          <Link href={"/products"} className="hover:text-slate-800">
            Products
          </Link>
        </li>
        <li>
          <Link href={"/contact"} className="hover:text-slate-800">
            Contact
          </Link>
        </li>
        <li>
          <Link href={"/promo"} className="hover:text-slate-800">
            Promo
          </Link>
        </li>
      </ul>
      <ul className="w-[30%] flex items-center justify-center gap-2  z-20">
        <li>
          <Link href={"/login"}>
            <button className="text-md font-semibold text-white bg-[#00f445] w-[6rem] h-[2.5rem] box-border rounded-lg shadow-xl transition-all flex items-center justify-center">
              Login
            </button>
          </Link>
        </li>
        <li>
          <Link href={"/register"}>
            <button className="text-md font-semibold text-slate-500 bg-white w-[6rem] h-[2.5rem] box-border rounded-lg shadow-xl transition-all flex items-center justify-center border-[1px] border-slate-200">
              Register
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default GuestNavbar;
