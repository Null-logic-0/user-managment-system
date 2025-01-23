"use client";
import { login } from "@/lib/actions";
import FormSubmit from "./FormSubmit";
import Input from "./Input";
import FormError from "./FormError";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");

  return (
    <form className=" flex flex-col gap-8 p-5 rounded-b" action={login}>
      <Input
        type="email"
        name="email"
        id="email"
        htmlFor="email"
        label="Email address"
      />

      <Input
        type="password"
        name="password"
        id="password"
        htmlFor="password"
        label="Password"
      />
      <FormError error={errorMessage} />

      <FormSubmit>Login</FormSubmit>
    </form>
  );
}

export default LoginForm;
