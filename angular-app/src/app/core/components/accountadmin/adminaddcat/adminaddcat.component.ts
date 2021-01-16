import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedService} from '../../../services/shared/shared.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CategoryService} from '../../../services/category/category.service';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-adminaddcat',
  templateUrl: './adminaddcat.component.html',
  styleUrls: ['./adminaddcat.component.css']
})
export class AdminaddcatComponent implements OnInit {

  @Input() newCat: Category = new Category();
  loading = false;
  updateForm: FormGroup;

  constructor(private categoryService: CategoryService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
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

  newCategory(): void{
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.categoryService.createCategory(this.newCat).subscribe( res => {
        this.sharedService.success('Category created successfully.', {autoClose: true});
        this.loading = false;
        this.updateForm.reset();
        this.newCat = new Category();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error.error_message !== undefined) {
          this.sharedService.error(err.error.error_message, {autoClose: true});
        } else{
          this.sharedService.error('It was not possible to create the Category.', {autoClose: true});
        }
      });
  }

}
