"use client";
import { createUser } from "@/lib/actions";
import FormSubmit from "./FormSubmit";
import Input from "./Input";
import { useActionState } from "react";
import FormError from "./FormError";

function SignupForm() {
  const [formState, formAction] = useActionState(createUser, { errors: {} });
  return (
    <form className="flex flex-col gap-8 p-5 rounded-b" action={formAction}>
      <div>
        <Input
          type="text"
          name="fullName"
          id="fullName"
          htmlFor="fullName"
          label="Full Name"
        />
        <div className="h-3">
          <FormError error={formState.errors.fullName} />
        </div>
      </div>
      <div>
        <Input
          type="email"
          name="email"
          id="email"
          htmlFor="email"
          label="Email address*"
        />
        <div className="h-3">
          <FormError error={formState.errors.email} />
        </div>
      </div>

      <div className="flex gap-2 items-center max-sm:flex-wrap">
        <div className="w-full">
          <Input
            type="password"
            name="password"
            id="password"
            htmlFor="password"
            label="Password*"
          />
          <div className="h-3">
            <FormError error={formState.errors.password} />
          </div>
        </div>
        <div className="w-full">
          <Input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            htmlFor="repeatPassword"
            label="Repeat Password*"
          />
          <div className="h-3">
            <FormError error={formState.errors.repeatPassword} />
          </div>
        </div>
      </div>

      <FormSubmit>Signup</FormSubmit>
    </form>
  );
}

export default SignupForm;
