"use client";

import React from "react";
import { MobileNavProps } from "../../../types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sideBarLinks } from "../../../constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Footer from "../footer/Footer";

const MobileNavBar = ({ user }: MobileNavProps) => {
  const pathName = usePathname();

  return (
    <section className={"w-full max-w-[264px]"}>
      <Sheet>
        <SheetTrigger>
          <Image
            src={"/icons/hammer.svg"}
            alt={"hammer icon"}
            width={30}
            height={30}
            className={"cursor-pointer"}
          />
        </SheetTrigger>
        <SheetContent side={"left"} className={"border-none bg-white"}>
          <Link
            href={"/"}
            className={"flex cursor-pointer items-center gap-1 px-4"}
          >
            <Image
              src={"/icons/logo.svg"}
              width={34}
              height={34}
              alt={"logo horizon"}
            />
            <h1 className="text-26 font-secondary font-bold text-black-1">
              Horizon
            </h1>
          </Link>
          <div className={"mobileNavBar-Sheet"}>
            <SheetClose asChild>
              <nav className={"flex h-full flex-col gap-6 pt-16 text-white"}>
                {sideBarLinks.map((item) => {
                  const isActive =
                    pathName === item.route ||
                    pathName.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("mobileNavBar-SheetClose w-full", {
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
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER
              </nav>
            </SheetClose>
            <Footer user={user} type={"mobile"} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNavBar;
