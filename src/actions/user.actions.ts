"use server";

import { createAdminClient, createSessionClient } from "@/server/appwrite";
import {
  CreateBankAccountProps,
  exchangePublicTokenProps,
  SignInParams,
  SignUpParams,
  User,
} from "../../types";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import {
  extractCustomerIdFromUrl,
  parseStringify,
} from "../../util/utilFunction";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import plaidClient from "@/helper/plaid";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANKS_COLLECTION_ID: BANKS_COLLECTION_ID,
} = process.env;

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  let newUserAccount;

  try {
    const { email, firstName, lastName } = userData;
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) {
      throw new Error("Error creating user");
    }

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    if (!dwollaCustomerUrl) {
      throw new Error("Error creating Dwolla Customer");
    }

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error", error);
  }
};

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    const done = await account.deleteSession("current");

    if (done) {
      return true;
    }
  } catch (error) {
    return null;
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const reponse = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: reponse.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    const reponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = reponse.data.access_token;
    const itmeId = reponse.data.item_id;

    const accountResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountResponse.data.accounts[0];

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    if (!fundingSourceUrl) {
      throw Error;
    }
  } catch (error) {
    console.log("An error occured while creating exchanging token :", error);
  }
};

export const createBankAccount = async ({
  accountId,
  acessToken,
  bankId,
  fundingSourceUrl,
  shareableId,
  userId,
}: CreateBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANKS_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        accountId,
        bankId,
        fundingSourceUrl,
        shareableId,
        acessToken,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
};
