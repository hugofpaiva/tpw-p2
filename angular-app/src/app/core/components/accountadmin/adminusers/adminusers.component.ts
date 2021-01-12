import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../../../models/purchase';
import {Client} from '../../../models/client';
import {ClientService} from '../../../services/client/client.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {SharedService} from '../../../services/shared/shared.service';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {

  clients: Client[] = [];
  @Input() selectedClient: Client;
  loading = false;
  updateForm: FormGroup;
  submitted = false;
  p: number = Number(1);

  constructor(private clientService: ClientService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.updateForm = this.formBuilder.group({
      balance: ['', [Validators.required, Validators.min(0), Validators.max(999.99)]]
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getUsers().subscribe(clients => this.clients = clients);
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.updateForm.controls; }

  addBalance(): void{
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.clientService.updateClient({balance: this.selectedClient.balance,
      user: this.selectedClient.user.id}, this.selectedClient.id).subscribe( res => {
        this.sharedService.success('Balance changed successfully.', {autoClose: true});
        this.getClients();
        this.loading = false;
    },
      (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error.error_message !== undefined) {
          this.sharedService.error(err.error.error_message, {autoClose: true});
        } else{
          this.sharedService.error('It was not possible to change the balance.', {autoClose: true});
        }
      });
  }

  open(client: Client, content: any): void{
    this.selectedClient = Object.assign({}, client);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

}
