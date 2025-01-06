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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export const datosMedicosSchema = z.object({
  alergias: z.string({ message: "Introduce el tipo de alergias." }).optional(),
  enfercronicas: z
    .string({ message: "Introduce si padeces de una enfermedad cronica." })
    .optional(),
  lesiones: z.string({ message: "Introduce lesiones." }).optional(),
  alergiasmed: z.string({ message: "" }),
  numseguro: z.string({ required_error: "Numero seguro obligatorio." }),
  relaemergencia: z.string({
    required_error: "Relacion con trabajador obligaoria.",
  }),
  numemergencia: z.string({
    required_error: "Numero de emergencia obligatorio.",
  }),
  tiposangre: z.string({ required_error: "Tipo de sangre obligatorio." }),
  genero: z.string({ required_error: "Genero obligatorio." }),
  nombremergencia: z.string({
    required_error: "Nombre de persona emergencia obligatorio.",
  }),
});
export type DatosMedicos = z.infer<typeof datosMedicosSchema>;

interface DatosMedicosProps {
  onSubmitMed: (values: DatosMedicos) => void;
  form: UseFormReturn<DatosMedicos>;
}

export const DatosMedicosForm: FC<DatosMedicosProps> = ({
  onSubmitMed,
  form,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitMed)}
      >
        <FormField
          control={form.control}
          name="alergias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alergias</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alergiasmed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alergias a Medicamentos</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enfercronicas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enfermedad Cronica</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lesiones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesiones</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numemergencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de emergencia</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nombremergencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de emergencia</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numseguro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de seguro</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relaemergencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relacion con la persona</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tiposangre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de sangre</FormLabel>
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
