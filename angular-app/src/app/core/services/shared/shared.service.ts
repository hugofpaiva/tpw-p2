import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Client } from '../../models/client';
import {Alert, AlertType} from '../../models/alert';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/*
Used to retrieve current User Logged in
 */
export class SharedService {
  public subject = new Subject<any>();
  private subjectAlert = new Subject<Alert>();
  private defaultId = 'default-alert';

  constructor() {
  }

  sendUserEvent(): void {
    this.subject.next();
  }

  getUserEvent(): Observable<any> {
    return this.subject.asObservable();
  }


  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  // convenience methods
  success(message: string, options?: any): void {
    this.alert(new Alert({...options, type: AlertType.Success, message}));
  }

  error(message: string, options?: any): void {
    this.alert(new Alert({...options, type: AlertType.Error, message}));
  }


  // main alert method
  alert(alert: Alert): void {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId): void {
    this.subject.next(new Alert({id}));
  }
}
