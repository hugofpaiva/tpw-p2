import {User} from './user';
import {Product} from './product';

export class Review {
  author: User;
  product: Product;
  rating: number;
  created_at: Date;
  updated_at: Date;
  body: string;
}
