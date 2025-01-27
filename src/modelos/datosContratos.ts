import { z } from "zod";
import { PersonalContrato } from "./personalContrato";
import { Fianza } from "./datosFianza";
import { Contratante } from "./datosContratante";
import { Contratado } from "./datosContratado";

export const Contrato = z.object({
  idcontrato: z.number(),
  nombrecontrato: z.string(),
  subcontrato: z.string(),
  idcontratofuente: z.number().nullable(),
  numerocontrato: z.string(),
  contratante: Contratante.nullable(),
  contratado: Contratado.nullable(),
  facturas: z.array(z.object({})),
  iniciocontrato: z.string().date(),
  fincontrato: z.string().date().optional().nullable(),
  montocontrato: z.string(),
  anticipocontrato: z.string(),
  direccion: z.string(),
  convenio: z.array(z.object({})).optional(),
  personalcontrato: PersonalContrato.partial().array(),
  fianzacumplimiento: Fianza.optional().nullable(),
  fianzaanticipo: Fianza.optional().nullable(),
  fianzaoculto: Fianza.optional().nullable(),
});

// Exportamos el tipo basado en el esquema
export type Contrato = z.infer<typeof Contrato>;
