import { Component, OnInit } from '@angular/core';
import {Purchase} from '../../../models/purchase';
import {Client} from '../../../models/client';
import {ClientService} from '../../../services/client/client.service';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {

  clients: Client[] = [];
  p: number = Number(1);

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getUsers().subscribe(clients => this.clients = clients);
  }

}
