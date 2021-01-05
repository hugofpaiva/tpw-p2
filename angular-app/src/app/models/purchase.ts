import {User} from './user';
import {Product} from './product';

export class Purchase {
  id: number;
  client: User;
  product: Product;
  created_at: Date;
}
