export interface AdminPrice {
  id: string;
  title: string;
  price: string;
  sale_price?: string;
  category?: string;
  unit: string;
  weight?: string;
  on_sale: boolean;
  is_visible: boolean;
  image?: string;
}

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  size?: number;
}
