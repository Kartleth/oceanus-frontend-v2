import { z } from "zod";

export const TipoDeCambio = z.enum(["dolar", "peso"]);
export const Fianza = z.object({
  idfianza: z.number(),
  documento: z.string().nullable(),
  tipodecambio: TipoDeCambio,
  // anticipodoc: z.string().nullable(),
  inicio: z.string().date(),
  fin: z.string().date().nullable(),
  poliza: z.string(),
  aseguradora: z.string(),
  monto: z.string(),
});

// Exportamos el tipo basado en el esquema
export type Fianza = z.infer<typeof Fianza>;
