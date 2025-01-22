import { z } from "zod";

export const Subcontratado = z.object({
  idsubcontratado: z.number(),
  nombre: z.string(),
  rfc: z.string(),
  nss: z.string(),
  ine: z.string(),
  curp: z.string(),
  estado: z.string(),
  doc: z.string(),
});

export type Subcontratado = z.infer<typeof Subcontratado>;
