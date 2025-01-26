import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const datosAcademicosSchema = z.object({
  cedula: z
    .string({ required_error: "Ingresa cedula profesional." })
    .optional(),
  carrera: z.string({ required_error: "Carrera obligatorio." }),
  explaboral: z
    .string({ required_error: "Ingresa experiencia laboral." })
    .optional(),
  certificaciones: z
    .string({ required_error: "Introduce certificaciones." })
    .optional(),
  gradoestudios: z.string({ required_error: "Nivel de estudios obligatorio" }),
});

export type DatosAcademicos = z.infer<typeof datosAcademicosSchema>;

interface DatosAcademicosProps {
  onSubmitAcd: (values: DatosAcademicos) => void;
  form: UseFormReturn<DatosAcademicos>;
}

export const DatosAcademicosForm: FC<DatosAcademicosProps> = ({
  onSubmitAcd,
  form,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitAcd)}
      >
        <FormField
          control={form.control}
          name="cedula"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cedula Profesional</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carrera"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carrera</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="certificaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certificaciones</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explaboral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Experiencia Laboral</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gradoestudios"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grado de Estudios</FormLabel>
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
