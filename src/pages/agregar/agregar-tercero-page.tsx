import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { FormSelect } from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";

type AccordionValue = "datos-cotizacion";

const datosCotizacionSchema = z.object({
  titulo: z
    .string({ required_error: "Introduce el título de cotización." })
    .optional(),
  nombreContrato: z.string({
    required_error: "Introduce el nombre de contrato.",
  }),
  contratante: z.string({ required_error: "Introduce contratante." }),
  contratado: z.string({ required_error: "Introduce contratado." }),
  tipoContrato: z.string({ required_error: "Selecciona tipo de contrato" }),
  numeroContrato: z.string({ required_error: "Ingresa número de contrato." }),
  inicioContrato: z.string({
    required_error: "Ingresa fecha de inicio de contrato.",
  }),
  finContrato: z.string({
    required_error: "Ingresa fecha de fin de contrato.",
  }),
  montoContrato: z.string({ required_error: "Ingresa monto de contrato." }),
  anticipoContrato: z.string({
    required_error: "Ingresa anticipo de contrato.",
  }),
  subContrato: z.string({ required_error: "Selecciona subcontrato." }),
  seleccionar: z.string({ required_error: "Seleccionar seleccionar." }),
  direccion: z.string({ required_error: "Ingresa dirección." }),
});

type DatosCotizacionForm = z.infer<typeof datosCotizacionSchema>;

export function PageAgregarTercero() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: unknown) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/personas", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    if (!res.ok) {
      console.error(resData);
    }
    console.log(resData);
    queryClient.invalidateQueries(["trabajadores"]);
    navigate("/personal");
  });
  const [value, setValue] = useState<AccordionValue>("datos-cotizacion"); //Mantiene el estado en un componente.
  const datosCotizacionForm = useForm<DatosCotizacionForm>({
    resolver: zodResolver(datosCotizacionSchema),
  });
  function onSubmitCot(values: DatosCotizacionForm) {
    console.log(values);
    guardarCotizacion();
  }

  function guardarCotizacion() {
    const datosCotizacion = datosCotizacionForm.getValues();
    const cotizacion = {
      datosCotizacion: datosCotizacion,
    };
    console.log(cotizacion);
    mutation.mutate(cotizacion);
  }
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/personal_terceros">
                Personal de terceros
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/agregar-tercero`}>
                Agregar tercero
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="p-4">
        <Accordion
          type="single"
          collapsible
          value={value}
          onValueChange={setValue}
        >
          <AccordionItem value="datos-medicos">
            <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 p-4 rounded-t-md transition-colors">
              Datos de tercero
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <section>
                <Form {...datosCotizacionForm}>
                  <form
                    className="grid grid-cols-3 gap-4"
                    onSubmit={datosCotizacionForm.handleSubmit(onSubmitCot)}
                  >
                    <FormField
                      control={datosCotizacionForm.control}
                      name="titulo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosCotizacionForm.control}
                      name="nombreContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RFC</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosCotizacionForm.control}
                      name="contratante"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contratante</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosCotizacionForm.control}
                      name="tipoContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NSS</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosCotizacionForm.control}
                      name="numeroContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>INE</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosCotizacionForm.control}
                      name="inicioContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CURP</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosCotizacionForm.control}
                      name="estado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado del Empleado</FormLabel>
                          <FormControl>
                            <FormSelect
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Selecciona estado empleado"
                            >
                              <SelectItem value="activo">Activo</SelectItem>
                              <SelectItem value="inactivo">Inactivo</SelectItem>
                            </FormSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea">
                      Guardar
                    </Button>
                  </form>
                </Form>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
