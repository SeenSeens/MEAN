import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product, Products} from "../models/product.model";
import {CONSTANT} from "../constant/constant";
import {Observable} from "rxjs";
import {Category} from "../models/category.model";
import {Options, PaginationParams} from "../models/pagination.model";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiEndPoint: string ='';
  product$ = signal<Product[]>([]);
  product = signal<Product>({} as Product);

  constructor(
    // private apiService: ApiService,
    private http: HttpClient
  ) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  // Getting products from the API
  /*getProducts1 = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };*/

  private refreshProducts(page: number = 1, pageSize: number = 2) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    this.http.get<Product[]>(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT }`, { params })
      .subscribe(product => {
       return this.product$.set(product);
      });
  }

  private refreshProductsAll() {
    this.http.get<Product[]>(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT }`)
      .subscribe(product => {
        this.product$.set(product);
      });
  }

  // Lấy tất cả danh sách
  getProductAll() {
    this.refreshProductsAll();
    return this.product$();
  }

  getProducts(page: number, pageSize: number): Observable<any> {
    const url = `${this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  // Hàm lấy thông tin một sản phẩm (có thể bạn cần)
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT}/${id}`);
  }

  // Hàm tạo sản phẩm không có hình ảnh
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT, product);
  }

  // Hàm tạo sản phẩm có kèm hình ảnh
  createProductWithImage(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT, formData);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT}/${id}`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateProductWithImage(id: string, productData: FormData): Observable<any> {
    return this.http.put(`${this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT}/${id}`, productData);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiEndPoint + CONSTANT.ENDPOINTS.PRODUCT}/${id}`);
  }
}
