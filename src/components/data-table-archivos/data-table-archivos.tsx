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
  | "nss"
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
  nss: "NSS",
  constanciasat: "Constancia SAT",
  foto: "Foto",
  actnacimiento: "Acta de Nacimiento",
  estcuenta: "Estado de Cuenta",
  altasegsocial: "Alta en Seguridad Social",
  cedulaprofe: "Cédula Profesional",
  copiacontrato: "Copia del Contrato",
  comprodomicilio: "Comprobante de Domicilio",
};

// Tipos de archivo permitidos
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const ALLOWED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
        idUsuario: personaId,
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
      idUsuario: personaId,
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
// UPLOAD DOCUMENTO
async function uploadDocumento(
  idUsuario: number,
  documentKey: string,
  file: File
) {
  // Validar tipo de archivo
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/octet-stream", // Algunos archivos Excel pueden reportar este tipo
  ];

  // Validar extensión como respaldo
  const allowedExtensions = [
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
  ];
  const fileExtension = file.name.split(".").pop()?.toLowerCase();

  if (
    !allowedTypes.includes(file.type) &&
    !allowedExtensions.includes(`.${fileExtension}`)
  ) {
    throw new Error(
      `Tipo de archivo no permitido. Solo se aceptan: ${ALLOWED_FILE_EXTENSIONS}`
    );
  }

  // Validar tamaño de archivo
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("El archivo es demasiado grande (máximo 5MB)");
  }

  const formData = new FormData();
  formData.append(documentKey, file);
  formData.append("filename", file.name);

  console.log("Uploading document:", documentKey, file.name, file.size);

  const response = await fetch(
    `http://localhost:3001/documentacion/${idUsuario}/updateDoc/${documentKey}`,
    {
      method: "PATCH",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al subir el documento");
  }

  return await response.json();
}
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
  onUpload: (documentKey: string, file: File) => Promise<void>;
}

const ActionCell: React.FC<ActionCellProps> = ({ row, onDelete, onUpload }) => {
  const documentos = row.original;
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [fileInputKey, setFileInputKey] = React.useState(Date.now());

  const uploadDocMutation = useMutation(
    ({
      idUsuario,
      documentKey,
      file,
    }: {
      idUsuario: number;
      documentKey: string;
      file: File;
    }) => uploadDocumento(idUsuario, documentKey, file),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["documentacion", documentos.idUsuario],
        });
        console.log("Documento subido exitosamente:", data);
      },
      onError: (error: Error) => {
        console.error("Error al subir el documento:", error.message);
        alert(`Error al subir el documento: ${error.message}`);
      },
      onSettled: () => {
        setIsLoading(false);
        setFileInputKey(Date.now()); // Forzar remount del input
      },
    }
  );

  const deleteDocMutation = useMutation(
    () => deleteDocumento(documentos.idUsuario, documentos.documentKey),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["documentacion", documentos.idUsuario],
        });
        onDelete(documentos.documentKey);
        console.log("Documento eliminado exitosamente");
      },
      onError: (error: Error) => {
        console.error("Error al eliminar el documento:", error.message);
        alert(`Error al eliminar el documento: ${error.message}`);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (isLoading) {
      console.log("Ya hay una subida en progreso");
      return;
    }

    try {
      // Validación adicional del tamaño
      if (file.size > MAX_FILE_SIZE) {
        throw new Error(
          `El archivo es demasiado grande. Tamaño máximo permitido: ${
            MAX_FILE_SIZE / (1024 * 1024)
          }MB`
        );
      }

      await uploadDocMutation.mutateAsync({
        idUsuario: documentos.idUsuario,
        documentKey: documentos.documentKey,
        file,
      });

      await onUpload(documentos.documentKey, file);
    } catch (error) {
      console.error("Error en el proceso de subida:", error);
      alert(
        error instanceof Error ? error.message : "Error al subir el archivo"
      );
    }
  };

  const tieneDocumentoSubido = documentos.nombreDocumentoSubido !== "-";

  const handleDownload = () => {
    const downloadUrl = `http://localhost:3001/documentacion/${documentos.idUsuario}/getDoc/${documentos.documentKey}`;
    window.open(downloadUrl, "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
          <span className="sr-only">Open menu</span>
          {isLoading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <MoreHorizontal />
          )}
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
            if (isLoading) return;

            const fileInput = document.getElementById(
              `file-input-${documentos.documentKey}`
            ) as HTMLInputElement;

            if (fileInput) {
              fileInput.click();
            }
          }}
          disabled={isLoading}
        >
          {isLoading
            ? "Procesando..."
            : tieneDocumentoSubido
            ? "Reemplazar Documento"
            : "Agregar Documento"}
        </DropdownMenuItem>
        {tieneDocumentoSubido && (
          <DropdownMenuItem
            onClick={() => deleteDocMutation.mutate()}
            disabled={isLoading}
          >
            Eliminar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
      <input
        key={fileInputKey}
        id={`file-input-${documentos.documentKey}`}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={ALLOWED_FILE_EXTENSIONS}
      />
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

  const loadData = React.useCallback(async () => {
    try {
      const tableData = await prepareTableData(personaId);
      setData(tableData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, [personaId]);

  React.useEffect(() => {
    if (!personaId) return;
    loadData();
  }, [personaId, loadData]);

  const handleDelete = React.useCallback((documentKey: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.documentKey === documentKey
          ? {
              ...item,
              nombreDocumentoSubido: "-",
              estatus: "No subido",
            }
          : item
      )
    );
  }, []);

  const handleUpload = React.useCallback(
    async (documentKey: string, file: File) => {
      try {
        const newFileName = await uploadDocumento(personaId, documentKey, file);

        setData((prevData) =>
          prevData.map((item) =>
            item.documentKey === documentKey
              ? {
                  ...item,
                  nombreDocumentoSubido: newFileName.newFilePath || file.name,
                  estatus: "Subido",
                }
              : item
          )
        );

        // Invalidar la caché de react-query
        queryClient.invalidateQueries(["documentacion", personaId]);
      } catch (error) {
        console.error("Error en handleUpload:", error);
        throw error;
      }
    },
    [personaId, queryClient]
  );

  const columns: ColumnDef<Documento>[] = React.useMemo(
    () => [
      {
        accessorKey: "nombreDocumentoEsperado",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Nombre documento esperado
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize">
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Documento subido
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="capitalize">
            {row.getValue("nombreDocumentoSubido") === "-"
              ? "No subido"
              : row.getValue("nombreDocumentoSubido")}
          </div>
        ),
      },
      {
        accessorKey: "estatus",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Estatus
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div
            className={`capitalize ${
              row.getValue("estatus") === "Subido"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {row.getValue("estatus")}
          </div>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
          <ActionCell
            row={row}
            onDelete={handleDelete}
            onUpload={handleUpload}
          />
        ),
      },
    ],
    [handleDelete, handleUpload]
  );

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
    <div suppressHydrationWarning>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar documentos..."
            value={(table.getState().globalFilter as string) ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas <ChevronDown className="ml-2 h-4 w-4" />
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
                      {column.id === "nombreDocumentoEsperado"
                        ? "Documento"
                        : column.id === "nombreDocumentoSubido"
                        ? "Archivo Subido"
                        : column.id}
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
                    No se encontraron documentos.
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
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
