import {User} from './user';
import {Product} from './product';

export class Review {
  author: User;
  product: Product;
  rating: number;
  created_at: Date;
  updated_at: Date;
  body: string;

  constructor(author: User, product: Product, rating: number, created_at: Date, updated_at: Date, body: string) {
    this.author = author;
    this.product = product;
    this.rating = rating;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.body = body;
  }
}
