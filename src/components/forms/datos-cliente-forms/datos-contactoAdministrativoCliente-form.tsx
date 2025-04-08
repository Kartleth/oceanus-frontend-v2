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

export const datosContactoAdminSchema = z.object({
  nombreAdministrativo: z.string().optional().nullable(),
  correoAdministrativo: z
    .string()
    .email({ message: "Correo electrónico incorrecto." })
    .nullable()
    .optional(),
  telefonoAdministrativo: z
    .string()
    .regex(/^\d{10}$/, { message: "Número de teléfono debe tener 10 dígitos." })
    .nullable()
    .optional(),
});

export type DatosContactoAdmin = z.infer<typeof datosContactoAdminSchema>;

interface DatosContactoAdminProps {
  onSubmitConAdm: (values: DatosContactoAdmin) => void;
  form: UseFormReturn<DatosContactoAdmin>;
}

export const DatosContactoAdminForm: FC<DatosContactoAdminProps> = ({
  form,
  onSubmitConAdm,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitConAdm)}
      >
        <FormField
          control={form.control}
          name="nombreAdministrativo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de administrativo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="correoAdministrativo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo de Administrativo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefonoAdministrativo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono de Administrativo</FormLabel>
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
