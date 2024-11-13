import logo from "../assets/oceanus-logo.svg";

export default function Navbar() {
  return (
    <div className="w-full h-full absolute bg-gradient-to-r from-blue-400 to-emerald-400">
      <header className="flex justify-between items-center text-black py-3 px-4 md:px-20 bg-white drop-shadow-md">
        <a href="#">
          <img
            src={logo}
            alt="logo_oceanus"
            className="w-12 hover:scale-105 transition-all"
          />
        </a>
        <div className="relative hidden md:flex items-center justify-center gap-3">
          <a>Administrador</a>
        </div>
      </header>
    </div>
  );
}
