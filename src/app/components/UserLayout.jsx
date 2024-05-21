import Navbar from "./Navbar";
import { Footer } from "./Footer";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
