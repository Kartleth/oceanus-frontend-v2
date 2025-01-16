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
import { useMutation, useQueryClient } from "react-query";
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

type DocumentacionKey =
  | "credencial"
  | "licencia"
  | "pasaporte"
  | "cv"
  | "curp"
  | "inss"
  | "constanciasat"
  | "foto"
  | "actnacimiento"
  | "estcuenta"
  | "altasegsocial"
  | "cedulaprofe"
  | "copiacontrato"
  | "comprodomicilio";

const documentacionMap: { [key in DocumentacionKey]: string } = {
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

async function prepareTableData(personaId: number) {
  try {
    const documentacion = await fetchDocumentacion(personaId);
    const tableData = Object.keys(documentacionMap).map((key) => {
      const documentKey = key as DocumentacionKey;
      const nombreDocumentoEsperado = documentacionMap[documentKey];
      const nombreDocumentoSubido = documentacion?.[documentKey] || "-";
      const estatus = documentacion?.[documentKey] ? "Subido" : "No subido";

      return {
        nombreDocumentoEsperado,
        nombreDocumentoSubido,
        estatus,
        documentKey,
        idUsuario: personaId, // Agregar el idUsuario
      };
    });

    return tableData;
  } catch (error) {
    console.error("Error preparing table data:", error);
    return Object.keys(documentacionMap).map((key) => ({
      nombreDocumentoEsperado: documentacionMap[key as DocumentacionKey],
      nombreDocumentoSubido: "-",
      estatus: "No subido",
      documentKey: key,
      idUsuario: personaId, // Agregar el idUsuario también aquí
    }));
  }
}

//--------------------------------------------------------------------------
// DELETE DOCUMENTO
async function deleteDocumento(idUsuario: number, keyDocumento: string) {
  const response = await fetch(
    `http://localhost:3001/documentacion/${idUsuario}/deleteDoc/${keyDocumento}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error al eliminar el documento");
  }
  return response.json();
}

//--------------------------------------------------------------------------

//--------------------------------------------------------------------------

interface Documento {
  nombreDocumentoEsperado: string;
  nombreDocumentoSubido: string;
  estatus: string;
  documentKey: string;
  idUsuario: number;
}

interface ActionCellProps {
  row: { original: Documento };
  onDelete: (documentKey: string) => void;
}

const ActionCell: React.FC<ActionCellProps> = ({ row, onDelete }) => {
  const documentos = row.original;
  const queryClient = useQueryClient();

  const deleteDocMutation = useMutation(
    () => deleteDocumento(documentos.idUsuario, documentos.documentKey),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["documentacion", documentos.idUsuario],
        });

        onDelete(documentos.documentKey);

        console.log(
          `Documento con clave '${documentos.documentKey}' y usuario ID ${documentos.idUsuario} eliminado exitosamente.`
        );
      },
      onError: (error) => {
        console.error("Error al eliminar el documento:", error);
      },
    }
  );

  const tieneDocumentoSubido = documentos.nombreDocumentoSubido !== "-";

  const handleDownload = () => {
    const downloadUrl = `http://localhost:3001/documentacion/${documentos.idUsuario}/getDoc/${documentos.documentKey}`;
    window.open(downloadUrl, "_blank");
  };

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
        {tieneDocumentoSubido && (
          <DropdownMenuItem onClick={handleDownload}>
            Descargar documento
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            console.log("Agregar/Editar Documento clicked");
            console.log("documentos.documentKey:", documentos.documentKey);
          }}
        >
          {tieneDocumentoSubido ? "Editar" : "Agregar"} Documento
        </DropdownMenuItem>
        {tieneDocumentoSubido && (
          <DropdownMenuItem onClick={() => deleteDocMutation.mutate()}>
            Eliminar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function DataTableArchivos({
  personaId,
}: Readonly<{ personaId: number }>) {
  const [data, setData] = React.useState<Documento[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const queryClient = useQueryClient();
  React.useEffect(() => {
    if (!personaId) return;

    async function loadData() {
      try {
        const tableData = await prepareTableData(personaId);
        setData(tableData);
        console.log("Data loaded:", tableData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, [personaId]);

  const handleDelete = (documentKey: string) => {
    console.log("Deleting document:", documentKey);
    setData((prevData) =>
      prevData.map((item) =>
        item.documentKey === documentKey
          ? {
              ...item,
              nombreDocumentoSubido: "-", // Se coloca "-" en la columna Documento subido
              estatus: "No subido", // Cambiar estatus a "No subido"
            }
          : item
      )
    );
  };

  const columns: ColumnDef<Documento>[] = [
    {
      accessorKey: "nombreDocumentoEsperado",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre documento esperado
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">
          {row.getValue("nombreDocumentoEsperado")}
        </div>
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
      cell: ({ row }) => <ActionCell row={row} onDelete={handleDelete} />,
    },
  ];

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
