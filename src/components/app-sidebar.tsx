import * as React from "react";
import logoSVG from "/src/assets/oceanus-logo.svg";
import {
  Users2,
  ReceiptText,
  Building2,
  Receipt,
  Calculator,
  NetworkIcon,
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
  user: {
    name: "AdminOceanus",
    email: "AdminOceanus@example.com",
    avatar: "https://ui-avatars.com/api/?name=Admin+Oceanus",
  },
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
      name: "Empresas",
      url: "/empresas",
      icon: Building2,
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyInformation company={data.companys} />
      </SidebarHeader>
      <SidebarContent>
        <NavPages pages={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
