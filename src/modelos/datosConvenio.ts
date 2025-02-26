import { z } from "zod";
import { Contrato } from "./datosContratos";

export const Convenio = z.object({
  idconvenio: z.number(),
  fechainicio: z.string().date().nullable(),
  fechafinal: z.string().date().nullable(),
  montoadicional: z.string().nullable(),
  documento: z.string().nullable(),
  contrato: Contrato.optional().nullable(),
});

export type Convenio = z.infer<typeof Convenio>;
