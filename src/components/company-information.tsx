import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function CompanyInformation({
  company,
}: {
  company: {
    name: string;
    logo: string;
    fullNameCompany: string;
  }[];
}) {
  const [activeTeam] = React.useState(company[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="flex items-center space-x-1 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {/* Logo */}
          <img
            src={activeTeam.logo}
            alt="Logo Oceanus DB"
            className="h-auto w-[50px] transition-all duration-300 group-data-[collapsed=true]:w-[32px]"
          />

          {/* Texto - Se oculta cuando el sidebar está colapsado */}
          <div className="flex flex-col text-start text-sm leading-tight transition-all duration-300 group-data-[collapsed=true]:hidden">
            <span className="truncate font-semibold">{activeTeam.name}</span>
            <span className="truncate text-xs">
              {activeTeam.fullNameCompany}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
