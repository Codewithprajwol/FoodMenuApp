export type CardColor = 'orange' | 'pink' | 'gray';

export interface MenuItem {
  _id?: string;
  title: string;
  price: number;
  imageUrl: string;
}