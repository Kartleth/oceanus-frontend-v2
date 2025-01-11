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
import { useMutation } from "@tanstack/react-query";
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

const documentacionMap = {
  credencial: "Credencial",
  licencia: "Licencia de Conducir",
  pasaporte: "Pasaporte",
  cv: "Currículum Vitae",
  curp: "CURP",
  inss: "INSS",
  constanciasat: "Constancia SAT",
  foto: "Foto",
  actnacimiento: "Acta de Nacimiento",
  estcuenta: "Estado de Cuenta",
  altasegsocial: "Alta en Seguridad Social",
  cedulaprofe: "Cédula Profesional",
  copiacontrato: "Copia del Contrato",
  comprodomicilio: "Comprobante de Domicilio",
};

async function fetchDocumentacion(personaId: number) {
  try {
    const response = await fetch(
      `http://localhost:3001/documentacion/${personaId}`
    );
    if (!response.ok) {
      throw new Error("Error fetching documentacion");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching documentacion:", error);
    throw error;
  }
}

async function editDocumento(personaId: number, documento: Documento) {
  const response = await fetch(
    `http://localhost:3001/documentacion/${personaId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documento),
    }
  );
  if (!response.ok) {
    throw new Error("Error al editar el documento");
  }
  return response.json();
}

async function prepareTableData(personaId: number) {
  try {
    // Intenta obtener los documentos subidos
    const documentacion = await fetchDocumentacion(personaId);

    // Genera la lista completa con documentos esperados
    const tableData = Object.keys(documentacionMap).map((key) => {
      const nombreDocumentoEsperado = documentacionMap[key];
      const nombreDocumentoSubido = documentacion?.[key] || "-";
      const estatus = documentacion?.[key] ? "Subido" : "No subido";

      return {
        nombreDocumentoEsperado,
        nombreDocumentoSubido,
        estatus,
      };
    });

    return tableData;
  } catch (error) {
    console.error("Error preparing table data:", error);

    // En caso de error, devuelve la estructura base con todos los documentos esperados
    return Object.keys(documentacionMap).map((key) => ({
      nombreDocumentoEsperado: documentacionMap[key],
      nombreDocumentoSubido: "-",
      estatus: "No subido",
    }));
  }
}

interface Documento {
  nombreDocumentoEsperado: string;
  nombreDocumentoSubido: string;
  estatus: string;
}

export const columns: ColumnDef<Documento>[] = [
  {
    accessorKey: "nombreDocumentoEsperado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre Documento Esperado
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("nombreDocumentoEsperado")}</div>
    ),
  },
  {
    accessorKey: "nombreDocumentoSubido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Documento subido
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("nombreDocumentoSubido")}</div>
    ),
  },
  {
    accessorKey: "estatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estatus de subida
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("estatus")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const documentos = row.original;
      const tieneDocumentoSubido =
        documentos.nombreDocumentoSubido?.trim().length > 1;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones de archivos</DropdownMenuLabel>
            <DropdownMenuItem>Ver archivo</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (tieneDocumentoSubido) {
                  // Lógica para editar el documento
                  console.log("Editar documento");
                } else {
                  // Lógica para agregar un nuevo documento
                  console.log("Agregar documento");
                }
              }}
            >
              {tieneDocumentoSubido ? "Editar" : "Agregar"}
            </DropdownMenuItem>
            <DropdownMenuItem>Borrar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableArchivos({ personaId }) {
  const [data, setData] = React.useState<Documento[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    if (!personaId) return;

    async function loadData() {
      try {
        const tableData = await prepareTableData(personaId);
        setData(tableData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, [personaId]);

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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

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
