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
} from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const datosFianzaOcultosSchema = z.object({
  documento: z.string({
    required_error: "Nombre de contrato obligatorio.",
  }),
  tipodecambio: z.string({ required_error: "Campo obligatorio." }),
  idcontratofuente: z
    .string({ required_error: "Escribe correctamente el campo." })
    .optional(),
  anticipodoc: z.string({ required_error: "" }),
  inicio: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
  fin: z
    .date()
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    })
    .optional(),
  poliza: z.number(),
  aseguradora: z.number(),
  monto: z.string(),
});

export type DatosFianzaOcultos = z.infer<typeof datosFianzaOcultosSchema>;

interface DatosFianzaOcultosProps {
  onSubmit: (values: DatosFianzaOcultos) => void;
  form: UseFormReturn<DatosFianzaOcultos>;
}

export const DatosFianzaOcultosForm: FC<DatosFianzaOcultosProps> = ({
  onSubmit: onSubmitCon,
  form,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitCon)}
      >
        <FormField
          control={form.control}
          name="documento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anticipodoc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anticipo Documento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Ingreso del Contrato</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  onChange={field.onChange}
                  maxDate={new Date()}
                  minDate={new Date(1900, 1, 1)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha final del Contrato</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  minDate={new Date(1900, 1, 1)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poliza"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poliza</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aseguradora"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aseguradora</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
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
