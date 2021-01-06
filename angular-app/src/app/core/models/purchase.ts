import {User} from './user';
import {Product} from './product';

export class Purchase {
  id: number;
  client: User;
  product: Product;
  created_at: Date;

  constructor(id: number, client: User, product: Product, created_at: Date) {
    this.id = id;
    this.client = client;
    this.product = product;
    this.created_at = created_at;
  }
}
