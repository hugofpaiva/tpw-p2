import {Component, Input, OnInit} from '@angular/core';
import {Developer} from '../../../models/developer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeveloperService} from '../../../services/developer/developer.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedService} from '../../../services/shared/shared.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-adminadddev',
  templateUrl: './adminadddev.component.html',
  styleUrls: ['./adminadddev.component.css']
})
export class AdminadddevComponent implements OnInit {

  @Input() newDev: Developer = new Developer();
  loading = false;
  updateForm: FormGroup;

  constructor(private developerService: DeveloperService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
  }

  open(content: any): void{
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log(reason);
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.updateForm.controls; }

  newDeveloper(): void{
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.developerService.createDeveloper(this.newDev).subscribe( res => {
        this.sharedService.success('Developer created successfully.', {autoClose: true});
        this.loading = false;
        this.updateForm.reset();
        this.newDev = new Developer();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error.error_message !== undefined) {
          this.sharedService.error(err.error.error_message, {autoClose: true});
        } else{
          this.sharedService.error('It was not possible to create the Developer.', {autoClose: true});
        }
      });
  }

}
