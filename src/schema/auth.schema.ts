import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";

const AuthSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type AuthForm = zod.infer<typeof AuthSchema>;

export function useAuthForm() {
  const methods = useForm<AuthForm>({
    resolver: zodResolver(AuthSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  return methods;
}
