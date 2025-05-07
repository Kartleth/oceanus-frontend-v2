import { z } from "zod";

export const Fianza = z.object({
  idfianza: z.number(),
  tipo: z.enum(["ANTICIPO", "OCULTO", "CUMPLIMIENTO"]),
  documento: z.string().nullable().optional(),
  anticipodoc: z.string().nullable().optional(),
  tipodecambio: z.enum(["PESO","DOLAR"]),
  inicio: z.string().date().nullable(),
  fin: z.string().date().nullable(),
  poliza: z.string(),
  aseguradora: z.string(),
  monto: z.string().transform((val) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      throw new Error("El monto debe ser un número válido.");
    }
    return num;
  }).refine((val) => val > 0, {
    message: "El monto debe ser mayor a 0",
  }),
  idcontrato: z.number().optional().nullable(),
});

export type Fianza = z.infer<typeof Fianza>;
