import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {Product} from '../../models/product';
import {Review} from '../../models/review';
import {Client} from '../../models/client';

@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.css']
})
export class DisplayReviewsComponent implements OnInit {
  /*
   Child Component used in the Product Page to show it's Reviews
   */

  @Input() reviews: Review [] = []; // reviews for the specific product
  // tslint:disable-next-line:variable-name
  @Input() has_review: boolean =  Boolean();
  p: number = Number(1);  // pagination variable
  constructor() {
  }


  ngOnInit(): void {
    console.log('child' + this.reviews);
    console.log(this.reviews);
  }
}
