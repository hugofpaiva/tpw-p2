import {User} from './user';
import {Product} from './product';

export class Purchase {
  client: User;
  product: Product;
  created_at: Date;
}
