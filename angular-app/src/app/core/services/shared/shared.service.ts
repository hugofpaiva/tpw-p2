import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
/*
Used to retrieve current User Logged in
 */
export class SharedService {
  public subject = new Subject<any>();
  constructor() { }

  sendUserEvent(): void {
    this.subject.next();
  }
  getUserEvent(): Observable<any>{
    return this.subject.asObservable();
  }

}
