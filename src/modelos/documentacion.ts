import { z } from "zod";

export const Documentacion = z.object({
  credencial: z.string(),
  licencia: z.string(),
  pasaporte: z.string(),
  cv: z.string(),
  curp: z.string(),
  inss: z.string(),
  constanciasat: z.string(),
  foto: z.string(),
  actnacimiento: z.string(),
  estcuenta: z.string(),
  altasegsocial: z.string(),
  cedulaprofe: z.string(),
  copiacontrato: z.string(),
  comprodomicilio: z.string()
});

export type Documentacion = z.infer<typeof Documentacion>;
