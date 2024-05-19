import {Component, OnInit, ViewEncapsulation, WritableSignal} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.model";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import * as $ from 'jquery';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit{
  categories: Category[] = [];
  products: any[] = [];
  currentPage: number = 1;
  totalPages: number = 0;

  categories$ = {} as WritableSignal<Category[]>;
  products$ = {} as WritableSignal<Product[]>;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchCategory();
    this.fetchProducts(this.currentPage);
    this.fetchProductAll();
  }
  private fetchCategory(): void {
    this.categories$ = this.categoryService.catgories$;
    this.categories = this.categoryService.getCategory();
  }

  // Lấy tất cả
  private fetchProductAll(): void {
    this.products$ = this.productService.product$;
    this.products = this.productService.getProduct();
  }

  fetchProducts(page: number): void {
    this.products$ = this.productService.product$;
    this.productService.getProducts(page, 10) // Giả sử mỗi trang hiển thị 10 sản phẩm
      .subscribe(data => {
        this.products = data.products;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
      });
  }

  addToCart(productId: string) {
    const quantity = 1; // Bạn có thể lấy giá trị này từ người dùng
    this.cartService.addToCart(productId, quantity);
  }

  getProductImageUrl(thumbnail: string): string {
    return `http://localhost:3000/${thumbnail}`;
  }
}
