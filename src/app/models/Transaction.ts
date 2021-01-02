export interface Transaction {
  type: string;
  who: string;
  category: string;
  title: string;
  date: Date;
  value: number;
  notes: string;
}
