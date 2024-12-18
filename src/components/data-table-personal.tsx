import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@radix-ui/react-separator";
import { Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";

import { useQuery } from "@tanstack/react-query";
import * as z from "zod";

export type EmployeInformation = {
  id: string;
  nombre: string;
  fechanacimiento: Date;
  curp: string;
  rfc: string;
  estado: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<EmployeInformation>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "fechanacimiento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de nacimiento
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("fechanacimiento")}</div>
    ),
  },
  {
    accessorKey: "curp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Curp
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("curp")}</div>,
  },
  {
    accessorKey: "rfc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RFC
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("rfc")}</div>,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("estado")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const EmployeInformation = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones de empleado</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(EmployeInformation.id)
              }
            >
              <Link to={`/detalles-trabajador/${EmployeInformation.id}`}>
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Subir archivo</DropdownMenuItem>
            <DropdownMenuItem>Descargar archivo</DropdownMenuItem>
            <DropdownMenuItem>Generar reporte</DropdownMenuItem>
            <DropdownMenuItem>Generar credencial</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Borrar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Persona = z.object({
  id: z.string(),
  nombre: z.string(),
  fechanacimiento: z.string(),
  curp: z.string(),
  rfc: z.string(),
  estado: z.string(),
});

async function fetchTrabajadores() {
  const res = await fetch("http://localhost:3001/personas", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await res.json();

  if (!res.ok) {
    console.error(resData);
    throw new Error(resData.message);
  }

  // Validamos los datos con Zod
  const personaParse = z.array(Persona).safeParse(resData);

  if (!personaParse.success) {
    console.error(personaParse.error);
    throw new Error("Error en la validación de datos");
  }

  return personaParse.data;
}


export function DataTableDemo() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["trabajadores"],
    queryFn: fetchTrabajadores,
    // Se puede agregar un `retry` o un `staleTime` si es necesario
    retry: 2, // Intentar de nuevo si falla
    staleTime: 60000, // 1 minuto antes de marcar los datos como obsoletos
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  /*AQUÍ VOY A PONER LA PARTE QUE ME PERMITE EXPORTAR DATOS PARA EXCEL*/

  const exportToExcel = (personas: any[]) => {
    if (!personas || personas.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const datos = personas.map((persona) => ({
      ID: persona.id,
      Nombre: persona.nombre,
      "Fecha de Nacimiento": persona.fechanacimiento,
      CURP: persona.curp,
      RFC: persona.rfc,
      "Número Fijo": persona.numerofijo,
      "Número Celular": persona.numerocelular,
      Dirección: persona.direccion,
      "Número de Licencia": persona.numerolicencia,
      "Número de Pasaporte": persona.numeropasaporte,
      "Fecha de Ingreso": persona.fechaingreso,
      Estado: persona.estado,
      "Tipo de Contrato": persona.tipocontrato,
      "Inicio del Contrato": persona.iniciocontrato,
      "Fin del Contrato": persona.fincontrato,
      Correo: persona.correo,
      INE: persona.ine,
      "Estado Civil": persona.estadocivil,
      "Cédula Profesional": persona.formacademica?.cedula || "N/A",
      Carrera: persona.formacademica?.carrera || "N/A",
      "Experiencia Laboral": persona.formacademica?.explaboral || "N/A",
      Certificaciones: persona.formacademica?.certificaciones || "N/A",
      "Grado de Estudios": persona.formacademica?.gradoestudios || "N/A",
      Alergias: persona.datosmedico?.alergias || "N/A",
      "Enfermedades Crónicas": persona.datosmedico?.enfercronicas || "N/A",
      Lesiones: persona.datosmedico?.lesiones || "N/A",
      "Alergias a Medicamentos": persona.datosmedico?.alergiasmed || "N/A",
      "Número de Emergencia": persona.datosmedico?.numemergencia || "N/A",
      "Número de Seguro": persona.datosmedico?.numseguro || "N/A",
      "Tipo de Sangre": persona.datosmedico?.tiposangre || "N/A",
      "Contacto de Emergencia": persona.datosmedico?.nombremergencia || "N/A",
      Género: persona.datosmedico?.genero || "N/A",
      "Relación de Emergencia": persona.datosmedico?.relaemergencia || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Personas");

    XLSX.writeFile(workbook, "Personal_oceanus.xlsx");
  };

  {
    /* AGREGAR DISEÑO AL APARTADO DE CARGANDO*/
  }
  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="rounded-md border p-4">
            <div className="flex space-x-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/5" />
              <Skeleton className="h-6 w-1/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Si ocurre un error, lo mostramos
  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <Separator className="h-6 w-px bg-gray-300 mx-4" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-0">
              Acciones <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Acciones de tabla</DropdownMenuLabel>
            <DropdownMenuItem>Copiar datos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportToExcel(data)}>
              Exportar a Excel
            </DropdownMenuItem>
            <DropdownMenuItem>Exportar a PDF</DropdownMenuItem>
            <DropdownMenuItem>Imprimir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
