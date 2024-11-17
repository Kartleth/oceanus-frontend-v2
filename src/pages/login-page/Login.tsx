import logo from "../../assets/oceanus-logo.svg";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="flex bg-gradient-to-r from-softAqua to-lightsky items-center justify-center h-screen">
      <div>
        <Card className="mx-auto sm:w-90 md:w-96  ">
          <CardHeader>
            <img src={logo} alt="oceanus_logo" className="w-36 mx-auto"></img>
            <CardTitle className="text-xl text-gray-600 text-center">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="user"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Usuario
                  </label>
                  <input
                    id="user"
                    placeholder="Usuario"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label
                    htmlFor="password_user"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Contraseña
                  </label>
                  <input
                    id="password_user"
                    placeholder="Contraseña"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-aqua hover:bg-deepSea">Iniciar sesión</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
