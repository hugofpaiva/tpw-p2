import {User} from './user';
import {Product} from './product';

export class Client {
  user: User;
  created_at: Date;
  balance: number;
  favorites: Product[];

  constructor(user: User, created_at: Date, balance: number, favorites: Product[]) {
    this.user = user;
    this.created_at = created_at;
    this.balance = balance;
    this.favorites = favorites;
  }
}
