import {Component, EventEmitter, Input, OnInit, Output, WritableSignal} from '@angular/core';
import {Category} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrl: './category-select.component.scss'
})
export class CategorySelectComponent implements OnInit  {
  categories$ = {} as WritableSignal<Category[]>;
  categories: Category[] = [];

  @Input() formGroup!: FormGroup;
  @Input() selectedCategoryId: string | null = null;
  // Tạo EventEmitter để phát dữ liệu lên component cha
  @Output() categoryIdSelected = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    // this.formGroup = this.formBuilder.group({
    //   category: ['', [Validators.required, Validators.minLength(3)]],
    // });
  }

  ngOnInit(): void {
    this.fetchCategory();
  }
  private fetchCategory(): void {
    this.categories$ = this.categoryService.catgories$;
    this.categories = this.categoryService.getCategory();
  }

  // Xử lý sự kiện khi chọn category
  onCategorySelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryId = target.value;
    this.categoryIdSelected.emit(categoryId);
  }
}
