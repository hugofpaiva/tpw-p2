import {Client} from './client';
import {Product} from './product';

export class Review {
  author: Client;
  product: Product;
  rating: number;
  created_at: Date;
  update_at: Date;
  body: string;

  constructor(author: Client, product: Product, rating: number, created_at: Date, update_at: Date, body: string) {
    this.author = author;
    this.product = product;
    this.rating = rating;
    this.created_at = created_at;
    this.update_at = update_at;
    this.body = body;
  }
}
