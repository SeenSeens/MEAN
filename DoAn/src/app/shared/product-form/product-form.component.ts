import {Component, EventEmitter, input, Output} from '@angular/core';
import {Product} from "../../models/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  initialState = input<Product>();

  @Output() formValuesChanged = new EventEmitter<Product>();
  @Output() formSubmitted = new EventEmitter<Product>();
  @Output() categoryIdSelected = new EventEmitter<string>();

  productForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  selectedCategoryId: string | null = null; // Lưu trữ categoryId được chọn

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      category: [''],
      image:['']
    });
  }

  submitForm() {
    this.formSubmitted.emit(this.productForm.value as Product);
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
