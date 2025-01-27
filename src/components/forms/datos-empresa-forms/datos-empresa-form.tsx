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
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";

export const datosEmpresaSchema = z.object({
  razonsocial: z
    .string({ required_error: "Razón social obligatoria." })
    .max(150, { message: "Razón social no puede exceder de 150 caracteres." })
    .min(1, { message: "Razón social obligatoria." }),
  correo: z
    .string()
    .max(50, { message: "Correo incorrecto." })
    .email({ message: "Correo electrónico incorrecto." })
    .optional(),
  telefono: z
    .string()
    .regex(/^\d{10}$/, { message: "Número de teléfono debe tener 10 dígitos." })
    .optional(),
});

export type DatosEmpresa = z.infer<typeof datosEmpresaSchema>;

interface DatosEmpresaProps {
  onSubmitEmp: (values: DatosEmpresa) => void;
  form: UseFormReturn<DatosEmpresa>;
}

export const DatosEmpresaForm: FC<DatosEmpresaProps> = ({ form, onSubmitEmp }) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitEmp)}
      >
        <FormField
          control={form.control}
          name="razonsocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón social</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea">
          Siguiente
        </Button>
      </form>
    </Form>
  );
};
