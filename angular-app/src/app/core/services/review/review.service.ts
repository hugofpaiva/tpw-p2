import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Review} from '../../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  constructor(private http: HttpClient) {
  }

  getReview(id: number): Observable<Review>{
    const url = environment.baseURL + 'review/' + id;
    return this.http.get<Review>(url);
  }

  getReviews(productId?: number): Observable<Review[]>{
    let url = environment.baseURL + 'reviews';
    if (productId){
      url += '?product=' + productId;
    }
    return this.http.get<Review[]>(url);
  }


  getReviewP(page: number): Observable<Review[]>{
    const url = environment.baseURL + 'reviews?page=';
    return this.http.get<Review[]>(url);
  }

}
