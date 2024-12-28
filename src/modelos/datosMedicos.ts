import { z } from "zod";

export const DatosMedicos = z.object({
  numseguro: z.string(),
  numemergencia: z.string(),
  relaemergencia: z.string(),
  tiposangre: z.string(),
  genero: z.string(),
  alergias: z.string(),
  alergiasmed: z.string(),
  lesiones: z.string(),
  enfercronicas: z.string(),
  nombremergencia: z.string(),
});

export type DatosMedicos = z.infer<typeof DatosMedicos>;
