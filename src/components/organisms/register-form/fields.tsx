import { TextInput } from "@/components/atoms";

type RegisterFieldsProps = {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError: string;
};

export function RegisterFields({
  formData,
  handleChange,
  passwordError,
}: RegisterFieldsProps) {
  return (
    <div className="grid gap-6">
      <TextInput
        id="name"
        label="Nombre completo"
        type="text"
        placeholder="Juan Pérez"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextInput
        id="email"
        label="Correo electrónico"
        type="email"
        placeholder="m@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextInput
        id="password"
        label="Contraseña"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <TextInput
        id="confirmPassword"
        label="Confirmar contraseña"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        error={passwordError}
      />
    </div>
  );
}
