export interface ICurrency {
  code: string;
  exchangeRate: number;
  lastUpdated: Date;
  lastAutoUpdateAttempt: Date;
  isLoading: boolean;
}