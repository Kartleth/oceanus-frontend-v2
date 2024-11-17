import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import MainTitle from "../../components/MainTitle";
import MainButton from "@/components/MainButton";
import { Payment, columns } from "../../components/usersTable/columns";
import { DataTable } from "../../components/usersTable/data-table";

// Función para obtener datos
async function getData(): Promise<Payment[]> {
  // Datos simulados para tu API
  return [
    {
      id: "928ed54f",
      name: "User3",
      birthDate: "1992-03-22",
      curp: "CURP789012",
      rfc: "RFC789012",
      state: "State3",
      accions: "Edit | Delete",
    },
    {
      id: "1028ed55f",
      name: "User4",
      birthDate: "1994-07-18",
      curp: "CURP345678",
      rfc: "RFC345678",
      state: "State4",
      accions: "Edit | Delete",
    },
    {
      id: "1128ed56f",
      name: "User5",
      birthDate: "1980-10-10",
      curp: "CURP901234",
      rfc: "RFC901234",
      state: "State5",
      accions: "Edit | Delete",
    },
    {
      id: "1228ed57f",
      name: "User6",
      birthDate: "1975-12-25",
      curp: "CURP567890",
      rfc: "RFC567890",
      state: "State6",
      accions: "Edit | Delete",
    },
    {
      id: "1328ed58f",
      name: "User7",
      birthDate: "1988-02-14",
      curp: "CURP234567",
      rfc: "RFC234567",
      state: "State7",
      accions: "Edit | Delete",
    },
    {
      id: "1428ed59f",
      name: "User8",
      birthDate: "1996-09-09",
      curp: "CURP876543",
      rfc: "RFC876543",
      state: "State8",
      accions: "Edit | Delete",
    },
    {
      id: "1528ed60f",
      name: "User9",
      birthDate: "1993-05-05",
      curp: "CURP123123",
      rfc: "RFC123123",
      state: "State9",
      accions: "Edit | Delete",
    },
  ];
}

export default function Personal(): JSX.Element {
  // Define el estado de `data` con el tipo `Payment[]`
  const [data, setData] = useState<Payment[]>([]);

  // `useEffect` para cargar los datos al montar el componente
  useEffect(() => {
    getData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  return (
    <Layout>
      <div>
        <MainTitle>Personal</MainTitle>
      </div>
      <div className="my-6">
        <MainButton>Agregar usuario</MainButton>
        <MainButton>Cargar Excel</MainButton>
      </div>

      <hr className="mb-8 bg-gradient-to-r from-lightSky via-aqua to-deepSea h-[2px] border-none" />

      <div className="container mx-auto py-0">
        <DataTable columns={columns} data={data} />
      </div>
    </Layout>
  );
}
