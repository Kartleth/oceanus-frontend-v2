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
      const Persona = row.original;
      const queryClient = useQueryClient();
      const detelePersona = useMutation(async () => {
        const res = await fetch(
          `http://localhost:3001/personas/${Persona.id}`,
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
              onClick={() =>
                navigator.clipboard.writeText(Persona.id.toString())
              }
            >
              <Link to={`/detalles-trabajador/${Persona.id}`}>
                Ver detalles
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Subir archivo</DropdownMenuItem>
            <DropdownMenuItem>Descargar archivo</DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/reporte-de-empleado/${Persona.id}`}>
                Generar reporte
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/generar-credencial/${Persona.id}`}>
                Generar credencial{" "}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
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
      //queryFn es la función que va a usar React Query para obtener los datos jsadhasd
      const res = await fetch("http://localhost:3001/personas", {
        //El await es para esperar a que se resulevan las promesas antes de seguir con el código
        headers: {
          "Content-Type": "application/json", //configuración de las cabeceras de la solicitud para indicar que la respuesta es de tipo JSON
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
      "Cédula Profesional": persona.datosAcademicos?.cedula || "N/A",
      Carrera: persona.datosAcademicos?.carrera || "N/A",
      "Experiencia Laboral": persona.datosAcademicos?.explaboral || "N/A",
      Certificaciones: persona.datosAcademicos?.certificaciones || "N/A",
      "Grado de Estudios": persona.datosAcademicos?.gradoestudios || "N/A",
      Alergias: persona.datosMedicos?.alergias || "N/A",
      "Enfermedades Crónicas": persona.datosMedicos?.enfercronicas || "N/A",
      Lesiones: persona.datosMedicos?.lesiones || "N/A",
      "Alergias a Medicamentos": persona.datosMedicos?.alergiasmed || "N/A",
      "Número de Emergencia": persona.datosMedicos?.numemergencia || "N/A",
      "Número de Seguro": persona.datosMedicos?.numseguro || "N/A",
      "Tipo de Sangre": persona.datosMedicos?.tiposangre || "N/A",
      "Contacto de Emergencia": persona.datosMedicos?.nombremergencia || "N/A",
      Género: persona.datosMedicos?.genero || "N/A",
      "Relación de Emergencia": persona.datosMedicos?.relaemergencia || "N/A",
    }));

    // Exportar a Excel
    const worksheet = XLSX.utils.json_to_sheet(datos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Personas");
    XLSX.writeFile(workbook, "Personal_oceanus.xlsx");
  };

  //Exportar pdf
  const exportToPDF = (personas: any[]) => {
    if (!personas || personas.length === 0) {
      alert("No hay datos disponibles para exportar.");
      return;
    }

    // Definir los campos de los tres bloques con sus mapeos exactos
    const camposBloque1 = [
      { header: "ID", key: "id" },
      { header: "Nombre", key: "nombre" },
      { header: "Fecha de Nacimiento", key: "fechanacimiento" },
      { header: "CURP", key: "curp" },
      { header: "RFC", key: "rfc" },
      { header: "Número Fijo", key: "numerofijo" },
      { header: "Número Celular", key: "numerocelular" },
      { header: "Dirección", key: "direccion" },
      { header: "Número de Licencia", key: "numerolicencia" },
      { header: "Número de Pasaporte", key: "numeropasaporte" },
    ];

    const camposBloque2 = [
      { header: "Fecha de Ingreso", key: "fechaingreso" },
      { header: "Estado", key: "estado" },
      { header: "Tipo de Contrato", key: "tipocontrato" },
      { header: "Inicio del Contrato", key: "iniciocontrato" },
      { header: "Fin del Contrato", key: "fincontrato" },
      { header: "Correo", key: "correo" },
      { header: "INE", key: "ine" },
      { header: "Estado Civil", key: "estadocivil" },
      { header: "Cédula Profesional", key: "datosAcademicos.cedula" },
      { header: "Carrera", key: "datosAcademicos.carrera" },
    ];

    const camposBloque3 = [
      { header: "Experiencia Laboral", key: "datosAcademicos.explaboral" },
      { header: "Certificaciones", key: "datosAcademicos.certificaciones" },
      { header: "Grado de Estudios", key: "datosAcademicos.gradoestudios" },
      { header: "Alergias", key: "datosMedicos.alergias" },
      { header: "Enfermedades Crónicas", key: "datosMedicos.enfercronicas" },
      { header: "Lesiones", key: "datosMedicos.lesiones" },
      { header: "Alergias a Medicamentos", key: "datosMedicos.alergiasmed" },
      { header: "Número de Emergencia", key: "datosMedicos.numemergencia" },
      { header: "Número de Seguro", key: "datosMedicos.numseguro" },
      { header: "Tipo de Sangre", key: "datosMedicos.tiposangre" },
    ];

    // Función para mapear los datos a cada bloque
    const generarDatosBloque = (
      personas: any[],
      campos: { header: string; key: string }[]
    ) => {
      return personas.map((persona) => {
        const bloque: any = {};
        campos.forEach(({ header, key }) => {
          const valor =
            key.split(".").reduce((acc, curr) => acc?.[curr], persona) || "N/A";
          bloque[header] = valor;
        });
        return bloque;
      });
    };

    // Generar los datos para cada bloque
    const datosBloque1 = generarDatosBloque(personas, camposBloque1);
    const datosBloque2 = generarDatosBloque(personas, camposBloque2);
    const datosBloque3 = generarDatosBloque(personas, camposBloque3);

    // Crear un nuevo documento PDF
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Título del documento
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Reporte Detallado de Personas", 14, 20);

    // Función para generar la tabla de cada bloque
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

    // Imprimir los bloques en páginas separadas
    generarTabla(datosBloque1, 30);
    doc.addPage();
    generarTabla(datosBloque2, 30);
    doc.addPage();
    generarTabla(datosBloque3, 30);

    // Guardar el archivo PDF
    doc.save("Reporte_Personas.pdf");
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
    return <div>Error: {trabajadoresQuery.error.message}</div>;
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
