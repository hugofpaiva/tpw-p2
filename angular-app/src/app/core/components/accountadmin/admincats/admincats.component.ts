import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SharedService} from '../../../services/shared/shared.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CategoryService} from '../../../services/category/category.service';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-admincats',
  templateUrl: './admincats.component.html',
  styleUrls: ['./admincats.component.css']
})
export class AdmincatsComponent implements OnInit {

  categories: Category[] = [];
  @Input() selectedCat: Category;
  loading = false;
  updateForm: FormGroup;
  submitted = false;
  p: number = Number(1);

  constructor(private categoryService: CategoryService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.updateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  open(cat: Category, content: any): void{
    this.selectedCat = Object.assign({}, cat);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.updateForm.controls; }

  editCategory(): void{
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.categoryService.updateCategory(this.selectedCat, this.selectedCat.id).subscribe( res => {
        this.sharedService.success('Category edited successfully.', {autoClose: true});
        this.getCategories();
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error.error_message !== undefined) {
          this.sharedService.error(err.error.error_message, {autoClose: true});
        } else{
          this.sharedService.error('It was not possible to edit the category.', {autoClose: true});
        }
      });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

}
