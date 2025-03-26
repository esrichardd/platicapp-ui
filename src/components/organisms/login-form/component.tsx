import { cn } from "@/lib/helpers/shadcn-utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SocialLogin } from "@/components/molecules";
import { TextInput } from "@/components/atoms";
import { Button } from "@/components/ui/button";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de Apple o Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <SocialLogin />
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  O continua con
                </span>
              </div>
              <div className="grid gap-6">
                <TextInput
                  id="email"
                  label="Correo electrónico"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <div className="grid gap-2">
                  <TextInput
                    id="password"
                    label="Contraseña"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-6">
                <Button type="submit" className="w-full">
                  Iniciar sesión
                </Button>
                <div className="text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Regístrate
                  </a>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        Al continuar, aceptas nuestros{" "}
        <a href="#" className="underline underline-offset-4">
          Términos de servicio
        </a>{" "}
        y nuestra{" "}
        <a href="#" className="underline underline-offset-4">
          Política de privacidad
        </a>
        .
      </div>
    </div>
  );
}
