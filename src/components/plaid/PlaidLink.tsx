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
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getLinkedToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkedToken();
  }, [user]);

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

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className={"plaidlink-primary"}
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={() => open()}
          variant={"ghost"}
          className={"pladlink-ghost"}
        >
          Connect Bank
        </Button>
      ) : (
        <Button onClick={() => open()} className={"pladlink-deafult"}>
          Connect Bank
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
