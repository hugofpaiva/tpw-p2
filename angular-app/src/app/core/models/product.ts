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



  constructor(id: number, name: string, icon: string, description: string, category: Category[],
              developer: Developer, price: number, stars: number) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.category = category;
    this.developer = developer;
    this.price = price;
    this.stars = stars;
  }
}
