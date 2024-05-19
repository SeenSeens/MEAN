import {Component, EventEmitter, input, OnInit, Output, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit  {

  apiEndPoint: string ='';

  productForm: FormGroup;
  productId: string;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  selectedCategoryId: string | null = null;
  product: Product | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.apiEndPoint = environment.urlEndPoint;

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      category: [''],
      thumbnail: [''],
      price: ['']
    });
    this.productId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      this.product = product;
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        category: product.category,
        thumbnail: product.thumbnail,
        price: product.price
      });
      this.selectedCategoryId = product.category;
      this.previewUrl = `${this.apiEndPoint + product.thumbnail}`;
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product: ' + error.message);
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const productData: FormData = new FormData();
      productData.append('name', this.productForm.get('name')?.value);
      productData.append('description', this.productForm.get('description')?.value);
      productData.append('category', this.selectedCategoryId as string);
      productData.append('price', this.productForm.get('price')?.value);

      if (this.selectedFile) {
        productData.append('image', this.selectedFile);
      }

      this.productService.updateProductWithImage(this.productId, productData).subscribe(
        () => {
          alert('Cập nhật sản phẩm thành công');
          this.router.navigate(['/admin/edit-product/' + this.productId]);
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating product:', error);
          alert('Failed to update product: ' + error.message);
        }
      );
    }
  }

  uploadImage(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      // Display the image temporarily
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  handleCategoryIdSelected(categoryId: string): void {
    this.selectedCategoryId = categoryId;
  }
}
