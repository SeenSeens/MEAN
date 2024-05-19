import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../models/product.model";
import {Category} from "../../../models/category.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  categoryForm: FormGroup;
  categoryId: string;
  category: Category | undefined;
  apiEndPoint: string ='';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) {
    this.apiEndPoint = environment.urlEndPoint;

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      image:['']
    });
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe((category: Category) => {
      this.category = category;
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description,
        image: category.image
      });
      this.previewUrl = `${this.apiEndPoint + category.image}`;
    }, (error: HttpErrorResponse) => {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product: ' + error.message);
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
          this.router.navigate(['/admin/edit-category']);
          // Hiển thị thông báo thêm dữ liệu thành công
          alert('Cập nhật dữ liệu thành công!');
        },
        ( error: HttpErrorResponse ) => {
          console.error('Error creating product:', error);
          alert('Lỗi cập nhật dữ liệu' + error.message);
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
