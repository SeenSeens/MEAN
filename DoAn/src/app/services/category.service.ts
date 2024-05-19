import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "../models/category.model";
import { CONSTANT } from '../constant/constant';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiEndPoint: string ='';
  catgories$ = signal<Category[]>([]);
  categories = signal<Category>({} as Category);

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  private refreshCategory() {
    this.http.get<Category[]>(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.CATEGORY }`)
      .subscribe(catgories => {
        this.catgories$.set(catgories);
      });
  }
  // Lấy tất cả danh sách
  getCategory() {
    this.refreshCategory();
    return this.catgories$();
  }
  // Hàm lấy thông tin một chuyên mục
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.CATEGORY }/${id} `);
  }
  // Hàm tạo sản phẩm có kèm hình ảnh
  createCategoryWithImage(formData: FormData): Observable<Category> {
    return this.http.post<Category>(this.apiEndPoint + CONSTANT.ENDPOINTS.CATEGORY, formData);
  }

  updateProductWithImage(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.CATEGORY }/${id}`, formData);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${ this.apiEndPoint + CONSTANT.ENDPOINTS.CATEGORY}/${id} `);
  }
}
