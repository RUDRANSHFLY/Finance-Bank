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
