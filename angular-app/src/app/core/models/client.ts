import {User} from './user';
import {Product} from './product';

export class Client {
  id: number;
  user: User;
  created_at: Date;
  balance: number;
  favorites: Product[];


}
