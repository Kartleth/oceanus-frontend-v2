"use client";

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
import * as XLSX from "xlsx";

// eslint-disable-next-line react-refresh/only-export-components
export const data: CotizacionInformation[] = [
  {
    id: "1",
    titulo: "Contrato de Servicios",
    nombre_contrato:
      "Innovaciones Tecnológicas S.A. de C.V. - Contrato de Servicios",
    contratante: "Innovaciones Tecnológicas S.A. de C.V.",
    contratado: "Proveedor A",
    tipo_contrato: "Servicios",
    numero_contrato: "SERV-001",
    inicio_contrato: "2025-01-01",
    fin_contrato: "2025-12-31",
    monto_contrato: "$100,000.00",
    anticipo_contrato: "$10,000.00",
    subcontrato: "Subcontrato A",
    seleccionar: false,
    direccion: "Calle Falsa 123, Ciudad",
  },
  {
    id: "2",
    titulo: "Consultoría Empresarial",
    nombre_contrato: "Servicios Empresariales Globales - Consultoría",
    contratante: "Servicios Empresariales Globales",
    contratado: "Proveedor B",
    tipo_contrato: "Consultoría",
    numero_contrato: "CONS-002",
    inicio_contrato: "2025-02-01",
    fin_contrato: "2025-11-30",
    monto_contrato: "$200,000.00",
    anticipo_contrato: "$20,000.00",
    subcontrato: "Subcontrato B",
    seleccionar: false,
    direccion: "Avenida Central 456, Ciudad",
  },
  {
    id: "3",
    titulo: "Proyecto de Infraestructura",
    nombre_contrato: "Constructora del Norte - Proyecto de Infraestructura",
    contratante: "Constructora del Norte",
    contratado: "Proveedor C",
    tipo_contrato: "Construcción",
    numero_contrato: "CONST-003",
    inicio_contrato: "2025-03-01",
    fin_contrato: "2025-09-30",
    monto_contrato: "$300,000.00",
    anticipo_contrato: "$30,000.00",
    subcontrato: "Subcontrato C",
    seleccionar: false,
    direccion: "Boulevard Principal 789, Ciudad",
  },
  {
    id: "4",
    titulo: "Suministro de Equipos",
    nombre_contrato:
      "Soluciones Ambientales y Energéticas - Suministro de Equipos",
    contratante: "Soluciones Ambientales y Energéticas",
    contratado: "Proveedor D",
    tipo_contrato: "Suministro",
    numero_contrato: "SUM-004",
    inicio_contrato: "2025-04-01",
    fin_contrato: "2025-10-31",
    monto_contrato: "$400,000.00",
    anticipo_contrato: "$40,000.00",
    subcontrato: "Subcontrato D",
    seleccionar: false,
    direccion: "Camino Verde 101, Ciudad",
  },
  {
    id: "5",
    titulo: "Producción Agrícola",
    nombre_contrato: "Agroindustrias del Pacífico - Producción Agrícola",
    contratante: "Agroindustrias del Pacífico",
    contratado: "Proveedor E",
    tipo_contrato: "Agricultura",
    numero_contrato: "AGR-005",
    inicio_contrato: "2025-05-01",
    fin_contrato: "2025-12-31",
    monto_contrato: "$500,000.00",
    anticipo_contrato: "$50,000.00",
    subcontrato: "Subcontrato E",
    seleccionar: false,
    direccion: "Carretera Vieja 202, Ciudad",
  },
  {
    id: "6",
    titulo: "Diseño Gráfico",
    nombre_contrato: "Diseños Creativos Internacionales - Diseño Gráfico",
    contratante: "Diseños Creativos Internacionales",
    contratado: "Proveedor F",
    tipo_contrato: "Diseño",
    numero_contrato: "DIS-006",
    inicio_contrato: "2025-06-01",
    fin_contrato: "2025-08-31",
    monto_contrato: "$600,000.00",
    anticipo_contrato: "$60,000.00",
    subcontrato: "Subcontrato F",
    seleccionar: false,
    direccion: "Calle Creativa 303, Ciudad",
  },
  {
    id: "7",
    titulo: "Asesoría Financiera",
    nombre_contrato: "Consultores en Finanzas y Negocios - Asesoría Financiera",
    contratante: "Consultores en Finanzas y Negocios",
    contratado: "Proveedor G",
    tipo_contrato: "Finanzas",
    numero_contrato: "FIN-007",
    inicio_contrato: "2025-07-01",
    fin_contrato: "2025-11-30",
    monto_contrato: "$700,000.00",
    anticipo_contrato: "$70,000.00",
    subcontrato: "Subcontrato G",
    seleccionar: false,
    direccion: "Avenida Financiera 404, Ciudad",
  },
];

export type CotizacionInformation = {
  id: string;
  titulo: string;
  nombre_contrato: string;
  contratante: string;
  contratado: string;
  tipo_contrato: string;
  numero_contrato: string;
  inicio_contrato: string;
  fin_contrato: string;
  monto_contrato: string;
  anticipo_contrato: string;
  subcontrato: string;
  seleccionar: boolean;
  direccion: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<CotizacionInformation>[] = [
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
    accessorKey: "nombre_contrato",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre de contrato
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("nombre_contrato")}</div>
    ),
  },
  {
    accessorKey: "contratante",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contratante
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("contratante")}</div>
    ),
  },
  {
    accessorKey: "inicio_contrato",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inicio de contrato
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("inicio_contrato")}</div>
    ),
  },
  {
    accessorKey: "fin_contrato",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fin de contrato
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("fin_contrato")}</div>
    ),
  },
  {
    accessorKey: "monto_contrato",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto de contrato
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("monto_contrato")}</div>
    ),
  },
  {
    accessorKey: "anticipo_contrato",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Anticipo de contrato
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("anticipo_contrato")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const CompaniesInformation = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones de empresa</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(CompaniesInformation.id)
              }
            >
              <Link to={`/detalles-cotizacion`}>Ver detalles</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/subir-archivos-cotizacion`}>Gestionar archivos</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Borrar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableCotizaciones() {
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

  /*LÓGICA PARA EXPORTAR DATOS PARA EXCEL Y PDF*/
  const exportToExcel = (CotizacionInformation: CotizacionInformation[]) => {
    if (!CotizacionInformation || CotizacionInformation.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const datos = CotizacionInformation.map((CotizacionInformation) => ({
      ID: CotizacionInformation.id,
      Título: CotizacionInformation.titulo,
      "Nombre de contrato": CotizacionInformation.nombre_contrato,
      Contratante: CotizacionInformation.contratante,
      Contratado: CotizacionInformation.contratado,
      "Tipo de contrato": CotizacionInformation.tipo_contrato,
      "Numero de contrato": CotizacionInformation.numero_contrato,
      "Inicio de contrato": CotizacionInformation.inicio_contrato,
      "Fin de contrato": CotizacionInformation.fin_contrato,
      "Monto de contrato": CotizacionInformation.monto_contrato,
      "Anticipo de contrato": CotizacionInformation.anticipo_contrato,
      SubContrato: CotizacionInformation.subcontrato,
      Seleccionar: CotizacionInformation.seleccionar,
      Dirección: CotizacionInformation.direccion,
    }));

    // Exportar a Excel
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizacion");
    XLSX.writeFile(workbook, "Cotizacion_oceanus.xlsx");
  };

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
            <DropdownMenuItem
              onClick={() => exportToExcel(data)}
            >
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
      <div className="rounded-md border">
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
