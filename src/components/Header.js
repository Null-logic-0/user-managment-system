import { FiLogOut } from "react-icons/fi";
import ActionButton from "./ActionButton";
import { logout } from "@/lib/actions";
import { getUserData } from "@/lib/data-services";

async function Header() {
  const user = await getUserData();

  return (
    <div className="flex justify-between items-center p-14">
      <h3 className="font-semibold text-lg">Welcome,{user.fullName} 👋</h3>

      <ActionButton action={logout}>
        <FiLogOut className="text-xl" />
      </ActionButton>
    </div>
  );
}

export default Header;
