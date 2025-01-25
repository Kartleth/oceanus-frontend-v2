import { z } from "zod";
import { Persona } from "./personal";

export const TipoPersonal = z.enum(["oceanus", "terceros"]);
export const PersonalContrato = z.object({
  persona: Persona.partial().optional().nullable(),
  contrato: z.object({ idcontrato: z.number() }).optional().nullable(), //todas propiedades de contrato son opcionales.
  id: z.number(),
  tipopersonal: TipoPersonal,
});

// Exportamos el tipo basado en el esquema
export type PersonalContrato = z.infer<typeof PersonalContrato>;
