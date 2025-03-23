import Image from "next/image";
import logo from "@/assets/logo.webp";
import LocaleSwitcher from "./LocaleSwitcher";
import Link from "next/link";
export default function PageHeader() {
  return (
    <header className="w-full flex items-center justify-between py-10">
      <Link href={"/"} className="w-32 ">
        <Image src={logo} alt="logo" />
      </Link>
      <LocaleSwitcher />
    </header>
  );
}
