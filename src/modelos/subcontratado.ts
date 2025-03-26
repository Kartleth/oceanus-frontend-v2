import { z } from "zod";
import { Contrato } from "./datosContratos";

export const EstadoSubcontratado = z.enum(["Activo", "Inactivo"]);

export const Subcontratado = z.object({
  idsubcontratado: z.number(),
  nombre: z.string(),
  rfc: z.string().max(13),
  nss: z.string().nullable(),
  ine: z.string().nullable(),
  curp: z.string().max(18),
  estado: EstadoSubcontratado,
  doc: z.string().nullable(),
  constrato: Contrato.nullable(),
});

export type Subcontratado = z.infer<typeof Subcontratado>;
