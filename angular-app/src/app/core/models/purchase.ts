import {Client} from './client';
import {Product} from './product';

export class Purchase {
  id: number;
    client: Client;
  product: Product;
  created_at: Date;

  constructor(id: number, client: Client, product: Product, created_at: Date) {
    this.id = id;
    this.client = client;
    this.product = product;
    this.created_at = created_at;
  }
}
