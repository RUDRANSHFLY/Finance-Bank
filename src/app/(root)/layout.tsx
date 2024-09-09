import MobileNavBar from "@/components/navbar/MobileNavBar";
import SideBar from "@/components/navbar/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={"h-screen w-full flex font-inter"}>
      <SideBar
        user={{
          $id: "",
          email: "",
          userId: "",
          dwollaCustomerUrl: "",
          dwollaCustomerId: "",
          firstName: "",
          lastName: "",
          address1: "",
          city: "",
          state: "",
          postalCode: "",
          dateOfBirth: "",
          ssn: "",
        }}
      />
      <div className={"flex size-full flex-col"}>
        <div className={"root-layout"}>
          <Image src={"/icons/logo.svg"} alt={"logo"} width={30} height={30} />
          <div>
            <MobileNavBar
              user={{
                $id: "",
                email: "",
                userId: "",
                dwollaCustomerUrl: "",
                dwollaCustomerId: "",
                firstName: "",
                lastName: "",
                address1: "",
                city: "",
                state: "",
                postalCode: "",
                dateOfBirth: "",
                ssn: "",
              }}
            />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
