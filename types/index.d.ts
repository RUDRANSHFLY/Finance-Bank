declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  insititutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  shareableId: string;
};

interface HeaderProps {
  type?: string | "title";
  tiitle: string;
  user?: string;
  subTitle: string;
}

interface TotalBalanceBoxProps {
  account: [];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface DoughnutChartProps {
  accounts: Account[];
}

export { HeaderProps, TotalBalanceBoxProps, DoughnutChartProps };
