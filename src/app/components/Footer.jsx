export const Footer = () => {
  return (
    <footer className="relative mt-32 w-screen h-max flex flex-col items-center border-[0.5px] border-slate-300">
      <header className="w-full px-32 mt-14">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00f445] to-[#00a12e] bg-clip-text text-transparent">
          FuuCommerce
        </h1>
      </header>
      <nav className="flex gap-20 mt-10 px-32 self-start">
        <ul>
          <h1 className="text-3xl mb-4">Navigation</h1>
          <a href="">
            <li>Home</li>
          </a>
          <a href="">
            <li>Products</li>
          </a>
          <a href="">
            <li>Contact</li>
          </a>
          <a href="">
            <li>Promo</li>
          </a>
        </ul>
        <ul>
          <h1 className="text-3xl mb-4">Contact Us</h1>
          <a className="flex gap-2" href="">
            <ion-icon name="call-outline"></ion-icon>
            <li>1500xxxx</li>
          </a>

          <a className="flex gap-2" href="">
            <ion-icon name="mail-outline"></ion-icon>
            <li>fuucommerce@co.id</li>
          </a>
          <a className="flex gap-2" href="">
            <ion-icon name="logo-whatsapp"></ion-icon>
            <li>089xxxxxx</li>
          </a>
        </ul>
        <ul>
          <h1 className="text-3xl mb-4">Social Media</h1>
          <a href="/" className="flex gap-2">
            <ion-icon name="logo-facebook"></ion-icon>
            <li>FuCommerce </li>
          </a>
          <a href="/" className="flex gap-2">
            <ion-icon name="logo-instagram"></ion-icon>
            <li>FuCommerce_14</li>
          </a>
        </ul>
      </nav>
      <div className="w-[90%] border-t-[0.5px] border-slate-400 mt-10 text-center py-6">
        <small className="text-lg">&copy; 2023 FuuCommerce </small>
      </div>
    </footer>
  );
};
