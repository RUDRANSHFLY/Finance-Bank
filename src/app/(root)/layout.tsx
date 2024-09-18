import { getLoggedInUser } from "@/actions/user.actions";
import MobileNavBar from "@/components/navbar/MobileNavBar";
import SideBar from "@/components/navbar/SideBar";
import Image from "next/image";
import { User } from "../../../types";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: User = await getLoggedInUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className={"h-screen w-full flex font-inter"}>
      <SideBar user={user} />
      <div className={"flex size-full flex-col"}>
        <div className={"root-layout"}>
          <Image src={"/icons/logo.svg"} alt={"logo"} width={30} height={30} />
          <div>
            <MobileNavBar user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
