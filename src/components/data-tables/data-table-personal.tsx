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
import { Skeleton } from "@/components/ui/skeleton";
import * as XLSX from "xlsx";
import { Persona } from "@/modelos/personal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ErrorComponent from "../error-component";

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Persona>[] = [
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
    cell: ({ row }) => <div className="">{row.getValue("nombre")}</div>,
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
    cell: ({ row }) => <div className="uppercase">{row.getValue("curp")}</div>,
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
    cell: ({ row }) => <div className="uppercase">{row.getValue("rfc")}</div>,
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
      const persona = row.original;
      const queryClient = useQueryClient();
      const detelePersona = useMutation(async () => {
        const res = await fetch(
          `http://localhost:3001/personas/${persona.id}`,
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
        queryClient.invalidateQueries(["trabajadores"]);
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
            <DropdownMenuLabel>Acciones de empleado</DropdownMenuLabel>
            <DropdownMenuItem
              asChild
              onClick={() =>
                navigator.clipboard.writeText(persona.id.toString())
              }
            >
              <Link to={`/detalles-trabajador/${persona.id}`}>
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/subir-archivos/${persona.id}`}>
                Gestionar archivos
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/reporte-de-empleado/${persona.id}`}>
                Generar reporte
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/generar-credencial/${persona.id}`}>
                Generar credencial
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/editar-trabajador/${persona.id}`}>Editar</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                detelePersona.mutate();
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

export function DataTableDemo() {
  const trabajadoresQuery = useQuery({
    queryKey: ["trabajadores"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      //queryFn es la función que va a usar React Query para obtener los datos jsadhasd
      const res = await fetch("http://localhost:3001/personas", {
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
      const personaParse = Persona.array().safeParse(resData); //toma los datos de persona, los guarda en un array y luego usa la función de safePersona para saber si la respuesta de los datos está validado correctamente.
      if (!personaParse.success) {
        console.error(personaParse.error);
        throw new Error(personaParse.error.toString());
      }
      return personaParse.data;
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
    data: trabajadoresQuery.data || [],
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
  const exportToExcel = (personas: Persona[]) => {
    if (!personas || personas.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    const datos = personas.map((persona) => ({
      ID: persona.id,
      Nombre: persona.nombre,
      CURP: persona.curp,
      RFC: persona.rfc,
      "Fecha de Ingreso": persona.fechaingreso,
      Estado: persona.estado,
      "Tipo de Contrato": persona.tipocontrato,
      "Inicio del Contrato": persona.iniciocontrato,
      "Fin del Contrato": persona.fincontrato,
    }));

    // Exportar a Excel
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Personas");
    XLSX.writeFile(workbook, "Personal_oceanus.xlsx");
  };

  // Exportar a PDF
  const exportToPDF = (personas: Persona[]) => {
    if (!personas || personas.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    // Ruta de la imagen
    const logoPath = "src/assets/oceanus-logo-3.png";

    const camposBloque1 = [
      { header: "ID", key: "id" },
      { header: "Nombre", key: "nombre" },
      { header: "Fecha de Nacimiento", key: "fechanacimiento" },
      { header: "CURP", key: "curp" },
      { header: "RFC", key: "rfc" },
      { header: "Fecha de Ingreso", key: "fechaingreso" },
      { header: "Estado", key: "estado" },
      { header: "Tipo de contrato", key: "tipocontrato" },
      { header: "Inicio del Contrato", key: "iniciocontrato" },
      { header: "Fin del Contrato", key: "fincontrato" },
    ];

    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      personas: Persona[],
      campos: { header: string; key: string }[]
    ) => {
      return personas.map((persona) => {
        const bloque: Record<string, string> = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key.split(".").reduce((acc, curr) => acc?.[curr], persona as any) ||
            "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };

    // Generar los datos para cada bloque
    const datosBloque1 = generarDatosBloque(personas, camposBloque1);

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

    // Primer título: "DATOS DE PERSONALES GENERALES" (centrado horizontalmente debajo del logo y encabezado)
    const text1 = "DATOS DE PERSONALES GENERALES";
    const fontSize1 = doc.getFontSize();
    const textWidth1 =
      (doc.getStringUnitWidth(text1) * fontSize1) / doc.internal.scaleFactor;
    const xPosition1 = (pageWidth - textWidth1) / 2;
    const yPosition1 = 30; // Justo debajo del logo y del texto alineado a la derecha

    doc.text(text1, xPosition1, yPosition1);

    // Segundo título: "OCEANUS SUPERVISION Y PROYECTOS" (alineado a la derecha en el encabezado)
    const text2 = "OCEANUS SUPERVISION Y PROYECTOS";
    const fontSize2 = doc.getFontSize(); // Obtener el tamaño de la fuente en uso
    const textWidth2 =
      (doc.getStringUnitWidth(text2) * fontSize2) / doc.internal.scaleFactor;
    const xPosition2 = pageWidth - textWidth2 - 10; // Alineación a la derecha con margen
    const yPosition2 = 15; // Ubicación en el encabezado, un poco hacia abajo

    // Dibujar el segundo título alineado a la derecha en el encabezado
    doc.text(text2, xPosition2, yPosition2);

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

    generarTabla(datosBloque1, 30);
    doc.addPage();
    doc.save("Reporte_Personas.pdf");
  };

  // Imprimir datos
  const handlePrint = (personas: Persona[]) => {
    if (!personas || personas.length === 0) {
      alert("No hay datos disponibles para imprimir.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Reporte Detallado de Personas", 14, 20);

    const generarTabla = (datos: any[], startY: number) => {
      autoTable(doc, {
        head: [Object.keys(datos[0])],
        body: datos.map((persona) => Object.values(persona)),
        startY,
        theme: "grid",
        headStyles: {
          fillColor: [22, 160, 133],
          textColor: [255, 255, 255],
          fontSize: 7,
        },
        bodyStyles: {
          fontSize: 6,
          cellPadding: 1,
        },
        styles: {
          overflow: "linebreak",
          fontSize: 6,
          cellWidth: "auto",
        },
        columnStyles: {
          0: { cellWidth: 12 },
          1: { cellWidth: "auto" },
        },
        margin: { top: 25 },
        pageBreak: "auto",
      });
    };

    const camposBloque1 = [
      "ID",
      "Nombre",
      "Fecha de Nacimiento",
      "CURP",
      "RFC",
      "Número Fijo",
      "Número Celular",
      "Dirección",
      "Número de Licencia",
      "Número de Pasaporte",
    ];
    const camposBloque2 = [
      "Fecha de Ingreso",
      "Estado",
      "Tipo de Contrato",
      "Inicio del Contrato",
      "Fin del Contrato",
      "Correo",
      "INE",
      "Estado Civil",
      "Cédula Profesional",
      "Carrera",
    ];
    const camposBloque3 = [
      "Experiencia Laboral",
      "Certificaciones",
      "Grado de Estudios",
      "Alergias",
      "Enfermedades Crónicas",
      "Lesiones",
      "Alergias a Medicamentos",
      "Número de Emergencia",
      "Número de Seguro",
      "Tipo de Sangre",
    ];

    const generarDatosBloque = (personas: Persona[], campos: string[]) => {
      return personas.map((persona) => {
        const bloque: any = {};
        campos.forEach((campo) => {
          const campoLower = campo.toLowerCase().replace(/\s/g, "");
          bloque[campo] =
            (persona as Record<string, unknown>)[campoLower] || "N/A";
        });
        return bloque;
      });
    };

    const datosBloque1 = generarDatosBloque(personas, camposBloque1);
    const datosBloque2 = generarDatosBloque(personas, camposBloque2);
    const datosBloque3 = generarDatosBloque(personas, camposBloque3);

    generarTabla(datosBloque1, 30);

    doc.addPage();
    generarTabla(datosBloque2, 30);

    doc.addPage();
    generarTabla(datosBloque3, 30);

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
  /* FIN DE LÓGICA PARA EXPORTAR DATOS PARA EXCEL Y PDF*/

  /* AGREGAR DISEÑO AL APARTADO DE CARGANDO*/
  if (trabajadoresQuery.isLoading) {
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
  if (trabajadoresQuery.error instanceof Error) {
    return (
      <div className="w-full h-1/2 text-center">
        <ErrorComponent></ErrorComponent>
        <div className="mt-8 text-2xl">
          Error: {trabajadoresQuery.error.message}
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
              onClick={() => exportToExcel(trabajadoresQuery.data || [])}
            >
              Exportar a Excel
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => exportToPDF(trabajadoresQuery.data || [])}
            >
              Exportar a PDF
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlePrint(trabajadoresQuery.data || [])}
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
