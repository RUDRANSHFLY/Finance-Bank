import React from "react";
import { RightSideBarProps } from "../../../types";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import BankCard from "../banks/BankCard";

const RightSideBar = ({
  bank,
  transactions,
  user,
  banks,
}: RightSideBarProps) => {
  return (
    <aside className={"right-sidebar"}>
      <section className={"flex flex-col pb-8"}>
        <div className={"profile-banner"} />
        <div className={"profile"}>
          <div className={"profile-img"}>
            <span className={"text-5xl font-bold text-blue-500 uppercase"}>
              {user.name[0] || "User-name"}
            </span>
          </div>
          <div className={"profile-details"}>
            <h1 className={"profile-name"}> {user.name}</h1>
            <p className={"profile-email"}>{user.email}</p>
          </div>
        </div>
      </section>
      <section className={"banks"}>
        <div className={"flex w-full justify-between"}>
          <h2 className={"header-2"}>My Banks</h2>
          <Link href={"/"} className={"flex gap-2"}>
            <PlusIcon width={20} height={20} />
            <h2 className={"text-14 font-semibold text-gray-600"}>Add Bank</h2>
          </Link>
        </div>

        {banks?.length > 0 && (
          <div
            className={
              "relative flex flex-1 flex-col items-center justify-center gap-5 "
            }
          >
            <div className={"relative z-10"}>
              <BankCard
                account={{
                  id: "",
                  availableBalance: 0,
                  currentBalance: 1500,
                  officialName: "",
                  mask: "",
                  insititutionId: "",
                  name: user.name,
                  type: "",
                  subtype: "",
                  appwriteItemId: "",
                  shareableId: "",
                }}
                userName={user.name}
              />
            </div>
            {banks[1] && (
              <div className={"absolute right-0 top-8 z-0 w-[90%]"}>
                <BankCard
                  account={{
                    id: "",
                    availableBalance: 0,
                    currentBalance: 5000,
                    officialName: "",
                    mask: "",
                    insititutionId: "",
                    name: user.name,
                    type: "",
                    subtype: "",
                    appwriteItemId: "",
                    shareableId: "",
                  }}
                  userName={user.name}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};

export default RightSideBar;
