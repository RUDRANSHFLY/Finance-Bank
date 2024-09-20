import React, { useCallback, useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import { PlaidLinkProps } from "../../../types";
import {
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  usePlaidLink,
} from "react-plaid-link";

import { Button } from "../ui/button";
import { createLinkToken, exchangePublicToken } from "@/actions/user.actions";

const PlaidLink = ({ user, dwollaCustomerId, variant }: PlaidLinkProps) => {
  const router = useRouter();

  useEffect(() => {
    const getLinkedToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };

    getLinkedToken();

    return () => {};
  }, [user]);

  const [token, setToken] = useState("");

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },
    [user, router]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { ready, open } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button className={"plaidlink-primary"}>Connect Bank</Button>
      ) : variant === "ghost" ? (
        <Button className={"pladlink-ghost"}>Connect Bank</Button>
      ) : (
        <Button className={"pladlink-deafult"}>Connect Bank</Button>
      )}
    </>
  );
};

export default PlaidLink;
