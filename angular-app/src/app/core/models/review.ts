import {Client} from './client';
import {Product} from './product';

export class Review {
  id: number;
  author: Client;
  product: Product;
  rating: number;
  created_at: Date;
  update_at: Date;
  body: string;


}
