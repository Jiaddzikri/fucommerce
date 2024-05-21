import SellerLayout from "@/app/components/SellerLayout";
import Image from "next/image";

const Chats = () => {
  return (
    <>
      <SellerLayout>
        <div className="relative w-full h-max">
          <header className="w-full">
            <h3 className="text-2xl font-bold text-slate-600">Discussion</h3>
          </header>
          <main className="w-full h-max bg-white px-5 py-4 mt-5 rounded-lg border-[1px]">
            <div className="flex gap-4 items-center text-slate-500">
              <span>Show : </span>
              <button className="w-max px-3 h-[2.5rem] bg-white border-[1px] border-[#00F445] rounded-2xl text-[#00F445] hover:bg-[#00F445] hover:text-white">
                Not Response Yet
              </button>
              <button className="w-max px-3 h-[2.5rem] bg-white border-[1px] border-[#00F445] rounded-2xl text-[#00F445] hover:bg-[#00F445] hover:text-white">
                Problematic
              </button>
              <button className="w-max px-3 h-[2.5rem] bg-white border-[1px] border-[#00F445] rounded-2xl text-[#00F445] hover:bg-[#00F445] hover:text-white">
                Automatic Chat
              </button>
            </div>
            <div className="w-full h-max relative">
              <div className="w-full h-max py-3 px-4 bg-green-200 mt-5 rounded-lg text-slate-500">
                <div className="flex gap-3 items-center border-b-[1px] border-slate-300 py-3">
                  <Image
                    priority
                    width={50}
                    height={50}
                    className="bg-center rounded-sm"
                    alt="product"
                    src="/images/buah.png"
                  />
                  <span>Nanas Segar 400g</span>
                </div>
                <div className="flex gap-2 mt-3 mb-5">
                  <Image
                    priority
                    width={50}
                    height={50}
                    className="bg-center rounded-full w-[3rem] h-[3rem]"
                    alt="customer"
                    src="/images/gucci.png"
                  />
                  <div className="">
                    <small>Oleh Jiad Dzikri Ramadia - 3 jam lalu</small>
                    <span className="block text-lg font-bold">
                      Stock Masih ada?
                    </span>
                    <div className="flex mt-3">
                      <input
                        type="text"
                        placeholder="Balas Pesan disini..."
                        className="w-[40rem] h-[2.5rem] px-3 rounded-tl-lg rounded-bl-lg outline-none"
                      />
                      <button className="w-[3rem] h-[2.5rem] bg-black border-[1px] border-slate-300 rounded-tr-lg rounded-br-lg flex items-center justify-center text-white">
                        <ion-icon name="paper-plane-outline"></ion-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-max py-3 px-4 bg-green-200 mt-5 rounded-lg text-slate-500">
                <div className="flex gap-3 items-center border-b-[1px] border-slate-300 py-3">
                  <Image
                    priority
                    width={50}
                    height={50}
                    className="bg-center rounded-sm"
                    alt="product"
                    src="/images/buah.png"
                  />
                  <span>Nanas Segar 400g</span>
                </div>
                <div className="flex gap-2 mt-3 mb-5">
                  <Image
                    priority
                    width={50}
                    height={50}
                    className="bg-center rounded-full w-[3rem] h-[3rem]"
                    alt="customer"
                    src="/images/gucci.png"
                  />
                  <div className="">
                    <small>Oleh Jiad Dzikri Ramadia - 3 jam lalu</small>
                    <span className="block text-lg font-bold">
                      Stock Masih ada?
                    </span>
                    <div className="flex mt-3">
                      <input
                        type="text"
                        placeholder="Balas Pesan disini..."
                        className="w-[40rem] h-[2.5rem] px-3 rounded-tl-lg rounded-bl-lg outline-none"
                      />
                      <button className="w-[3rem] h-[2.5rem] bg-black border-[1px] border-slate-300 rounded-tr-lg rounded-br-lg flex items-center justify-center text-white">
                        <ion-icon name="paper-plane-outline"></ion-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SellerLayout>
    </>
  );
};
export default Chats;
