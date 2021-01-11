import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../models/client';
import {Purchase} from '../../../models/purchase';
import {HttpErrorResponse} from '@angular/common/http';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-clientapps',
  templateUrl: './clientapps.component.html',
  styleUrls: ['./clientapps.component.css']
})
export class ClientappsComponent implements OnInit {
  @Input() client: Client;
  purchase: Purchase[] = [];
  p: number = Number(1);

  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientService.getApps(this.client.user.id).subscribe(purchase => this.purchase = purchase);

  }

}
