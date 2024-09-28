export function formatAmount(amount: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
}

export const parseStringify = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

export function extractCustomerIdFromUrl(url: string) {
  const parts = url.split("/");

  const customerId = parts[parts.length - 1];
  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}
