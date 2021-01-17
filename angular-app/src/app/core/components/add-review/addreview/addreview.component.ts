import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ReviewService} from '../../../services/review/review.service';
import {Review} from '../../../models/review';
import {Location} from '@angular/common';
import {SharedService} from '../../../services/shared/shared.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-addreview',
  templateUrl: './addreview.component.html',
  styleUrls: ['./addreview.component.css']
})
export class AddreviewComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  new_review: boolean;
  @Input() reviewObjForm: Review; // the Review Object to be Used in The Form
  loading = false;
  revForm: FormGroup; // the Review Form
  logoutInEventSubscription: Subscription;
  productid: number;
  constructor(
    private  location: Location,
    private activerouter: ActivatedRoute,
    private alertService: SharedService,
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private router: Router) {
    this.logoutInEventSubscription = this.alertService.getUserEvent().subscribe(() => {
      this.logoutHappened();
    });
    this.new_review = true;
    // the author will not be in the form because we are assuming the client is the Author,
    // besides that the endpoint being used of the REST API also puts as the author, the client associated
    // with the Request Token.
    this.revForm =  this.formBuilder.group({
      rating: ['', [Validators.required, Validators.min(0), Validators.max(5), Validators.pattern('[1-5]' )]],
      body: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  logoutHappened(): void {
      this.logoutInEventSubscription.unsubscribe();
      this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.getMyReview();
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.revForm.controls; }
  getMyReview(): void {
    // tslint:disable-next-line:variable-name
    this.productid = Number(this.activerouter.snapshot.paramMap.get('id'));
    if (this.productid  ){
      this.reviewService.getMyReviews(this.productid).subscribe( reviews => {
        if (reviews.length !== 0){
          this.reviewObjForm = reviews[0];
          this.new_review = false;
        }
        else {
          this.reviewObjForm = new Review();
        }
      });
    }
  }

  submitReview(): void {
    if (this.revForm.invalid){
      return;
    }
    const serialized = JSON.stringify(this.reviewObjForm);
    const dict = JSON.parse(serialized);
    dict.product = this.productid;
    this.loading = true;
    // New Review
    if (this.new_review) {
      this.reviewService.registerReview(dict).subscribe(data => {
        console.log(data);
        this.loading = false;
        this.revForm.reset();
        this.alertService.success('Sucess Inserting new Review !', { keepAfterRouteChange: true});
        this.location.back();
      }, error => {
        console.log(error);
        this.loading = false;
        if (error.error.error_message){
          this.alertService.error(error.error.error_message, { autoClose: true});
        }
        else{
          this.alertService.error('Something went wrong. Could not add your Review!', {autoClose: true, fade: true});
        }
      });
    }
    // Update Review
    else{
      dict.author = this.reviewObjForm.author.id;
      this.reviewService.updateReview(dict, this.reviewObjForm.id).subscribe( data  => {
        this.loading = false;
        this.location.back();
      }, error => {
        this.loading = false;

        console.log(error);
        if (error.error.error_message){
          this.alertService.error(error.error.error_message, { autoClose: true});
        }
        else{
          this.alertService.error('Could not edit your Review!', {autoClose: true});
        }
      });
    }

  }

}
