import { FC } from "react";
import { useQuery } from "react-query";
import { FormSelect, SelectItem } from "../ui/select";
import { Cliente } from "@/modelos/cliente";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

export const SelectEmpresa: FC<Props> = ({ value, onChange }) => {
  const { status, data } = useQuery({
    queryKey: ["empresas"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3001/cliente");
      const data = await res.json();

      const empresaSafeParse = Cliente.array().safeParse(data);

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
          key={`Empresa ${empresa.idCliente}`}
          value={empresa.idCliente.toString()}
        >
          {empresa.razonsocial}
        </SelectItem>
      ))}
    </FormSelect>
  );
};
