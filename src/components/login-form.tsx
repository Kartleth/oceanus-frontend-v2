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

export function LoginForm() {
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Usuario</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-deepSea hover:bg-ocean">
              Iniciar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
