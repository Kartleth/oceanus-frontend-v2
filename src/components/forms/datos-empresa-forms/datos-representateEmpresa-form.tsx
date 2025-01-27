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

export const datosRepresentanteSchema = z.object({
  representantelegal: z.string().nullable().optional(),
  correoRepresentantelegal: z
    .string()
    .email({ message: "Correo electrónico incorrecto." })
    .nullable().optional(),
    telefonoRepresentantelegal: z
    .string()
    .regex(/^\d{10}$/, { message: "Número de teléfono debe tener 10 dígitos." })
    .nullable().optional(),
});

export type DatosRepresentante = z.infer<typeof datosRepresentanteSchema>;

interface DatosRepresentanteProps {
  onSubmitRepLeg: (values: DatosRepresentante) => void;
  form: UseFormReturn<DatosRepresentante>;
}

export const DatosRepresentanteForm: FC<DatosRepresentanteProps> = ({ form, onSubmitRepLeg }) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitRepLeg)}
      >
        <FormField
          control={form.control}
          name="representantelegal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Representante legal</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="correoRepresentantelegal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo de representante legal</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefonoRepresentantelegal"
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
          Guardar
        </Button>
      </form>
    </Form>
  );
};
