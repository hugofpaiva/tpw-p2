import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Developer} from "../../../models/developer";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductService} from "../../../services/product/product.service";
import {SharedService} from "../../../services/shared/shared.service";

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
  @Input() newproduct: Product;
  loading = false;
  updateForm: FormGroup;
  submitted = false;
  p: number = Number(1);
  creationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private sharedService: SharedService,
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
    // Handle compare logic (eg check if unique ids are the same)
    return a.id === b.id;
  }


  addProduct(): void{
    this.submitted = true;
    if (this.creationForm.invalid) {
      return;
    }
    this.loading = true;
    console.log("VALOR" + this.creationForm.value);
  }



}
