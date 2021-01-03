import {Category} from './category';
import {Developer} from './developer';

export class Product {
  id: number;
  name: string;
  icon: string;
  description: string;
  categories: Category[];
  developer: Developer;
  price: number;
  stars: number;
}
