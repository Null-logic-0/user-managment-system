import BgWrapper from "@/components/BgWrapper";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { Suspense } from "react";

function LoginPage() {
  return (
    <BgWrapper>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
      <div className="flex items-center justify-center gap-1 pb-4">
        <span className="text-gray-800 font-medium text-lg">
          Don&apos;t have a account ?
        </span>
        <Link href={"/auth/sign-up"} className="text-gray-800 font-semibold">
          Register
        </Link>
      </div>
    </BgWrapper>
  );
}

export default LoginPage;
