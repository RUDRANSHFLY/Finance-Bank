"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React from "react";
import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "./helper";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { signIn, signUp } from "@/actions/user.actions";
import PlaidLink from "../plaid/PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          email: data.email,
          password: data.password,
          firstName: data.firstName!,
          lastName: data.lastName!,
          dateOfBirth: data.dateOfBirth!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          ssn: data.ssn!,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={"auth-form"}>
      <header className={"flex flex-col gap-5 md:gap-8"}>
        <Link href={"/"} className={"flex cursor-pointer items-center gap-1 "}>
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
        <div className={"flex flex-col gap-1 md:gap-3"}>
          <h1 className={"text-24 lg:text-36 font-semibold text-gray-900"}>
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className={"text-16 font-normal text-gray-600"}>
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className={"flex flex-col gap-4"}>
          <PlaidLink user={user} variant={"primary"} />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <>
                {type === "sign-up" && (
                  <>
                    <div className={"flex gap-4"}>
                      <CustomInput
                        control={form.control}
                        name={"firstName"}
                        label={"First Name"}
                        placeHolder={"Enter your first name"}
                        type={"text"}
                      />
                      <CustomInput
                        control={form.control}
                        name={"lastName"}
                        label={"Last Name"}
                        placeHolder={"Enter your last name"}
                        type={"text"}
                      />
                    </div>
                    <div className={"flex gap-4"}>
                      <CustomInput
                        control={form.control}
                        name={"address1"}
                        label={"Address"}
                        placeHolder={"Enter your specific address"}
                        type={"text"}
                      />
                      <CustomInput
                        control={form.control}
                        name={"city"}
                        label={"City"}
                        placeHolder={"Enter your city"}
                        type={"text"}
                      />
                    </div>
                    <div className={"flex gap-4"}>
                      <CustomInput
                        control={form.control}
                        name={"state"}
                        label={"State"}
                        placeHolder={"Example : NV"}
                        type={"text"}
                      />
                      <CustomInput
                        control={form.control}
                        name={"postalCode"}
                        label={"Postal Code"}
                        placeHolder={"Example : 11101"}
                        type={"number"}
                      />
                    </div>
                    <div className={"flex gap-4"}>
                      <CustomInput
                        control={form.control}
                        name={"dateOfBirth"}
                        label={"Date of Birth"}
                        placeHolder={"YYYY-MM-DD"}
                      />
                      <CustomInput
                        control={form.control}
                        name={"ssn"}
                        label={"SSN"}
                        placeHolder={"Example : 1234"}
                        type={"number"}
                      />
                    </div>
                  </>
                )}
                <CustomInput
                  control={form.control}
                  name={"email"}
                  label={"Email"}
                  placeHolder={"enter your email"}
                />
                <CustomInput
                  control={form.control}
                  name={"password"}
                  label={"Password"}
                  placeHolder={"enter your password"}
                  type={"password"}
                />
              </>

              <div className={"flex flex-col gap-4"}>
                <Button className={"form-btn"} type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className={"animate-spin"} />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className={"flex justify-center gap-1"}>
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
