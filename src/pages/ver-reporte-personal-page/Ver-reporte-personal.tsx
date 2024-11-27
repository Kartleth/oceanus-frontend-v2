import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/layout";
import { FileUser, IdCard, Slash, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default function VerReportePersonal() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Personal
              </BreadcrumbPage>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Detalles
              </BreadcrumbPage>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Reporte de empleado
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="w-32 rounded-full p-6"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="font-medium text-2xl">Nombre de trabajador</h1>
      </div>

      <div className="px-6">
        <hr />
      </div>

      <div className="py-6 flex items-center">
        <Card className="mx-auto max-w-sm w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl">Datos médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Dato médicos</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mx-auto max-w-sm w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl">Datos médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Dato médicos</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="py-2 flex items-center">
        <Card className="mx-auto max-w-sm w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl">Datos médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Dato médicos</Label>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mx-auto max-w-sm w-1/2">
          <CardHeader>
            <CardTitle className="text-2xl">Datos médicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Dato médicos</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
