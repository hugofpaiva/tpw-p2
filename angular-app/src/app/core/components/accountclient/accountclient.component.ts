import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client/client.service';
import {AuthService} from '../../services/auth/auth.service';
import {SharedService} from '../../services/shared/shared.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accountclient',
  templateUrl: './accountclient.component.html',
  styleUrls: ['./accountclient.component.css']
})
export class AccountclientComponent implements OnInit {

  client?: Client = undefined;
  logoutInEventSubscription: Subscription;


  constructor(private clientService: ClientService, private authService: AuthService, private sharedService: SharedService,
              private router: Router) {
    this.logoutInEventSubscription = this.sharedService.getUserEvent().subscribe(() => {
      this.getUserInfo(true);
    });
  }

  ngOnInit(): void {
    this.getUserInfo(false);
  }

  getUserInfo(fromEvent: boolean): void {
    this.clientService.getActualUser().subscribe(client => {
      this.client = client;
    }, error => {
      this.client = undefined;
      if (!fromEvent){
        this.sharedService.sendUserEvent();
      }
      this.router.navigate(['/']);
    });
  }

}
