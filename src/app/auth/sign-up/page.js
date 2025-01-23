import BgWrapper from "@/components/BgWrapper";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";

function RegisterPage() {
  return (
    <BgWrapper>
      <SignupForm />
      <div className="flex items-center justify-center gap-1 pb-4">
        <span className="text-gray-800 font-medium text-lg">
          Already have a account ?
        </span>
        <Link href={"/auth/login"} className="text-gray-800 font-semibold">
          Login
        </Link>
      </div>
    </BgWrapper>
  );
}

export default RegisterPage;
