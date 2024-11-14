import { ReactNode } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
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

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar>
        <SidebarItem icon={<Users2Icon size={20} />} text="Personal" />
        <SidebarItem icon={<ReceiptText size={20} />} text="Contratos" />
        <SidebarItem icon={<Building size={20} />} text="Empresas" />
        <SidebarItem icon={<Receipt size={20} />} text="Facturas" />
        <SidebarItem icon={<UserRoundCheck size={20} />} text="Terceros" />
        <SidebarItem icon={<Calculator size={20} />} text="Cotizaciones" />
        {/*<hr className="my-3" />
        <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />
        <SidebarItem icon={<BarChart3 size={20} />} text="Statistics" />*/}
      </Sidebar>

      {/* Main content */}
      <div className="flex-1 ml-[260px] pt-[60px]">
        {" "}
        {/* Ajustamos para dejar espacio al Sidebar */}
        {/* Navbar */}
        {/* Main content */}
        <main className="p-6">{children}</main>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
