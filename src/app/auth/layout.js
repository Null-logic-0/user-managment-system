import Image from "next/image";
import bg from "../../../public/bg.png";
function layout({ children }) {
  return (
    <div>
      <Image
        src={bg}
        alt="bg"
        fill
        quality={100}
        className="object-cover -z-10"
      />
      {children}
    </div>
  );
}

export default layout;
