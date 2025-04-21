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
import { Cliente } from "@/modelos/cliente";
import { useMutation, useQuery, useQueryClient } from "react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: "idCliente",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID de cliente
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("idCliente")}</div>
    ),
  },
  {
    accessorKey: "razonsocial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razón social
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("razonsocial")}</div>
    ),
  },
  {
    accessorKey: "tiporegimen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo de régimen
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("tiporegimen")}</div>
    ),
  },
  {
    accessorKey: "correo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correo
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("correo")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Cliente = row.original;
      const queryClient = useQueryClient();
      const deleteCliente = useMutation(async () => {
        const res = await fetch(
          `http://localhost:3001/cliente/${Cliente.idCliente}`,
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
        queryClient.invalidateQueries(["clientes"]);
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
            <DropdownMenuLabel>Acciones de clientes</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(Cliente.idCliente.toString())
              }
            >
              <Link to={`/detalles-cliente/${Cliente.idCliente}`}>
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/subir-archivos-tercero/${Cliente.idCliente}`}>
                Gestionar archivos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/personal-cliente`}>Ver personal de clientes</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/editar-cliente/${Cliente.idCliente}`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteCliente.mutate();
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

export function DataTableClientes() {
  const clienteQuery = useQuery({
    queryKey: ["cliente"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const res = await fetch("http://localhost:3001/cliente", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      console.log("Response Data:", resData);
      const clienteParse = Cliente.array().safeParse(resData);
      if (!clienteParse.success) {
        console.error(clienteParse.error);
        throw new Error(clienteParse.error.toString());
      }
      return clienteParse.data;
    },
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: clienteQuery.data || [],
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
  const exportToExcel = (clientes: Cliente[]) => {
    if (!clientes || clientes.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const datos = clientes.map((cliente) => ({
      ID: cliente.idCliente ?? "N/A",
      "Razón social": cliente.razonsocial ?? "N/A",
      Correo: cliente.correo ?? "N/A",
      Teléfono: cliente.telefono ?? "N/A",
      Logo: cliente.logo ?? "N/A",
      "Representante legal": cliente.representantelegal ?? "N/A",
      "Correo rep": cliente.correoRepresentantelegal ?? "N/A",
      "Telefono de rep": cliente.telefonoRepresentantelegal ?? "N/A",
      RFC: cliente.rfc ?? "N/A",
      "Correo de facturación": cliente.correofacturacion ?? "N/A",
      "Constancia fiscal": cliente.constanciafiscal ?? "N/A",
      "Tipo de régimen": cliente.tiporegimen ?? "N/A",
      "Número de cuenta": cliente.numerocuenta ?? "N/A",
      Banco: cliente.numerocuenta ?? "N/A",
      "Nombre de contrato": cliente.nombrecontrato ?? "N/A",
      "Fecha de vencimiento de constancia":
        cliente.fechavencimientoconstancia ?? "N/A",
    }));

    // Exportar a Excel
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cliente");
    XLSX.writeFile(workbook, "Clientes_oceanus.xlsx");
  };

  // Exportar a pdf
  const exportToPDF = (clientes: Cliente[]) => {
    if (!clientes || clientes.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const logoPath = "src/assets/oceanus-logo-3.png";

    const camposBloque1 = [
      { header: "ID", key: "idCliente" },
      { header: "Razón social", key: "razonsocial" },
      { header: "Correo", key: "correo" },
      { header: "Teléfono", key: "telefono" },
      { header: "Representante legal", key: "representantelegal" },
      { header: "Correo rep", key: "correoRepresentantelegal" },
      { header: "Telefono de rep", key: "telefonoRepresentantelegal" },
    ];

    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      clientes: Cliente[],
      campos: { header: string; key: string }[]
    ) => {
      return clientes.map((cliente) => {
        const bloque: Record<string, string> = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key.split(".").reduce((acc, curr) => acc?.[curr], cliente as any) ||
            "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };

    // Generar los datos para cada bloque
    const datosBloque1 = generarDatosBloque(clientes, camposBloque1);
    // Crear un nuevo documento PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const leftMargin = 10;
    const rightMargin = 10;
    const pageWidth = doc.internal.pageSize.width;

    // Logo más pequeño
    const logoWidth = 12;
    const logoHeight = 12;
    const logoY = 7;
    doc.addImage(logoPath, "PNG", leftMargin, logoY, logoWidth, logoHeight);

    // Título derecho
    const text2 = "OCEANUS SUPERVISION Y PROYECTOS";
    const fontSize = 11;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);

    const textWidth2 =
      (doc.getStringUnitWidth(text2) * fontSize) / doc.internal.scaleFactor;
    const xPosition2 = pageWidth - rightMargin - textWidth2;
    const yPosition2 = logoY + logoHeight / 2 + 1; // Alineado verticalmente al centro del logo
    doc.text(text2, xPosition2, yPosition2);

    // Línea azul decorativa
    const lineY = 25;
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, lineY, pageWidth - rightMargin, lineY);

    // Título principal
    const text1 = "DATOS DE CLIENTES";
    const textWidth1 =
      (doc.getStringUnitWidth(text1) * fontSize) / doc.internal.scaleFactor;
    const xPosition1 = (pageWidth - textWidth1) / 2;
    const yPosition1 = lineY + 8;
    doc.text(text1, xPosition1, yPosition1);

    // Ajusta la posición del texto

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

    generarTabla(datosBloque1, 40);

    doc.save("Clientes_oceanus.pdf");
  };

  // Imprimir datos
  const handlePrint = (clientes: Cliente[]) => {
    if (!clientes || clientes.length === 0) {
      alert("No hay datos disponibles para imprimir.");
      return;
    }
    const logoPath = "src/assets/oceanus-logo-3.png";

    const camposBloque1 = [
      { header: "ID", key: "idCliente" },
      { header: "Razón social", key: "razonsocial" },
      { header: "Correo", key: "correo" },
      { header: "Teléfono", key: "telefono" },
      { header: "Representante legal", key: "representantelegal" },
      { header: "Correo rep", key: "correoRepresentantelegal" },
      { header: "Telefono de rep", key: "telefonoRepresentantelegal" },
    ];

    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      clientes: Cliente[],
      campos: { header: string; key: string }[]
    ) => {
      return clientes.map((cliente) => {
        const bloque: Record<string, string> = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key.split(".").reduce((acc, curr) => acc?.[curr], cliente as any) ||
            "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };

    // Generar los datos para cada bloque
    const datosBloque1 = generarDatosBloque(clientes, camposBloque1);
    // Crear un nuevo documento PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const leftMargin = 10;
    const rightMargin = 10;
    const pageWidth = doc.internal.pageSize.width;

    // Logo más pequeño
    const logoWidth = 12;
    const logoHeight = 12;
    const logoY = 7;
    doc.addImage(logoPath, "PNG", leftMargin, logoY, logoWidth, logoHeight);

    // Título derecho
    const text2 = "OCEANUS SUPERVISION Y PROYECTOS";
    const fontSize = 11;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);

    const textWidth2 =
      (doc.getStringUnitWidth(text2) * fontSize) / doc.internal.scaleFactor;
    const xPosition2 = pageWidth - rightMargin - textWidth2;
    const yPosition2 = logoY + logoHeight / 2 + 1; // Alineado verticalmente al centro del logo
    doc.text(text2, xPosition2, yPosition2);

    // Línea azul decorativa
    const lineY = 25;
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, lineY, pageWidth - rightMargin, lineY);

    // Título principal
    const text1 = "DATOS DE CLIENTES";
    const textWidth1 =
      (doc.getStringUnitWidth(text1) * fontSize) / doc.internal.scaleFactor;
    const xPosition1 = (pageWidth - textWidth1) / 2;
    const yPosition1 = lineY + 8;
    doc.text(text1, xPosition1, yPosition1);

    // Ajusta la posición del texto

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

    generarTabla(datosBloque1, 40);

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
              onClick={() => exportToExcel(clienteQuery.data || [])}
            >
              Exportar a Excel
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => exportToPDF(clienteQuery.data || [])}
            >
              Exportar a PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlePrint(clienteQuery.data || [])}
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
