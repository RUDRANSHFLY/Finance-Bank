"use server";

import { Client } from "dwolla-v2";
import {
  addFundingSourceParams,
  CreateFundingSourceOptions,
  NewDwollaCustomerParams,
  TransferParams,
} from "../../types";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environemnt should either be set to 'sandbox' or 'production'"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

/**
 * * Create a Dwolla Funding Source using a Plaid Processor Token
 */

export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (error) {
    console.log("Creating a Funding Source Failed :", error);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );

    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (error) {
    console.log("Creating an On Demand Authorization Failed", error);
  }
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));
  } catch (error) {
    console.log("Creating a Dwolla Customer Failed", error);
  }
};

export const createTransfer = async ({
  amount,
  destinationFundingSourceUrl,
  sourceFundingSourceUrl,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };

    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (error) {
    console.error("Transfer fund failed: ", error);
  }
};

export const addFundingSource = async ({
  bankName,
  dwollaCustomerId,
  processorToken,
}: addFundingSourceParams) => {
  try {
    const dwollaAuthLinks = await createOnDemandAuthorization();

    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };

    return await createFundingSource(fundingSourceOptions);
  } catch (error) {
    console.log("Transfer Adding Fund Failed", error);
  }
};
