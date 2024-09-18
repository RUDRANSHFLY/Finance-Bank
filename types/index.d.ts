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

declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

/* 
  ! Transaction Related
*/

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

export declare interface HeaderProps {
  type?: string | "title";
  tiitle: string;
  user?: string;
  subTitle: string;
}

export declare interface MobileNavProps {
  user: User;
}

export declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

export declare interface SideBarProps {
  user: User;
}

export declare interface RightSideBarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

export declare interface TotalBalanceBoxProps {
  account: [];
  totalBanks: number;
  totalCurrentBalance: number;
}

export declare interface DoughnutChartProps {
  accounts: Account[];
}

export declare interface RightSideBarProps {
  user: User;
  transactions: Transaction[];
  bank: Bank[] & Account[];
}

export declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

/* 
  ! Auth Related
*/

export declare type SignUpParams = {
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
  email: string;
  password: string;
};

export declare type SignInParams = {
  email: string;
  password: string;
};
