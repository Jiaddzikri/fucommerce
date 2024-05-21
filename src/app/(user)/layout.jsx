const UserLayout = ({ children }) => {
  return (
    <div>
      <header className="absolute w-screen flex justify-center items-center">
        <h1 className="bg-gradient-to-r from-[#00f445] to-[#00a12e] bg-clip-text text-transparent mt-5 text-3xl font-semibold">
          FuCommerce
        </h1>
      </header>
      {children}
    </div>
  );
};

export default UserLayout;
