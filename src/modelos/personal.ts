import { z } from "zod";
import { DatosAcademicos } from "./datosAcademicos";
import { DatosMedicos } from "./datosMedicos";

export const Persona = z.object({
  id: z.number(),
  nombre: z.string(),
  fechanacimiento: z.string().date(),
  curp: z.string(),
  rfc: z.string(),
  estado: z.string(),
  correo: z.string(),
  direccion: z.string(),
  estadocivil: z.string(),
  fechaingreso: z.string(),
  fincontrato: z.string(),
  ine: z.string(),
  iniciocontrato: z.string().date(),
  numerocelular: z.string(),
  numerofijo: z.string(),
  numerolicencia: z.string(),
  numeropasaporte: z.string(),
  tipocontrato: z.string(),
  datosMedicos: DatosMedicos,
  datosAcademicos: DatosAcademicos,
});

export type Persona = z.infer<typeof Persona>;
