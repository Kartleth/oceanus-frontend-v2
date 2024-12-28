import { z } from "zod";

export const DatosAcademicos = z.object({
  carrera: z.string(),
  cedula: z.string(),
  certificaciones: z.string(),
  explaboral: z.string(),
  gradoestudios: z.string(),
});

export type DatosAcademicos = z.infer<typeof DatosAcademicos>;
