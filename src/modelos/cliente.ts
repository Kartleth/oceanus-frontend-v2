import { z } from "zod";

// Información de la Empresa
export const Cliente = z.object({
  idCliente: z.number(),
  razonsocial: z.string().optional().nullable(),
  correo: z.string().optional().nullable(),
  telefono: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),

  // Representante legal
  representantelegal: z.string().optional().nullable(),
  correoRepresentantelegal: z.string().optional().nullable(),
  telefonoRepresentantelegal: z.string().optional().nullable(),

  // Datos de facturación
  rfc: z.string(),
  correofacturacion: z.string().optional().nullable(),
  constanciafiscal: z.string().optional().nullable(),
  tiporegimen: z.string().optional().nullable(),
  numerocuenta: z.string().optional().nullable(),
  banco: z.string().optional().nullable(),
  nombrecontrato: z.string().optional().nullable(),
  fechavencimientoconstancia: z.string().nullable().optional(),

  //Datos de contacto administrativo
  nombreAdministrativo: z.string().optional().nullable(),
  correoAdministrativo: z.string().optional().nullable(),
  telefonoAdministrativo: z.string().optional().nullable(),

  // Relaciones
  //contratosEmitidos: z.array(z.unknown()).optional(), // Si necesitas agregar detalles de contratos, los defines aquí
  //contratosRecibidos: z.array(z.unknown()).optional(),
  //empresapersonal: z.array(z.unknown()).optional(),
  //facturas: z.array(z.unknown()).optional(),
});

export type Cliente = z.infer<typeof Cliente>;
