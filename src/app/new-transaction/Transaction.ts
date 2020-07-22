export interface Transaction {
  type: string;
  who: string;
  category: string;
  title: string;
  date: object;
  value: number;
  notes: string;
}
