"use client";

import { useFormStatus } from "react-dom";

function FormSubmit({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 p-2  rounded-md w-full text-white shadow-md font-semibold text-lg hover:bg-blue-700 cursor-pointer"
    >
      {pending ? "is pending.." : children}
    </button>
  );
}

export default FormSubmit;
