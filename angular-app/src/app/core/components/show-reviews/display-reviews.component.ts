import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {Review} from '../../models/review';

@Component({
  selector: 'app-display-reviews',
  templateUrl: './display-reviews.component.html',
  styleUrls: ['./display-reviews.component.css']
})
export class DisplayReviewsComponent implements OnInit {
  @Input() review: Review ;
  @Input() product: Product;
  /*
   Child Component used in the Product Page to show it's Reviews
   */
  constructor() { }

  ngOnInit(): void {
    console.log(this.review);
  }

}
