export interface ProductHistory {
  date: string;
  field: string;
  oldValue: any;
  newValue: any;
}

export interface Product {
  id: string;
  productName: string;
  category: string;
  totalPrice: number;
  description: string;
  stock: number;
  dateMade: string;
  history: ProductHistory[];
}
