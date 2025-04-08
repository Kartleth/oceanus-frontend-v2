/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Fianza } from "@/modelos/datosFianza";
import { useMutation, useQuery, useQueryClient } from "react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// eslint-disable-next-line react-refresh/only-export-components
export const getColumns = (contratoId: string): ColumnDef<Fianza>[] => [
  {
    accessorKey: "idfianza",
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
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("idfianza")}</div>
    ),
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("tipo")}</div>,
  },
  {
    accessorKey: "tipodecambio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cambio
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("tipodecambio")}</div>
    ),
  },
  {
    accessorKey: "inicio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Inicio
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("inicio")}</div>
    ),
  },
  {
    accessorKey: "fin",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fin <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("fin")}</div>,
  },
  {
    accessorKey: "poliza",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Poliza
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("poliza")}</div>
    ),
  },
  {
    accessorKey: "aseguradora",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aseguradora
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("aseguradora")}</div>
    ),
  },
  {
    accessorKey: "monto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Monto
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("monto")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Fianza = row.original;
      const queryClient = useQueryClient();
      const deleteFianza = useMutation(async () => {
        const res = await fetch(
          `http://localhost:3001/fianza/contrato/${contratoId}/${Fianza.idfianza}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const resData = await res.json();
        if (!res.ok) {
          console.error(resData);
        }
        console.log(resData);
        queryClient.invalidateQueries(["fianzaAnticipo"]);
      });
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
                navigator.clipboard.writeText(
                  Fianza.idfianza.toString()
                )
              }
            >
              <Link
                to={`/contratos/${contratoId}/fianza-anticipo/detalles/${row.original.idfianza}`}
              >
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={``}>Gestionar archivos</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/contratos/${contratoId}/fianza-anticipo/editar-fianza-anticipo/${row.original.idfianza}`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteFianza.mutate();
              }}
            >
              Borrar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableFianzaAnticipo({
  contratoId,
}: {
  contratoId: string;
}) {
  const fianzaAnticipoQuery = useQuery({
    queryKey: ["fianzaAnticipo", contratoId],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const res = await fetch(
        `http://localhost:3001/fianza/contrato/${contratoId}/fianza-anticipo`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      console.log("Response Data:", resData);
      const fianzaAnticipoParse = Fianza.array().safeParse(resData);
      if (!fianzaAnticipoParse.success) {
        console.error(fianzaAnticipoParse.error);
        throw new Error(fianzaAnticipoParse.error.toString());
      }
      return fianzaAnticipoParse.data;
    },
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => getColumns(contratoId), [contratoId]);
  const table = useReactTable({
    data: fianzaAnticipoQuery.data || [],
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
  const exportToExcel = (fianzaAnticipo: Fianza[]) => {
    if (!fianzaAnticipo || fianzaAnticipo.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const datos = fianzaAnticipo.map((fianzaAnticipo) => ({
      ID: fianzaAnticipo.idfianza ?? "N/A",
      TIPO: fianzaAnticipo.tipo ?? "N/A",
      TIPO_CAMBIO: fianzaAnticipo.tipodecambio ?? "N/A",
      INICIO: fianzaAnticipo.inicio ?? "N/A",
      FIN: fianzaAnticipo.fin ?? "N/A",
      POLIZA: fianzaAnticipo.poliza ?? "N/A",
      ASEGURADORA: fianzaAnticipo.aseguradora ?? "N/A",
      MONTO: fianzaAnticipo.monto ?? "N/A",
    }));

    // Exportar a Excel
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cotizacion");
    XLSX.writeFile(workbook, `Fianza_anticipo_contrato_${contratoId}.xlsx`);
  };

  // Exportar a pdf
  const exportToPDF = (fianzaAnticipo: Fianza[]) => {
    if (!fianzaAnticipo || fianzaAnticipo.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const logoPath = "src/assets/oceanus-logo-3.png";

    const camposBloque1 = [
      { header: "ID", key: "idfianza" },
      { header: "TIPO", key: "tipo" },
      { header: "TIPO_CAMBIO", key: "tipodecambio" },
      { header: "INICIO", key: "inicio" },
      { header: "FIN", key: "fin" },
      { header: "POLIZA", key: "poliza" },
      { header: "ASEGURADORA", key: "aseguradora" },
      { header: "MONTO", key: "monto" },
    ];

    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      fianzaAnticipo: Fianza[],
      campos: { header: string; key: string }[]
    ) => {
      return fianzaAnticipo.map((fianzaAnticipo) => {
        const bloque: Record<string, string> = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key
              .split(".")
              .reduce((acc, curr) => acc?.[curr], fianzaAnticipo as any) ||
            "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };

    // Generar los datos para cada bloque
    const datosBloque1 = generarDatosBloque(fianzaAnticipo, camposBloque1);

    // Crear un nuevo documento PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Agregar el logo al lado izquierdo
    doc.addImage(logoPath, "PNG", 5, 5, 20, 20); // Ajusta la posición del logo según sea necesario

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    // Medidas de la página A4 en horizontal
    const pageWidth = doc.internal.pageSize.width; // 297 mm
    const pageHeight = doc.internal.pageSize.height; // 210 mm

    // Primer título: "DATOS DE PERSONALES GENERALES" (centrado en el centro de la página)
    const text1 = "DATOS DE FIANZA DE ANTICIPO";
    const fontSize1 = doc.getFontSize(); // Obtener el tamaño de la fuente en uso
    const textWidth1 =
      (doc.getStringUnitWidth(text1) * fontSize1) / doc.internal.scaleFactor;
    const xPosition1 = (pageWidth - textWidth1) / 2; // Centrado horizontalmente
    const yPosition1 = pageHeight / 2; // Posición vertical centrada (mitad de la página)

    // Dibujar el primer título centrado en la página
    doc.text(text1, xPosition1, yPosition1);

    const generarTabla = (datos: any[], startY: number) => {
      autoTable(doc, {
        head: [Object.keys(datos[0])], // Cabecera de la tabla
        body: datos.map((persona) => Object.values(persona)), // Filas de la tabla
        startY, // Comienza en la posición Y proporcionada
        theme: "grid",
        headStyles: {
          fillColor: [41, 128, 185], // Azul intenso para la cabecera
          textColor: [255, 255, 255], // Texto blanco
          fontSize: 7, // Tamaño de la fuente reducido
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 6, // Tamaño de la fuente reducido
          cellPadding: 2, // Espaciado reducido dentro de las celdas
          textColor: [51, 51, 51], // Color gris oscuro para el texto
        },
        alternateRowStyles: {
          fillColor: [241, 245, 249], // Azul claro para filas alternas
        },
        styles: {
          overflow: "linebreak",
          cellWidth: "auto", // Ajuste automático del ancho de las celdas
          lineColor: [200, 200, 200], // Bordes grises claros
          lineWidth: 0.1, // Grosor de los bordes
        },
        columnStyles: {
          0: { cellWidth: 15 }, // Ancho específico para la primera columna
          1: { cellWidth: "auto" }, // Ancho automático para otras columnas
        },
        margin: { top: 25 },
        pageBreak: "auto", // El salto de página se maneja automáticamente
      });
    };

    generarTabla(datosBloque1, 30);
    doc.addPage();

    doc.save(`Fianza_anticipo_oceanus_${contratoId}.pdf`);
  };

  // Imprimir datos
  const handlePrint = async (fianzaAnticipo: Fianza[]) => {
    if (!fianzaAnticipo || fianzaAnticipo.length === 0) {
      alert("No hay datos disponibles para imprimir.");
      return;
    }

    const camposBloque1 = [
      { header: "ID", key: "idsubcontratado" },
      { header: "Nombre", key: "nombre" },
      { header: "RFC", key: "rfc" },
      { header: "NSS", key: "nss" },
      { header: "INE", key: "ine" },
      { header: "CURP", key: "curp" },
      { header: "Estado", key: "estado" },
    ];
    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      fianzaAnticipo: Fianza[],
      campos: { header: string; key: string }[]
    ) => {
      return fianzaAnticipo.map((fianzaAnticipo) => {
        const bloque: Record<string, string> = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key
              .split(".")
              .reduce((acc, curr) => acc?.[curr], fianzaAnticipo as any) ||
            "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };

    // Generar los datos para cada bloque
    const datosBloque1 = generarDatosBloque(fianzaAnticipo, camposBloque1);

    // Crear un nuevo documento PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    // Medidas de la página A4 en horizontal
    const pageWidth = doc.internal.pageSize.width; // 297 mm
    const pageHeight = doc.internal.pageSize.height; // 210 mm

    // Primer título: "DATOS DE PERSONALES GENERALES" (centrado en el centro de la página)
    const text1 = "DATOS DE FIANZA ANTICIPO";
    const fontSize1 = doc.getFontSize(); // Obtener el tamaño de la fuente en uso
    const textWidth1 =
      (doc.getStringUnitWidth(text1) * fontSize1) / doc.internal.scaleFactor;
    const xPosition1 = (pageWidth - textWidth1) / 2; // Centrado horizontalmente
    const yPosition1 = pageHeight / 2; // Posición vertical centrada (mitad de la página)

    // Dibujar el primer título centrado en la página
    doc.text(text1, xPosition1, yPosition1);

    const generarTabla = (datos: any[], startY: number) => {
      autoTable(doc, {
        head: [Object.keys(datos[0])], // Cabecera de la tabla
        body: datos.map((persona) => Object.values(persona)), // Filas de la tabla
        startY, // Comienza en la posición Y proporcionada
        theme: "grid",
        headStyles: {
          fillColor: [41, 128, 185], // Azul intenso para la cabecera
          textColor: [255, 255, 255], // Texto blanco
          fontSize: 7, // Tamaño de la fuente reducido
          fontStyle: "bold",
        },
        bodyStyles: {
          fontSize: 6, // Tamaño de la fuente reducido
          cellPadding: 2, // Espaciado reducido dentro de las celdas
          textColor: [51, 51, 51], // Color gris oscuro para el texto
        },
        alternateRowStyles: {
          fillColor: [241, 245, 249], // Azul claro para filas alternas
        },
        styles: {
          overflow: "linebreak",
          cellWidth: "auto", // Ajuste automático del ancho de las celdas
          lineColor: [200, 200, 200], // Bordes grises claros
          lineWidth: 0.1, // Grosor de los bordes
        },
        columnStyles: {
          0: { cellWidth: 15 }, // Ancho específico para la primera columna
          1: { cellWidth: "auto" }, // Ancho automático para otras columnas
        },
        margin: { top: 25 },
        pageBreak: "auto", // El salto de página se maneja automáticamente
      });
    };

    generarTabla(datosBloque1, 30);
    doc.addPage();

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const printWindow = window.open(pdfUrl, "_blank");

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      alert("No se pudo abrir la ventana para imprimir.");
    }
  };
  /* FIN DE LÓGICA PARA EXPORTAR DATOS PARA EXCEL Y PDF*/

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
              onClick={() => exportToExcel(fianzaAnticipoQuery.data || [])}
            >
              Exportar a Excel
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => exportToPDF(fianzaAnticipoQuery.data || [])}
            >
              Exportar a PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlePrint(fianzaAnticipoQuery.data || [])}
            >
              Imprimir
            </DropdownMenuItem>
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
