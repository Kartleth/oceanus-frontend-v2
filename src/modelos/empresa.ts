import { z } from "zod";

// Datos de la Empresa
export const Empresa = z.object({
  idempresa: z.number(),
  razonsocial: z.string(),
  correo: z.string().email().nullable(),
  telefono: z.string().nullable(),
  logo: z.string().nullable(),

  // Representante legal
  represenatelegal: z.string().nullable(),
  correoRepresenatelegal: z.string().email().nullable(),
  telefonoRepresenatelegal: z.string().nullable(),

  // Datos de facturación
  rfc: z.string().min(12).max(13),
  correofacturacion: z.string().email().nullable(),
  constanciafiscal: z.string().max(200).nullable(),
  tiporegimen: z.string().nullable(),
  numerocuenta: z.string().nullable(),
  banco: z.string().nullable(),
  nombrecontrato: z.string().nullable(),
  fechavencimientoconstancia: z.string().date(),

  // Relaciones
  //contratosEmitidos: z.array(z.unknown()).optional(), // Si necesitas agregar detalles de contratos, los defines aquí
  //contratosRecibidos: z.array(z.unknown()).optional(),
  //empresapersonal: z.array(z.unknown()).optional(),
  //facturas: z.array(z.unknown()).optional(),
});


export type Empresa = z.infer<typeof Empresa>;
