"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  name: string;
  birthDate: string;
  curp: string;
  rfc: string;
  state: string;
  accions: string;
};

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "id",
    header: "Id"
  },
  { accessorKey: "name",
    header: "Nombre"
  },
  { accessorKey: "birthDate",
    header: "Fecha de Nacimiento"
  },
  { accessorKey: "curp",
    header: "Curp"
  },
  {
    accessorKey: "rfc",
    header: "RFC",
  },
  {
    accessorKey: "state",
    header: "Estado",
  },
  {
    accessorKey: "accions",
    header: "Acciones",
  },
];
