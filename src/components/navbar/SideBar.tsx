"use client";

import React from "react";
import { SideBarProps } from "../../../types";
import Link from "next/link";
import Image from "next/image";
import { sideBarLinks } from "../../../constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Footer from "../footer/Footer";

const SideBar = ({ user }: SideBarProps) => {
  const pathName = usePathname();

  return (
    <section className={"sideBar"}>
      <nav className={"flex flex-col gap-4 items-baseline"}>
        <Link
          href={"/"}
          className={"flex  mb-12 cursor-pointer items-center gap-2"}
        >
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt={"logo horizon"}
            className={"size-[24px] max-xl:size-14"}
          />
          <h1 className="sideBar-logo">Horizon</h1>
        </Link>

        {sideBarLinks.map((item) => {
          const isActive =
            pathName === item.route || pathName.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sideBar-link", {
                "bg-bankGradient text-white ": isActive,
              })}
            >
              <div className={"relative size-6"}>
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    "brightness-[3] invert-0": isActive,
                  })}
                />
              </div>
              <p className={"sideBar-label"}>{item.label}</p>
            </Link>
          );
        })}
      </nav>
      <Footer user={user} />
    </section>
  );
};

export default SideBar;
