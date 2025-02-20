import { z } from "zod";
import { PersonalContrato } from "./personalContrato";
import { Fianza } from "./datosFianza";
import { Contratado } from "./datosContratado";
import { Persona } from "./personal";

export const Contrato = z.object({
  idcontrato: z.number(),
  nombrecontrato: z.string(),
  subcontrato: z.string(),
  idcontratofuente: z.string().nullable(),
  numerocontrato: z.string(),
  contratado: Contratado.nullable(),
  facturas: z.array(z.object({})),
  iniciocontrato: z.string().date(),
  fincontrato: z.string().date().optional().nullable(),
  montocontrato: z.string(),
  anticipocontrato: z.string(),
  direccion: z.string(),
  convenio: z.array(z.object({})).optional(),
  personalcontrato: PersonalContrato.partial().array(),
  fianzaCumplimiento: Fianza.optional().nullable(),
  fianzaAnticipo: Fianza.optional().nullable(),
  fianzaOculto: Fianza.optional().nullable(),
  datosPersonal: Persona.nullable().optional(),
});

// Exportamos el tipo basado en el esquema
export type Contrato = z.infer<typeof Contrato>;
