import { z } from "zod";

export const Contratante = z.object({
  idempresa: z.number(),
  logo: z.string(),
  rfc: z.string(),
  razonsocial: z.string(),
  representantelegal: z.string(),
  nombrecontrato: z.string(),
  correo: z.string(),
  telefono: z.string(),
  correofacturacion: z.string(),
  numerocuenta: z.string(),
  banco: z.string(),
  tiporegimen: z.string(),
  constancialfiscal: z.string(),
  fechavencimientoconstancia: z.string().date(),
});

// Exportamos el tipo basado en el esquema
export type Contratante = z.infer<typeof Contratante>;
