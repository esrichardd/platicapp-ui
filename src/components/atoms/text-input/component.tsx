import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextInputProps } from "./types";

export function TextInput({
  id,
  label,
  type = "text",
  placeholder,
  required,
}: TextInputProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
