import {User} from './user';
import {Product} from './product';

export class Client {
  id: number;
  user: User;
  created_at: Date;
  balance: number;
  favorites: Product[];

  constructor(id: number, user: User, created_at: Date, balance: number, favorites: Product[]) {
    this.id = id;
    this.user = user;
    this.created_at = created_at;
    this.balance = balance;
    this.favorites = favorites;
  }
}
