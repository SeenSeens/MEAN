export interface Product {
  _id?: string;
  name: string,
  description: string,
  thumbnail: string,
  category: string,
  price: number
}
export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
