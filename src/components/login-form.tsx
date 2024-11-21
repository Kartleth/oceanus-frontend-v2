import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import logoSVG from "/src/assets/oceanus-logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { TriangleAlert } from 'lucide-react';

export function LoginForm() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar una solicitud POST al backend
      const response = await axios.post(
        "http://localhost:3001/usuarios/login",
        {
          usuario,
          password,
        }
      );

      // Si la respuesta es exitosa
      console.log("Login exitoso:", response.data);
      //aqui va la ruta a donde pueda ir
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      console.error("Error de login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-ocean via-deepSea to-aqua">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <img src={logoSVG} alt="Oceanus Logo" className="h-20" />
          </div>
          <CardTitle className="text-2xl">Inicio de sesión</CardTitle>
          <CardDescription>
            Ingrese su usuario a continuación para iniciar sesión en OceanusDB{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-2">{error}</p>}{" "}
          {/* Mostrar error */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              onClick={handleLogin}
              className="w-full bg-deepSea hover:bg-ocean"
            >
              Iniciar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
