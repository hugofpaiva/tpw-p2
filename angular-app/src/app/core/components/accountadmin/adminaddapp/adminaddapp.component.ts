import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Developer} from '../../../models/developer';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductService} from '../../../services/product/product.service';
import {SharedService} from '../../../services/shared/shared.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-adminaddapp',
  templateUrl: './adminaddapp.component.html',
  styleUrls: ['./adminaddapp.component.css']
})
export class AdminaddappComponent implements OnInit, OnChanges {
  /*
    Child Component of the AdminApp Component,
   */
  @Input() products: Product [] = [];  // to check if product already exists;
  @Input() categories: Category[] = [];
  @Input() developers: Developer[] = [];
  @Input() newproduct: Product = new Product();
  loading = false;
  updateForm: FormGroup;
  submitted = false;
  p: number = Number(1);
  creationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private sharedService: SharedService,
    private modalService: NgbModal
  ) {
    this.creationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      icon: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      category: ['', [Validators.required]],
      developer: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(999.99)]],
    });
  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void{
    if (changes){
      this.products = changes.products.currentValue;
      this.categories = changes.categories.currentValue;
      this.developers = changes.developers.currentValue;
    }
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.creationForm.controls; }

  compareFn(a: any, b: any): boolean {
    if (b !== undefined) {
      // Handle compare logic (eg check if unique ids are the same)
      return a.id === b.id;
    }
    return false;
  }

  open(content: any): void{

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      console.log(reason);
    });
  }


  addProduct(): void{
    this.submitted = true;
    if (this.creationForm.invalid) {
      return;
    }
    this.loading = true;
    const arr: number[] = [];
    this.productService.createProduct({...this.newproduct,
      developer: this.newproduct.developer.id,
      category: this.newproduct.category.map((cat ) => cat.id)
    }).subscribe(
      data => {
        console.log(data);
        this.products.push(data);
        this.loading = false;
        this.creationForm.reset();
        this.sharedService.success('Success Creating new Product!', {autoClose: true });
      }, (err: HttpErrorResponse) => {
      this.loading = false;
      if (err.error.error_message !== undefined) {
        this.sharedService.error(err.error.error_message, {autoClose: true});
      } else{
        this.sharedService.error('It was not possible to edit the product.', {autoClose: true});
      }
    });

  }



}
