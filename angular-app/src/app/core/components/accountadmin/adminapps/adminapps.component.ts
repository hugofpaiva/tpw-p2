import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../services/product/product.service';
import {Product} from '../../../models/product';
import {Category} from '../../../models/category';
import {Developer} from '../../../models/developer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../services/category/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DeveloperService} from '../../../services/developer/developer.service';
import {SharedService} from '../../../services/shared/shared.service';
import {Client} from '../../../models/client';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-adminapps',
  templateUrl: './adminapps.component.html',
  styleUrls: ['./adminapps.component.css']
})
export class AdminappsComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  developers: Developer[] = [];
  @Input() selectedProduct: Product;
  loading = false;
  updateForm: FormGroup;
  submitted = false;
  p: number = Number(1);

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private developerService: DeveloperService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private sharedService: SharedService) {
    this.updateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      icon: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      category: ['', [Validators.required]],
      developer: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0), Validators.max(999.99)]],
    });
  }

  ngOnInit(): void {
    // Ver dps as chamadas todas..
    this.getProducts();
    this.getCategories();
    this.getDevelopers();
  }

  open(product: Product, content: any): void{

    this.selectedProduct = Object.assign({}, product);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.updateForm.controls; }

  editProduct(): void{
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.loading = true;
    this.productService.updateProduct({...this.selectedProduct,
      developer: this.selectedProduct.developer.id,
      category: this.selectedProduct.category.map((cat ) => cat.id)
    }, this.selectedProduct.id).subscribe( res => {
        this.sharedService.success('Product edited successfully.', {autoClose: true});
        this.getProducts();
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
        if (err.error.error_message !== undefined) {
          this.sharedService.error(err.error.error_message, {autoClose: true});
        } else{
          this.sharedService.error('It was not possible to edit the product.', {autoClose: true});
        }
      });
  }

  compareFn(a: any, b: any): boolean {
    // Handle compare logic (eg check if unique ids are the same)
    return a.id === b.id;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getDevelopers(): void {
    this.developerService.getDevelopers().subscribe(developers => this.developers = developers);
  }

}


