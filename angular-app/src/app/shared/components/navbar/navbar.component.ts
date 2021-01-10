import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientService} from '../../../core/services/client/client.service';
import {Client} from '../../../core/models/client';
import {AuthService} from '../../../core/services/auth/auth.service';
import {SharedService} from '../../../core/services/shared/shared.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  client?: Client = undefined;
  logoutInEventSubscription: Subscription;

  constructor(private clientService: ClientService, private authService: AuthService, private sharedService: SharedService) {
    this.logoutInEventSubscription = this.sharedService.getUserEvent().subscribe(() => {
      this.getUserInfo();
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.clientService.getActualUser().subscribe(client => this.client = client);
  }

  logout(): void {
    this.authService.logout();
    this.client = undefined;
    this.sharedService.sendUserEvent();
  }


}
