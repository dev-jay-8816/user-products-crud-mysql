export interface IProduct {
  id: number;
  title: string;
  description: string;
  is_enabled: boolean;
  published_date: string;
  image_url: string;
  user_id: number;
  updatedAt: string;
  createdAt: string;
}


export interface ICreateEditProduct {
  title: string;
  description: string;
  is_enabled: boolean;
  published_date: Date;
  image_url: string | null;
}