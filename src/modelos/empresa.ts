import { z } from "zod";

// Información de la Empresa
export const Empresa = z.object({
  idempresa: z.number(),
  razonsocial: z.string(),
  correo: z.string().email().optional(),
  telefono: z.string().optional(),
  logo: z.string().nullable(),

  // Representante legal
  representantelegal: z.string().optional(),
  correoRepresentantelegal: z.string().email().optional(),
  telefonoRepresentantelegal: z.string().optional(),

  // Datos de facturación
  rfc: z.string().min(12).max(13),
  correofacturacion: z.string().email().nullable(),
  constanciafiscal: z.string().max(200).nullable(),
  tiporegimen: z.string().optional(),
  numerocuenta: z.string().optional(),
  banco: z.string().optional(),
  nombrecontrato: z.string().nullable(),
  fechavencimientoconstancia: z.string().date().optional(),

  // Relaciones
  //contratosEmitidos: z.array(z.unknown()).optional(), // Si necesitas agregar detalles de contratos, los defines aquí
  //contratosRecibidos: z.array(z.unknown()).optional(),
  //empresapersonal: z.array(z.unknown()).optional(),
  //facturas: z.array(z.unknown()).optional(),
});

export type Empresa = z.infer<typeof Empresa>;
