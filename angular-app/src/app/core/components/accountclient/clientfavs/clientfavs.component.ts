import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../models/client';
import {ClientService} from '../../../services/client/client.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {DynamicScriptLoaderService} from '../../../services/scripts/dynamic-script-loader-service.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';
import {SharedService} from '../../../services/shared/shared.service';

@Component({
  selector: 'app-clientfavs',
  templateUrl: './clientfavs.component.html',
  styleUrls: ['./clientfavs.component.css']
})
export class ClientfavsComponent implements OnInit {
  @Input() client: Client;


  constructor() {
  }

  ngOnInit(): void {
    console.log(this.client);
  }

}
