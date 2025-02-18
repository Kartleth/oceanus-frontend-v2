import * as React from "react";
import logoSVG from "../assets/oceanus-logo.svg";
import {
  Users2,
  ReceiptText,
  Receipt,
  Calculator,
  NetworkIcon,
  Handshake,
} from "lucide-react";

import { NavPages } from "@/components/nav-pages";
import { NavUser } from "@/components/nav-user";
import { CompanyInformation } from "@/components/company-information";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  companys: [
    {
      name: "Oceanus",
      logo: logoSVG,
      fullNameCompany: "Oceanus DB",
    },
  ],
  pages: [
    {
      name: "Personal",
      url: "/personal",
      icon: Users2,
    },
    {
      name: "Contratos",
      url: "/contratos",
      icon: ReceiptText,
    },
    {
      name: "Clientes",
      url: "/clientes",
      icon: Handshake,
    },
    {
      name: "Facturas",
      url: "/facturas",
      icon: Receipt,
    },
    {
      name: "Terceros",
      url: "/personal_terceros",
      icon: NetworkIcon,
    },
    {
      name: "Cotizaciones",
      url: "/cotizaciones",
      icon: Calculator,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyInformation company={data.companys} />
      </SidebarHeader>
      <SidebarContent>
        <NavPages pages={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser
            user={{
              name: user.usuario,
              type: user.type,
              avatar: `https://ui-avatars.com/api/?name=${user.usuario}&background=C4EEF8`,
            }}
          />
        ) : (
          <NavUser
            user={{
              name: "AdminOceanus",
              type: "Administrador",
              avatar:
                "https://ui-avatars.com/api/?name=Admin+Oceanus&background=C4EEF8",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
