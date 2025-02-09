import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoSVG from "../assets/oceanus-logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token leído desde localStorage:", token);
    if (token) {
      navigate("/personal");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        usuario: username,
        password,
      });

      const token = response.data.access_token;
      const userData = response.data.user;

      if (!token || !userData) {
        console.error(
          "No se recibió un token o datos de usuario en la respuesta."
        );
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Token y usuario guardados correctamente:", token, userData);
      navigate("/personal");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      console.error(
        "Error en el inicio de sesión:",
        err.response?.data || err.message
      );
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
          {error && (
            <Alert className="bg-red-100 border-red-200 mb-5">
              <CircleAlert className="h-4 w-4" color="#F44336" />
              <AlertTitle className="text-red-500">Error</AlertTitle>
              <AlertDescription className="text-red-500">
                {error}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="usuario">Usuario</Label>
              <Input
                id="usuario"
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
