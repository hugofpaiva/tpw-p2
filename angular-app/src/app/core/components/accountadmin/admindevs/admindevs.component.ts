import {Component, Input, OnInit} from '@angular/core';
import {Developer} from '../../../models/developer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeveloperService} from '../../../services/developer/developer.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedService} from '../../../services/shared/shared.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-admindevs',
  templateUrl: './admindevs.component.html',
  styleUrls: ['./admindevs.component.css']
})
export class AdmindevsComponent implements OnInit {

  developers: Developer[] = [];
  @Input() selectedDev: Developer;
  loading = false;
  updateForm: FormGroup;
  submitted = false;
  p: number = Number(1);

  constructor(private developerService: DeveloperService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.getDevelopers();
  }

  open(dev: Developer, content: any): void{
    this.selectedDev = Object.assign({}, dev);
    console.log(this.selectedDev);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.updateForm.controls; }

  editDeveloper(): void{
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.developerService.updateDeveloper(this.selectedDev, this.selectedDev.id).subscribe( res => {
        this.sharedService.success('Developer edited successfully.', {autoClose: true});
        this.getDevelopers();
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error.error_message !== undefined) {
          this.sharedService.error(err.error.error_message, {autoClose: true});
        } else{
          this.sharedService.error('It was not possible to edit the developer.', {autoClose: true});
        }
      });
  }

  getDevelopers(): void {
    this.developerService.getDevelopers().subscribe(developers => this.developers = developers);
  }

}
