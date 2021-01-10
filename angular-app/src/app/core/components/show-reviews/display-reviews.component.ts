import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Product} from '../../models/product';
import {Review} from '../../models/review';

@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.css']
})
export class DisplayReviewsComponent implements OnInit {
  @Input() reviews: Review [] = [];
  /*
   Child Component used in the Product Page to show it's Reviews
   */
  constructor() { }

  ngOnInit(): void {
    console.log('child' + this.reviews);
    console.log(this.reviews);
  }

}
