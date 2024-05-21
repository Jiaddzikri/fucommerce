"use client";

const TopupListrikForm = () => {
  return (
    <div className="w-full h-max flex items-center">
      <div className="w-[30%] py-3 px-4">
        <header>
          <h3 className="text-sm font-semibold">Phone Number</h3>
        </header>
        <div>
          <input
            type="number"
            className="w-[8rem] h-[2rem] mt-2 bg-white outline-none border-[1px] border-slate-200 rounded-lg px-3"
            min={0}
            max={9}
            placeholder="Input phone number"
          />
        </div>
      </div>
      <div className="w-[30%] py-3 px-4">
        <header>
          <h3 className="text-sm font-semibold">No Meter/No pel</h3>
        </header>
        <div>
          <input
            type="number"
            className="w-[8rem] h-[2rem] mt-2 bg-white outline-none border-[1px] border-slate-200 rounded-lg px-3"
          />
        </div>
      </div>
      <div className="w-[30%] py-3 px-4">
        <header>
          <h3 className="text-sm font-semibold">Total</h3>
        </header>
        <div>
          <input
            type="number"
            className="w-[8rem] h-[2rem] mt-2 bg-white outline-none border-[1px] border-slate-200 rounded-lg px-3"
          />
        </div>
      </div>
      <div className="w-[10%]">
        <button className="w-full h-[2rem] flex justify-center items-center bg-[#00f445] mt-6 rounded-lg text-white text-sm">
          Buy
        </button>
      </div>
    </div>
  );
};

export default TopupListrikForm;
