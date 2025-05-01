import { z } from "zod";
import { PersonalContrato } from "./personalContrato";
import { Fianza } from "./datosFianza";
import { Contratado } from "./datosContratado";
import { Persona } from "./personal";

export const TipoContratoEnum = z.enum(["indefinido", "temporal", "porObra"]);
export type TipoContratoEnum = z.infer<typeof TipoContratoEnum>;

export const Contrato = z.object({
  idcontrato: z.number(),
  nombrecontrato: z.string(),
  subcontrato: z.string(),
  idcontratofuente: z.string().nullable(),
  numerocontrato: z.string().nullable().optional(),
  contratado: Contratado.nullable().optional(),
  facturas: z.array(z.object({})).optional(),
  iniciocontrato: z.string().date(),
  fincontrato: z.string().date().optional().nullable(),
  montocontrato: z.string(),
  anticipocontrato: z.string(),
  direccion: z.string(),
  convenios: z
    .object({
      idconvenio: z.number(),
      fechainicio: z.string().date().nullable(),
      fechafinal: z.string().date().nullable(),
      montoadicional: z.string().nullable(),
      documento: z.string().nullable(),
    })
    .array()
    .optional(),
  personalcontrato: PersonalContrato.partial().array().optional(),
  fianzaCumplimiento: Fianza.optional().nullable().optional(),
  fianzaAnticipo: Fianza.optional().nullable().optional(),
  fianzaOculto: Fianza.optional().nullable().optional(),
  datosPersonal: Persona.nullable().optional(),
});

// Exportamos el tipo basado en el esquema
export type Contrato = z.infer<typeof Contrato>;
