import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client';
import {ClientService} from '../../services/client/client.service';
import {AuthService} from '../../services/auth/auth.service';
import {SharedService} from '../../services/shared/shared.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  client?: Client = undefined;
  logoutInEventSubscription: Subscription;


  constructor(private clientService: ClientService, private authService: AuthService, private sharedService: SharedService,
              private router: Router) {
    this.logoutInEventSubscription = this.sharedService.getUserEvent().subscribe(() => {
      this.getUserInfo();
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.clientService.getActualUser().subscribe(client => {
      this.client = client;
      if (this.client === undefined){
        this.router.navigate(['/']);
      }
    });
  }

}
