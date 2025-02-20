import { FC } from "react";
import { useQuery } from "react-query";
import { FormSelect, SelectItem } from "../ui/select";
import { Empresa } from "@/modelos/empresa";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export const SelectEmpresa: FC<Props> = ({ value, onChange }) => {
  const { status, data } = useQuery({
    queryKey: ["empresas"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/empresa");
      const data = await res.json();

      const empresaSafeParse = Empresa.array().safeParse(data);

      if (!empresaSafeParse.success) {
        console.error(empresaSafeParse.error.toString());

        throw new Error("Error al obtener empresas");
      }

      return empresaSafeParse.data;
    },
  });

  const selectPlaceholder =
    status === "loading"
      ? "Cargando empresas..."
      : status === "error"
      ? "Error al cargar empresas"
      : "Selecciona una empresa";

  return (
    <FormSelect
      defaultValue={value?.toString()}
      placeholder={selectPlaceholder}
      onValueChange={onChange}
    >
      {data?.map((empresa) => (
        <SelectItem
          key={`Empresa ${empresa.idempresa}`}
          value={empresa.idempresa.toString()}
        >
          {empresa.razonsocial}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
