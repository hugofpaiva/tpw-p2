import {Category} from './category';
import {Developer} from './developer';

export class Product {
  id: number;
  name: string;
  icon: string;
  description: string;
  category: Category[];
  developer: Developer;
  price: number;
  stars: number;
  // tslint:disable-next-line:variable-name
  n_of_purchases: number;
}
