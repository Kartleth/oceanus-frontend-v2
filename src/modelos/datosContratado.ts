import { z } from "zod";

export const Contratado = z.object({
  idCliente: z.number(),
  logo: z.string().optional().nullable(),
  rfc: z.string(),
  razonsocial: z.string().optional().nullable(),
  representantelegal: z.string(),
  nombrecontrato: z.string(),
  correo: z.string(),
  telefono: z.string(),
  correofacturacion: z.string(),
  numerocuenta: z.string(),
  banco: z.string(),
  tiporegimen: z.string(),
  constanciafiscal: z.string().optional().nullable(),
  fechavencimientoconstancia: z.string().date(),
});

// Exportamos el tipo basado en el esquema
export type Contratado = z.infer<typeof Contratado>;
