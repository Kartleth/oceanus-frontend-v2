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
import {
  ArrowUpDown,
  ChevronDown,
  CreditCard,
  EyeOff,
  FilePenLine,
  FilePlus2,
  FileText,
  MoreHorizontal,
  Shield,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { Contrato } from "@/modelos/datosContratos";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Skeleton } from "../ui/skeleton";
import ErrorComponent from "../error-component";

export const columns: ColumnDef<Contrato>[] = [
  {
    accessorKey: "idcontrato",
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
      <div className="lowercase">{row.getValue("idcontrato")}</div>
    ),
  },
  {
    accessorKey: "nombrecontrato",
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
      <div className="lowercase">{row.getValue("nombrecontrato")}</div>
    ),
  },
  {
    accessorKey: "numerocontrato",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número de contrato
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("numerocontrato")}</div>
    ),
  },
  {
    accessorKey: "iniciocontrato",
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
      <div className="lowercase">{row.getValue("iniciocontrato")}</div>
    ),
  },
  {
    accessorKey: "fincontrato",
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
      <div className="lowercase">{row.getValue("fincontrato")}</div>
    ),
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
      const contrato = row.original;
      const queryClient = useQueryClient();
      const deteleContrato = useMutation(async () => {
        const res = await fetch(
          `http://localhost:3001/contrato/${contrato.idcontrato}`,
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
        queryClient.invalidateQueries(["contratos"]);
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
            <DropdownMenuLabel>Acciones de contrato</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link to={`/detalles-contratos/${contrato.idcontrato}`}>
                {" "}
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Personal</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FileText />
                <span>Subcontratos</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    {" "}
                    <FilePenLine />
                    <Link
                      to={`/contratos/${contrato.idcontrato}/personal_terceros`}
                    >
                      Gestionar Subcontratos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FilePlus2 />
                    <Link
                      to={`/contratos/${contrato.idcontrato}/personal_terceros/agregar-tercero`}
                    >
                      Agregar Subcontrato
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <FileText />
                <span>Convenios</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <FilePenLine />
                    <Link to={`/contratos/${contrato.idcontrato}/convenio`}>
                      Gestionar Convenios
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FilePlus2 />
                    <Link
                      to={`/contratos/${contrato.idcontrato}/convenio/agregar-convenio`}
                    >
                      Agregar Convenio
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Shield />
                <span>Fianzas</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <CreditCard />
                    <Link
                      to={`/contratos/${contrato.idcontrato}/fianza-anticipo`}
                    >
                      Fianza de Anticipo
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShieldCheck />
                    <Link
                      to={`/contratos/${contrato.idcontrato}/fianza-cumplimiento`}
                    >
                      Fianza de Cumplimiento
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <EyeOff />
                    <Link
                      to={`/contratos/${contrato.idcontrato}/fianza-vicios-ocultos`}
                    >
                      Fianza de Vicios ocultos
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to={`/editar-contratos/${contrato.idcontrato}`}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deteleContrato.mutate();
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
export function DataTableContratos() {
  const contratosQuery = useQuery({
    queryKey: ["contratos"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      //queryFn es la función que va a usar React Query para obtener los datos jsadhasd
      const res = await fetch("http://localhost:3001/contrato", {
        //El await es para esperar a que se resulevan las promesas antes de seguir con el código
        headers: {
          "Content-Type": "application/json", //configuración de las cabeceras de la solicitud para indicar que la respuesta es de tipo JSON
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      console.log(resData);
      const contratoParse = Contrato.array().safeParse(resData); //toma los datos de persona, los guarda en un array y luego usa la función de safePersona para saber si la respuesta de los datos está validado correctamente.
      if (!contratoParse.success) {
        console.error(contratoParse.error);
        throw new Error(contratoParse.error.toString());
      }
      return contratoParse.data;
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
    data: contratosQuery.data || [],
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
  const exportToExcel = (contratos: Contrato[]) => {
    if (!contratos || contratos.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const datos = contratos.map((contrato) => ({
      ID: contrato.idcontrato,
      Nombre: contrato.nombrecontrato,
      "Inicio de contrato": contrato.iniciocontrato,
      "Fin de contrato": contrato.fincontrato,
      Numero_de_contrato: contrato.numerocontrato,
      montocontrato: contrato.montocontrato,
      // facturas: contrato.facturas,
      // idcontratofuente: contrato.idcontratofuente,
      Direccion: contrato.direccion,
      anticipocontrato: contrato.anticipocontrato,
      // convenios: contrato.convenios,
      // personalcontrato: contrato.personalcontrato,
      // fianzacumplimiento: contrato.fianzaCumplimiento,
      // fianzaanticipo: contrato.fianzaAnticipo,
      // fianzaoculto: contrato.fianzaOculto,
      // datospersonal: contrato.datosPersonal,
    }));

    //Exportar a Excel
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Personas");
    XLSX.writeFile(workbook, "Contratos.xlsx");
  };
  //Exportar a pdf
  const exportToPDF = (contratos: Contrato[]) => {
    if (!contratos || contratos.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }
    const logoPath = "src/assets/oceanus-logo-3.png";

    const camposBloque1 = [
      { header: "ID", key: "idcontrato" },
      { header: "Nombre", key: "nombrecontrato" },
      { header: "Inicio de contrato", key: "iniciocontrato" },
      { header: "Fin de contrato", key: "fincontrato" },
      { header: "Numero_de_contrato", key: "numerocontrato" },
      { header: "montocontrato", key: "montocontrato" },
      { header: "Direccion", key: "direccion" },
      { header: "anticipocontrato", key: "anticipocontrato" },
    ];
    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      contratos: Contrato[],
      campos: { header: string; key: string }[]
    ) => {
      return contratos.map((contrato) => {
        const bloque: Record<string, string> = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key
              .split(".")
              .reduce((acc, curr) => acc?.[curr], contrato as any) || "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };
    // Generar los datos para cada bloque
    const datosBloque1 = generarDatosBloque(contratos, camposBloque1);

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
    const text1 = "DATOS DE PERSONALES GENERALES";
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
    doc.addPage();
    doc.save("Contratos.pdf");
  };

  //Imprimir datos
  const logoPath = "src/assets/oceanus-logo-3.png";
  const handlePrint = (contratos: Contrato[]) => {
    if (!contratos || contratos.length === 0) {
      alert("No hay datos disponibles para imprimir.");
      return;
    }

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
    const text1 = "DATOS DE PERSONALES GENERALES";
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

    const camposBloque1 = [
      { header: "ID", key: "idcontrato" },
      { header: "Nombre", key: "nombrecontrato" },
      { header: "Inicio de contrato", key: "iniciocontrato" },
      { header: "Fin de contrato", key: "fincontrato" },
      { header: "Numero_de_contrato", key: "numerocontrato" },
      { header: "montocontrato", key: "montocontrato" },
      { header: "Direccion", key: "direccion" },
      { header: "anticipocontrato", key: "anticipocontrato" },
    ];

    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      contratos: Contrato[],
      campos: { header: string; key: string }[]
    ) => {
      return contratos.map((contrato) => {
        const bloque: Record<string, string> = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key
              .split(".")
              .reduce((acc, curr) => acc?.[curr], contrato as any) || "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };

    const datosBloque1 = generarDatosBloque(contratos, camposBloque1);

    generarTabla(datosBloque1, 40);
    // Convertir el PDF a un blob
    const pdfBlob = doc.output("blob");

    // Crear una URL temporal para el Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Abrir el PDF en una nueva ventana para imprimir
    const printWindow = window.open(pdfUrl, "_blank");

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    } else {
      alert("No se pudo abrir la ventana para imprimir.");
    }
  };
  /* AGREGAR DISEÑO AL APARTADO DE CARGANDO*/
  if (contratosQuery.isLoading) {
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
  if (contratosQuery.error instanceof Error) {
    return (
      <div className="w-full h-1/2 text-center">
        <ErrorComponent></ErrorComponent>
        <div className="mt-8 text-2xl">
          Error: {contratosQuery.error.message}
        </div>
      </div>
    );
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
            <DropdownMenuItem
              onClick={() => exportToExcel(contratosQuery.data || [])}
            >
              Exportar a Excel
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => exportToPDF(contratosQuery.data || [])}
            >
              Exportar a PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlePrint(contratosQuery.data || [])}
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
