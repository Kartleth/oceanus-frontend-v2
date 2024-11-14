import { ReactNode } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

import {
  Building,
  Calculator,
  Receipt,
  ReceiptText,
  UserRoundCheck,
  Users2Icon,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="flex h-screen bg-gradient-to-r from-softAqua to-lightsky">
      {/* Sidebar */}
      <Sidebar>
        <Link to="/">
          <SidebarItem icon={<Users2Icon size={20} />} text="Personal" />
        </Link>
        <Link to="/contratos">
          {" "}
          <SidebarItem icon={<ReceiptText size={20} />} text="Contratos" />
        </Link>
        <Link to="/empresas">
          {" "}
          <SidebarItem icon={<Building size={20} />} text="Empresas" />
        </Link>
        <Link to="/facturas">
          {" "}
          <SidebarItem icon={<Receipt size={20} />} text="Facturas" />{" "}
        </Link>
        <Link to="/terceros">
          {" "}
          <SidebarItem icon={<UserRoundCheck size={20} />} text="Terceros" />
        </Link>
        <Link to="/cotizaciones">
          <SidebarItem icon={<Calculator size={20} />} text="Cotizaciones" />
        </Link>
        {/*<hr className="my-3" />
        <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />
        <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />*/}
      </Sidebar>
      <div className="flex">
        {" "}
        {/* Navbar */}
        <Navbar />
        {/* Main content */}
        <main className="p-6 ">{children}</main>
        {/* Footer */}
        {/* <Footer />*/}
      </div>
    </div>
  );
}
