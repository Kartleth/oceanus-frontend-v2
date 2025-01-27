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
  fincontrato: z.string().date(),
  montocontrato: z.number(),
  anticipocontrato: z.number(),
  direccion: z.string(),
  convenio: z.array(z.object({})).optional(),
  personalcontrato: PersonalContrato.partial().array(),
  fianzaCumplimiento: Fianza.optional().nullable(),
  fianzaAnticipo: Fianza.optional().nullable(),
  fianzaOculto: Fianza.optional().nullable(),
});

// Exportamos el tipo basado en el esquema
export type Contrato = z.infer<typeof Contrato>;
