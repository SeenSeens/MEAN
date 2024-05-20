import {Component, WritableSignal} from '@angular/core';
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrl: './product-admin.component.scss'
})
export class ProductAdminComponent {
  categories: Category[] = [];
  products: any[] = [];

  categories$ = {} as WritableSignal<Category[]>;
  products$ = {} as WritableSignal<Product[]>;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.fetchCategory();
    this.fetchProducts();
  }

  private fetchCategory(): void {
    this.categories$ = this.categoryService.catgories$;
    this.categories = this.categoryService.getCategory();
  }

  private fetchProducts(): void {
    this.products$ = this.productService.product$;
    this.products = this.productService.getProductAll();

  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.fetchProducts(),
    });
  }
  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => this.fetchCategory(),
    });
  }
}
