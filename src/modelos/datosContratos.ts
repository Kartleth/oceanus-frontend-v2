import { z } from "zod";
import { PersonalContrato } from "./personalContrato";
import { Fianza } from "./datosFianza";
import { Subcontratado } from "./subcontratado";
import { Contratante } from "./datosContratante";
import { Contratado } from "./datosContratado";

export const Contrato = z.object({
  idcontarto: z.number(),
  nombrecontrato: z.string(),
  subcontrato: Subcontratado,
  idcontratofuente: z.number(),
  numerocontrato: z.string(),
  contratante: Contratante,
  contratado: Contratado,
  facturas: z.string(),
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
