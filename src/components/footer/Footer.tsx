import React from "react";
import { FooterProps } from "../../../types";
import { LogOutIcon } from "lucide-react";
import { logoutAccount } from "@/actions/user.actions";

import { useRouter } from "next/navigation";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) {
      router.push("/sign-up");
    }
  };

  return (
    <footer className={"footer"}>
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className={"text-xl font-bold text-gray-700"}>
          {user?.name[0] || "user-name"}
        </p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className={"text-14 truncate font-bold text-gray-900"}>
          {user?.name || "UserName"}
        </h1>
        <p className={"text-14 truncate font-normal text-gray-600"}>
          {user?.email || "user-email"}
        </p>
      </div>
      <div className={"footer_image"}>
        <LogOutIcon
          className={"absolute text-slate-700"}
          width={20}
          height={20}
          onClick={handleLogOut}
        />
      </div>
    </footer>
  );
};

export default Footer;
