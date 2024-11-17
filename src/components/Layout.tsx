import { ReactNode } from "react";

import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarInset } from "./ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: Readonly<LayoutProps>) {
  return (
    <div className="flex h-screen bg-gradient-to-r from-softAqua to-lightsky">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
