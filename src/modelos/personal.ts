import { z } from "zod";

export const Persona = z.object({
  id: z.number(),
  nombre: z.string(),
  fechanacimiento: z.string().date(),
  curp: z.string(),
  rfc: z.string(),
  estado: z.string(),
});

export type Persona = z.infer<typeof Persona>;