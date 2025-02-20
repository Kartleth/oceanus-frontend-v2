import { z } from "zod";
import { Contrato } from "./datosContratos";

export const Convenio = z.object({
  idconvenio: z.number(),
  fechainicio: z.string(),
  fechafinal: z.string().date(),
  montoadicional: z.string(),
  documento: z.string(),
  contrato: Contrato.optional().nullable(),
});

export type Convenio = z.infer<typeof Convenio>;
