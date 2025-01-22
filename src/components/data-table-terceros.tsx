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
export const data: TercerosInformation[] = [
  {
    id: "1",
    nombre: "Juan Pérez",
    rfc: "PEJ800101XYZ",
    nss: "12345678901",
    ine: "INE123456789",
    curp: "PEJ800101HDFRZN08",
    estado: "Activo",
  },
  {
    id: "2",
    nombre: "María López",
    rfc: "LOM850202ABC",
    nss: "10987654321",
    ine: "INE987654321",
    curp: "LOM850202MDFRPR09",
    estado: "Inactivo",
  },
  {
    id: "3",
    nombre: "Carlos Gómez",
    rfc: "GOC900303JKL",
    nss: "23456789012",
    ine: "INE234567890",
    curp: "GOC900303HDFRZN05",
    estado: "Activo",
  },
  {
    id: "4",
    nombre: "Laura Ramírez",
    rfc: "RAL940404DEF",
    nss: "34567890123",
    ine: "INE345678901",
    curp: "RAL940404MDFRMR02",
    estado: "Suspendido",
  },
  {
    id: "5",
    nombre: "Pedro Sánchez",
    rfc: "SAP950505GHJ",
    nss: "45678901234",
    ine: "INE456789012",
    curp: "SAP950505HDFRNC06",
    estado: "Activo",
  },
  {
    id: "6",
    nombre: "Ana Torres",
    rfc: "TOA960606QWE",
    nss: "56789012345",
    ine: "INE567890123",
    curp: "TOA960606MDFRMC04",
    estado: "Baja",
  },
  {
    id: "7",
    nombre: "Luis Hernández",
    rfc: "HEL970707RTY",
    nss: "67890123456",
    ine: "INE678901234",
    curp: "HEL970707HDFRLN07",
    estado: "Activo",
  },
];

export type TercerosInformation = {
  id: string;
  nombre: string;
  rfc: string;
  nss: string;
  ine: string;
  curp: string;
  estado: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<TercerosInformation>[] = [
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
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("rfc")}</div>
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
          CURP
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("curp")}</div>
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
              <Link to={`/detalles-terceros`}>Ver detalles</Link>
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

export function DataTableTerceros() {
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
