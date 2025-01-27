import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect, SelectItem } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";

export const datosTercerosSchema = z.object({
  nombre: z
    .string({ required_error: "Nombre completo obligatorio." })
    .max(150, {
      message: "El nombre no puede excederse de mas de 150 caracteres.",
    })
    .min(1, { message: "El nombre es obligatorio." }),
  rfc: z
    .string({
      required_error: "RFC es obligatoria.",
    })
    .regex(
      /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/gm,
      {
        message:
          "RFC incorrecto, no cumple con los digitos oficiales que complementan un RFCf.",
      }
    ),
  nss: z.string({ required_error: "Numero seguro obligatorio." }),
  ine: z
    .string({
      required_error:
        "Numero de INE incorrecto, debe cumplir con los 13 digitos correspondientes.",
    })
    .regex(/^\d{12,13}$/g, { message: "Numero de INE incorrecto." }),
  curp: z
    .string({
      required_error: "Curp es obligatoria.",
    })
    .regex(
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/gm,
      {
        message:
          "Curp incorrecta, debe cumplir con los digitos correctos de la curp oficial.",
      }
    ),
  estado: z.string({ required_error: "Campo obligatorio." }),
});

export type DatosTerceros = z.infer<typeof datosTercerosSchema>;

interface DatosTercerosProps {
  onSubmit: (values: DatosTerceros) => void;
  form: UseFormReturn<DatosTerceros>;
}

export const DatosTercerosForm: FC<DatosTercerosProps> = ({
  form,
  onSubmit,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="nombre"
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
          control={form.control}
          name="rfc"
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
          control={form.control}
          name="nss"
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
          control={form.control}
          name="ine"
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
          control={form.control}
          name="curp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curp</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <FormSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Selecciona un estado de contratación"
                >
                  <SelectItem value="Activo">Activo(a)</SelectItem>
                  <SelectItem value="Inactivo">Inactivo(a)</SelectItem>
                </FormSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea ">
          Siguiente
        </Button>
      </form>
    </Form>
  );
};
