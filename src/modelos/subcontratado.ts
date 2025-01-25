import { z } from "zod";

export const Subcontratado = z.object({
  idsubcontratado: z.number(),
  nombre: z.string(),
  rfc: z.string(),
  nss: z.string().nullable(),
  ine: z.string(),
  curp: z.string(),
  estado: z.string(),
  doc: z.string().nullable(),
});

export type Subcontratado = z.infer<typeof Subcontratado>;
