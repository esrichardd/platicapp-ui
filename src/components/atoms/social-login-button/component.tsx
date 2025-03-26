import { Button } from "@/components/ui/button";
import { SocialLoginButtonProps } from "./types";

export function SocialLoginButton({ icon, text }: SocialLoginButtonProps) {
  return (
    <Button variant="outline" className="w-full flex gap-2">
      {icon}
      {text}
    </Button>
  );
}
