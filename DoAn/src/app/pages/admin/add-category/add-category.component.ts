import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  categoryForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      image:['']
    });
  }
  submitForm(): void {
    if (this.categoryForm.valid) {
      const categoryData: FormData = new FormData();
      categoryData.append('name', this.categoryForm.get('name')?.value);
      categoryData.append('description', this.categoryForm.get('description')?.value);

      if (this.selectedFile) {
        categoryData.append('image', this.selectedFile);
      }

      this.categoryService.createCategoryWithImage(categoryData).subscribe(
        () => {
          this.router.navigate(['/admin/add-category']);
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

}
