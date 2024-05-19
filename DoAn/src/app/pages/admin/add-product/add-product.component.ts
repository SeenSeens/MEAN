import {Component, input, Output, EventEmitter, WritableSignal, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {FormBuilder, Validators, FormGroup } from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Router} from '@angular/router';
import {Category} from "../../../models/category.model";
import { HttpErrorResponse } from '@angular/common/http';
import {ProductFormComponent} from "../../../shared/product-form/product-form.component";


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  initialState = input<Product>();

  @Output() formValuesChanged = new EventEmitter<Product>();
  @Output() formSubmitted = new EventEmitter<Product>();
  @Output() categoryIdSelected = new EventEmitter<string>();

  productForm: FormGroup;
  selectedFile: File | null = null;
  selectedCategoryId: string | null = null; // Lưu trữ categoryId được chọn
  previewUrl: string | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      category: [''],
      price: [''],
      image:['']
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const productData: FormData = new FormData();
      productData.append('name', this.productForm.get('name')?.value);
      productData.append('description', this.productForm.get('description')?.value);
      // @ts-ignore
      productData.append('category', this.selectedCategoryId); // Sử dụng categoryId được chọn
      productData.append('price', this.productForm.get('price')?.value);
      if (this.selectedFile) {
        productData.append('image', this.selectedFile);
      }

      this.productService.createProductWithImage(productData).subscribe(
        () => {
          this.router.navigate(['/admin/add-product']);
          // Hiển thị thông báo thêm dữ liệu thành công
          alert('Thêm dữ liệu thành công!');
        },
        ( error: HttpErrorResponse ) => {
          console.error('Error creating product:', error);
          alert('Failed to create product' + error.message);
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

  // Hàm xử lý sự kiện nhận dữ liệu từ component con
  handleCategoryIdSelected(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    console.log('Received categories from child:', this.selectedCategoryId);
  }
}
